#!/usr/bin/env python3
"""
Apple-style Arvo Flow demovideo.
Bygger: intro-slate → demo med text-overlays → outro-slate + ambient musik.
Output: /tmp/arvo-apple.mp4
"""

import subprocess, os, math, textwrap

SRC        = '/tmp/arvo-demo.webm'
OUT        = '/tmp/arvo-apple.mp4'
TMP        = '/tmp/arvo_build'
FONT_BOLD  = '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'
FONT_REG   = '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf'

W, H    = 1280, 720
FPS     = 30
DARK    = '0x0E1A17'   # brand dark
TEAL    = '0x5DD6CA'   # brand teal
WHITE   = 'white'

os.makedirs(TMP, exist_ok=True)

def run(cmd, label=''):
    print(f'  ▶ {label or cmd[:60]}')
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if r.returncode != 0:
        print('STDERR:', r.stderr[-600:])
        raise RuntimeError(f'ffmpeg failed: {label}')

# ── Helpers ──────────────────────────────────────────────────────────────────

def dt(text, font, size, color, x, y, t0, dur,
       fadein=0.35, fadeout=0.35, shadow=True):
    """drawtext filter with smooth fade-in/out."""
    t1 = t0 + fadein
    t2 = t0 + dur - fadeout
    t3 = t0 + dur
    alpha = (
        f"if(lt(t,{t0:.2f}),0,"
        f"if(lt(t,{t1:.2f}),(t-{t0:.2f})/{fadein:.2f},"
        f"if(lt(t,{t2:.2f}),1,"
        f"if(lt(t,{t3:.2f}),({t3:.2f}-t)/{fadeout:.2f},0))))"
    )
    enable = f"between(t,{t0:.2f},{t3:.2f})"
    shadow_opts = ":shadowcolor=black@0.55:shadowx=2:shadowy=2" if shadow else ""
    escaped = text.replace("'", "’").replace(':', r'\:').replace(',', r'\,')
    return (
        f"drawtext=fontfile='{font}':text='{escaped}':fontsize={size}"
        f":fontcolor={color}:x={x}:y={y}"
        f":alpha='{alpha}':enable='{enable}'"
        f"{shadow_opts}"
    )

def center_x():  return '(w-text_w)/2'
def bottom(offset=0): return f'h-{148 + offset}'

# ── 1. Generera ambient musik ─────────────────────────────────────────────────
# A-moll ackord (220, 261, 330, 440 Hz) + shimmer + subtil eko
MUSIC_DUR = 50  # täcker intro(3) + demo(39.6) + outro(5) + marginal
print('\n[1/6] Genererar ambient musik…')
music_filter = (
    "aevalsrc="
    "0.28*sin(2*PI*220*t)*exp(-0.015*t)"  # A2 bas, lång decay
    "+0.22*sin(2*PI*330*t)*exp(-0.018*t)"  # E3
    "+0.18*sin(2*PI*440*t)*exp(-0.022*t)"  # A3
    "+0.12*sin(2*PI*261*t)*exp(-0.020*t)"  # C3
    "+0.07*sin(2*PI*659*t)*exp(-0.030*t)"  # E4 shimmer
    "+0.04*sin(2*PI*880*t)*exp(-0.040*t)"  # A4 övertone
    "+0.03*sin(2*PI*110*t)*exp(-0.010*t)"  # A1 sub-bas
    ":s=44100:c=stereo"
)
# Lägg på eko + fadein/fadeout
run(
    f"ffmpeg -y "
    f"-f lavfi -i \"{music_filter}\" "
    f"-af \"aecho=0.6:0.4:300:0.4,aecho=0.5:0.3:650:0.3,"
    f"afade=t=in:st=0:d=2.5,afade=t=out:st={MUSIC_DUR-4}:d=4,"
    f"volume=0.72,highpass=f=60,lowpass=f=8000\" "
    f"-t {MUSIC_DUR} {TMP}/music.wav",
    'musik'
)

# ── 2. Intro-slate (3 s) ──────────────────────────────────────────────────────
print('[2/6] Intro-slate…')
# Tre drawtext-lager: logotyp-text, tagline, teal-accentlinje
logo = dt('Arvo Flow', FONT_BOLD,  64, WHITE,  center_x(), '(h-160)/2', 0.0, 2.8, 0.5, 0.4)
tag  = dt('Du betalar överpris.', FONT_REG, 26, f'{WHITE}@0.75', center_x(), '(h-160)/2+90', 0.6, 2.2, 0.4, 0.4, shadow=False)
run(
    f"ffmpeg -y "
    f"-f lavfi -i \"color=c={DARK}:size={W}x{H}:rate={FPS}\" "
    f"-vf \"{logo},{tag}\" "
    f"-t 3 -c:v libx264 -preset fast -crf 18 {TMP}/intro.mp4",
    'intro-slate'
)

# ── 3. Demo-video med text-overlays ──────────────────────────────────────────
# Timing (video = 39.6s, estimerat från Playwright-körningens logg):
#  0- 9s: Landningssida + scroll + hover CTA
#  9-14s: Navigerar, /testa-faktura laddas
# 14-22s: Upload-animation + Analysera
# 22-27s: Resultat dyker upp (spinner → h2)
# 27-33s: Scroll till formulär
# 33-39s: Fyller i + checkbox + submit + bekräftelse
print('[3/6] Demo-video med text-overlays…')

overlays = [
    # (text, fontsize, t0, dur)
    ('Du betalar överpris.',           30, 1.2,  4.5),
    ('Ladda upp valfri faktura.',       28, 10.5, 3.5),
    ('Analyserar…',               28, 19.5, 4.0),
    ('156 000 kr / år.',       38, 24.5, 4.5),
    ('Kräver offert.',            30, 29.0, 3.5),
    ('Fullmakt. Friktionsfritt.',      30, 35.5, 3.2),
    ('Offertprocessen startad.',        26, 38.2, 1.4),
]

vf_parts = []
for (text, size, t0, dur) in overlays:
    vf_parts.append(dt(text, FONT_BOLD, size, WHITE, center_x(), bottom(), t0, dur))

# Lägg till teal-accentlinje under varje text (tunna horisontella linjer)
accent_parts = []
for (_, _, t0, dur) in overlays:
    enable = f"between(t,{t0+0.3:.2f},{t0+dur-0.3:.2f})"
    t1 = t0 + 0.3 + 0.25
    t2 = t0 + dur - 0.3 - 0.25
    t3 = t0 + dur - 0.3
    alpha = (
        f"if(lt(t,{t0+0.3:.2f}),0,"
        f"if(lt(t,{t1:.2f}),(t-{t0+0.3:.2f})/0.25,"
        f"if(lt(t,{t2:.2f}),1,"
        f"if(lt(t,{t3:.2f}),({t3:.2f}-t)/0.25,0))))"
    )
    accent_parts.append(
        f"drawbox=x=(w-120)/2:y={H-108}:w=120:h=2:"
        f"color=0x5DD6CA@1.0:t=fill:"
        f"enable='{enable}'"
        # alpha on drawbox isn't direct; we skip per-box alpha for simplicity
    )

all_vf = ','.join(vf_parts)  # accent lines skipped (drawbox alpha limited)

run(
    f"ffmpeg -y -i {SRC} "
    f"-vf \"{all_vf}\" "
    f"-c:v libx264 -preset fast -crf 18 -an {TMP}/demo_text.mp4",
    'demo + overlays'
)

# ── 4. Outro-slate (4 s) ──────────────────────────────────────────────────────
print('[4/6] Outro-slate…')
line1 = dt('Noll kronor i förskott.', FONT_BOLD, 40, WHITE,      center_x(), '(h-120)/2',    0.3, 3.4, 0.5, 0.5)
line2 = dt('arvo-flow.github.io',          FONT_REG,  22, f'0x5DD6CA', center_x(), '(h-120)/2+72', 0.8, 2.9, 0.5, 0.5, shadow=False)
run(
    f"ffmpeg -y "
    f"-f lavfi -i \"color=c={DARK}:size={W}x{H}:rate={FPS}\" "
    f"-vf \"{line1},{line2}\" "
    f"-t 4 -c:v libx264 -preset fast -crf 18 {TMP}/outro.mp4",
    'outro-slate'
)

# ── 5. Lägg till crossfade ──────────────────────────────────────────────────
# intro (3s) -xfade-> demo (39.6s) -xfade-> outro (4s)
print('[5/6] Konkatenerar med crossfades…')

# Durations
intro_dur = 3.0
demo_dur  = 39.64
xfade_dur = 0.6

# Offset för demo-xfade: intro startar fada vid intro_dur - xfade_dur
offset1 = intro_dur - xfade_dur           # 2.4
# Offset för outro-xfade: intro+demo - xfade_dur
offset2 = intro_dur + demo_dur - xfade_dur  # 42.04

run(
    f"ffmpeg -y "
    f"-i {TMP}/intro.mp4 -i {TMP}/demo_text.mp4 -i {TMP}/outro.mp4 "
    f"-filter_complex \""
    f"[0:v]fps={FPS},format=yuv420p,setpts=PTS-STARTPTS[v0];"
    f"[1:v]fps={FPS},format=yuv420p,setpts=PTS-STARTPTS[v1];"
    f"[2:v]fps={FPS},format=yuv420p,setpts=PTS-STARTPTS[v2];"
    f"[v0][v1]xfade=transition=fade:duration={xfade_dur}:offset={offset1}[vx1];"
    f"[vx1][v2]xfade=transition=fade:duration={xfade_dur}:offset={offset2}[vout]"
    f"\" "
    f"-map '[vout]' -c:v libx264 -preset fast -crf 18 {TMP}/video_noa.mp4",
    'crossfade concat'
)

# ── 6. Mixa musik + video → slutlig MP4 ─────────────────────────────────────
print('[6/6] Mixar musik och exporterar…')
total_dur = intro_dur + demo_dur + 4.0 - xfade_dur * 2
run(
    f"ffmpeg -y "
    f"-i {TMP}/video_noa.mp4 -i {TMP}/music.wav "
    f"-filter_complex \"[1:a]afade=t=out:st={total_dur-3.5:.2f}:d=3.5[a]\" "
    f"-map 0:v -map '[a]' "
    f"-c:v copy -c:a aac -b:a 192k "
    f"-movflags +faststart "
    f"-t {total_dur:.2f} "
    f"{OUT}",
    'final mix'
)

size = os.path.getsize(OUT) / 1024 / 1024
print(f'\n✅  Klar: {OUT}  ({size:.1f} MB)')
print(f'   Total längd: ~{total_dur:.1f}s')
