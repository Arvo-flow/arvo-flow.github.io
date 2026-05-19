#!/usr/bin/env python3
"""
Arvo Flow — Apple-style Sales Video (no voice, text + music only)
~2:20 total, black background, teal accents, dramatic music build.

Output: /tmp/arvo-sales.mp4
"""

import subprocess, os, math

SRC        = '/tmp/arvo-demo.webm'
OUT        = '/tmp/arvo-sales.mp4'
TMP        = '/tmp/arvo_sales_build'
FONT_BOLD  = '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'
FONT_LIGHT = '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf'

W, H   = 1280, 720
FPS    = 30
DARK   = '0x0A1210'   # near-black brand bg
TEAL   = '0x5DD6CA'
WHITE  = 'white'

os.makedirs(TMP, exist_ok=True)

def run(cmd, label=''):
    print(f'  ▶ {label or cmd[:70]}')
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if r.returncode != 0:
        print('STDERR:', r.stderr[-800:])
        raise RuntimeError(f'ffmpeg failed: {label}')

# ── Helpers ───────────────────────────────────────────────────────────────────

def esc(text):
    return text.replace("'", "’").replace(':', r'\:').replace(',', r'\,')

def dt(text, font, size, color, x, y, t0, dur, fadein=0.4, fadeout=0.4, shadow=False):
    t1 = t0 + fadein
    t2 = t0 + dur - fadeout
    t3 = t0 + dur
    alpha = (
        f"if(lt(t,{t0:.3f}),0,"
        f"if(lt(t,{t1:.3f}),(t-{t0:.3f})/{fadein:.3f},"
        f"if(lt(t,{t2:.3f}),1,"
        f"if(lt(t,{t3:.3f}),({t3:.3f}-t)/{fadeout:.3f},0))))"
    )
    shadow_str = ':shadowcolor=black@0.6:shadowx=2:shadowy=2' if shadow else ''
    return (
        f"drawtext=fontfile='{font}':text='{esc(text)}'"
        f":fontsize={size}:fontcolor={color}"
        f":x={x}:y={y}"
        f":alpha='{alpha}':enable='between(t,{t0:.3f},{t3:.3f})'"
        f"{shadow_str}"
    )

def cx():   return '(w-text_w)/2'
def cy():   return '(h-text_h)/2'
def cy_up(offset=0):  return f'(h-text_h)/2-{offset}'
def cy_dn(offset=0):  return f'(h-text_h)/2+{offset}'

def teal_line(t0, dur, y_expr, w=200):
    """Teal accent underline."""
    fade_in, fade_out = 0.3, 0.3
    t1 = t0 + fade_in
    t2 = t0 + dur - fade_out
    t3 = t0 + dur
    alpha = (
        f"if(lt(t,{t0:.3f}),0,"
        f"if(lt(t,{t1:.3f}),(t-{t0:.3f})/{fade_in:.2f},"
        f"if(lt(t,{t2:.3f}),1,"
        f"if(lt(t,{t3:.3f}),({t3:.3f}-t)/{fade_out:.2f},0))))"
    )
    return (
        f"drawbox=x=(w-{w})/2:y={y_expr}:w={w}:h=3:"
        f"color=0x5DD6CA@1.0:t=fill:"
        f"enable='between(t,{t0:.3f},{t3:.3f})'"
    )

def make_slate(filename, duration, vf_filters):
    filters = ','.join(vf_filters)
    run(
        f"ffmpeg -y "
        f"-f lavfi -i \"color=c={DARK}:size={W}x{H}:rate={FPS}\" "
        f"-vf \"{filters}\" "
        f"-t {duration} -c:v libx264 -preset fast -crf 16 {filename}",
        f'slate {os.path.basename(filename)}'
    )

# ═══════════════════════════════════════════════════════════════════════════════
# MUSIC — Three-act dynamic score
# Act 1 (0–30s):   Sparse, low, unsettling. Minor drone + distant pulses.
# Act 2 (30–90s):  Build. Arpeggio in Am adds energy.
# Act 3 (90–140s): Resolution. Major lift, warmth, confident tone.
# ═══════════════════════════════════════════════════════════════════════════════
TOTAL_DUR = 142.0
print('\n[1/9] Genererar musik (3-akt)…')

act1_len = 30
act2_len = 60
act3_len = 52  # 30+60+52 = 142

# Act 1 — dark sparse drone
act1_filter = (
    "aevalsrc="
    "0.18*sin(2*PI*110*t)*exp(-0.008*t)"   # A2 sub drone
    "+0.12*sin(2*PI*220*t)*exp(-0.012*t)"  # A3
    "+0.06*sin(2*PI*165*t)*exp(-0.010*t)"  # E3 minor colour
    "+0.04*sin(2*PI*277*t)*exp(-0.018*t)"  # C#4 tension
    "+0.03*sin(2*PI*440*t)*exp(-0.025*t)"  # ghost A4
    ":s=44100:c=stereo"
)
run(
    f"ffmpeg -y "
    f"-f lavfi -i \"{act1_filter}\" "
    f"-af \"aecho=0.7:0.5:400:0.5,aecho=0.6:0.3:900:0.3,"
    f"afade=t=in:st=0:d=3,afade=t=out:st={act1_len-4}:d=4,"
    f"highpass=f=55,lowpass=f=7000,volume=0.55\" "
    f"-t {act1_len} {TMP}/act1.wav",
    'musik akt 1'
)

# Act 2 — building arpeggio in Am
arp_notes = [220, 261, 330, 440, 330, 261]  # Am arpeggio

def sine_pulse(freq, step, n, total_n, amp=0.2, gate_duty=0.5):
    period = 1.0 / (n / 2.0)  # 2-beat period
    phase  = step * period
    envelope = f"(between(mod(t,{period:.4f}),{phase:.4f},{phase + period*gate_duty:.4f})?1:0)"
    return f"{amp}*sin(2*PI*{freq}*t)*{envelope}"

# Simpler arpeggio via repeating sine bursts
run(
    f"ffmpeg -y "
    f"-f lavfi -i \"aevalsrc="
    f"0.22*sin(2*PI*220*t)"
    f"+0.18*sin(2*PI*330*t)"
    f"+0.15*sin(2*PI*440*t)"
    f"+0.10*sin(2*PI*261*t)"
    f"+0.08*sin(2*PI*659*t)"
    f"+0.05*sin(2*PI*880*t)"
    f"+0.14*sin(2*PI*110*t)"
    f":s=44100:c=stereo\" "
    f"-af \"aecho=0.65:0.45:250:0.45,aecho=0.5:0.3:600:0.25,"
    f"afade=t=in:st=0:d=5,afade=t=out:st={act2_len-5}:d=5,"
    f"highpass=f=60,lowpass=f=9000,"
    f"volume=0.72\" "
    f"-t {act2_len} {TMP}/act2.wav",
    'musik akt 2'
)

# Act 3 — hopeful resolution (A major lift)
run(
    f"ffmpeg -y "
    f"-f lavfi -i \"aevalsrc="
    f"0.25*sin(2*PI*220*t)*exp(-0.003*t)"   # A2
    f"+0.20*sin(2*PI*330*t)*exp(-0.004*t)"  # E3
    f"+0.18*sin(2*PI*440*t)*exp(-0.005*t)"  # A3
    f"+0.14*sin(2*PI*554*t)*exp(-0.006*t)"  # C#4 — major!
    f"+0.12*sin(2*PI*659*t)*exp(-0.008*t)"  # E4
    f"+0.08*sin(2*PI*880*t)*exp(-0.010*t)"  # A4
    f"+0.05*sin(2*PI*1109*t)*exp(-0.012*t)" # C#5 shimmer
    f":s=44100:c=stereo\" "
    f"-af \"aecho=0.6:0.4:280:0.4,aecho=0.45:0.25:700:0.2,"
    f"afade=t=in:st=0:d=6,"
    f"afade=t=out:st={act3_len-6}:d=6,"
    f"highpass=f=65,lowpass=f=10000,"
    f"volume=0.80\" "
    f"-t {act3_len} {TMP}/act3.wav",
    'musik akt 3'
)

# Concatenate music acts
run(
    f"ffmpeg -y "
    f"-i {TMP}/act1.wav -i {TMP}/act2.wav -i {TMP}/act3.wav "
    f"-filter_complex \"[0:a][1:a][2:a]concat=n=3:v=0:a=1[aout]\" "
    f"-map '[aout]' -c:a pcm_s16le {TMP}/music.wav",
    'musik concat'
)

# ═══════════════════════════════════════════════════════════════════════════════
# VIDEO SECTIONS
# ─────────────────────────────────────────────────────────────────────────────
# S01  0.0 – 6.0s   "Du betalar överpris."                           6s
# S02  6.0 – 16.0s  Problem: fakturor staplas / branscher            10s
# S03  16.0 – 26.0s "Priserna är dolda."                             10s
# S04  26.0 – 36.0s Solution reveal: "Arvo Flow."                    10s
# S05  36.0 – 56.0s Hur det funkar — 3 steg                          20s
# S06  56.0 – 86.0s DEMO CLIP (30s ur inspelade demot)               30s
# S07  86.0 – 106.0s Siffror: "156 000 kr / år."                    20s
# S08  106.0 – 124.0s "Noll kronor i förskott." / avgiftsmodell      18s
# S09  124.0 – 142.0s CTA + URL                                      18s
# ─────────────────────────────────────────────────────────────────────────────

# ── S01: Hook ──────────────────────────────────────────────────────────────────
print('[2/9] S01 — Hook…')
make_slate(f'{TMP}/s01.mp4', 6.0, [
    dt('Du betalar överpris.', FONT_BOLD, 56, WHITE, cx(), cy(), 0.5, 5.0, 0.6, 0.5),
])

# ── S02: Problem — kategorier ──────────────────────────────────────────────────
print('[3/9] S02 — Problem…')
make_slate(f'{TMP}/s02.mp4', 10.0, [
    dt('Bredband.',              FONT_LIGHT, 40, f'0x5DD6CA', cx(), '(h-200)/2',       0.4, 9.0, 0.4, 0.5),
    dt('Mobilabonnemang.',       FONT_LIGHT, 40, f'0x5DD6CA', cx(), '(h-200)/2+68',    0.9, 8.5, 0.4, 0.5),
    dt('Skrivarleasing.',        FONT_LIGHT, 40, f'0x5DD6CA', cx(), '(h-200)/2+136',   1.4, 8.0, 0.4, 0.5),
    dt('Mjukvaruavtal.',         FONT_LIGHT, 40, f'0x5DD6CA', cx(), '(h-200)/2+204',   1.9, 7.5, 0.4, 0.5),
    dt('Du betalar för mycket.', FONT_BOLD,  36, WHITE,        cx(), '(h-200)/2+296',   3.5, 5.5, 0.5, 0.5),
])

# ── S03: Insight ───────────────────────────────────────────────────────────────
print('[4/9] S03 — Insight…')
make_slate(f'{TMP}/s03.mp4', 10.0, [
    dt('Priserna är dolda.',        FONT_BOLD,  52, WHITE,  cx(), cy_up(50), 0.5, 4.5, 0.5, 0.4),
    dt('Marknaden är ogenomskinlig.', FONT_LIGHT, 30, f'white@0.7', cx(), cy_up(-20), 1.2, 3.8, 0.4, 0.4),
    dt('Du har inte tid att jämföra.', FONT_LIGHT, 30, f'white@0.7', cx(), cy_up(-60), 2.0, 3.0, 0.4, 0.4),
    dt('Tills nu.', FONT_BOLD, 44, f'0x5DD6CA', cx(), '(h-text_h)/2+120', 4.8, 4.5, 0.6, 0.4),
])

# ── S04: Solution reveal ───────────────────────────────────────────────────────
print('[5/9] S04 — Solution…')
make_slate(f'{TMP}/s04.mp4', 10.0, [
    dt('Arvo Flow.',                  FONT_BOLD,  80, WHITE,         cx(), cy_up(40),  0.6, 9.0, 0.8, 0.4),
    dt('AI som analyserar dina fakturor.', FONT_LIGHT, 28, f'white@0.65', cx(), cy_up(-50), 1.6, 7.5, 0.5, 0.4),
    teal_line(0.6, 9.0, '(h+60)/2', 240),
])

# ── S05: Hur det funkar ───────────────────────────────────────────────────────
print('[6/9] S05 — Steg…')
make_slate(f'{TMP}/s05.mp4', 20.0, [
    # Step 1
    dt('1',                        FONT_BOLD,  80, f'0x5DD6CA@0.25', cx(), cy_up(20), 0.3, 6.0, 0.4, 0.4),
    dt('Ladda upp en faktura.',    FONT_BOLD,  42, WHITE,            cx(), cy_up(20), 0.5, 5.5, 0.4, 0.4),
    dt('PDF från vilken leverantör som helst.', FONT_LIGHT, 26, f'white@0.6', cx(), cy_up(-40), 1.0, 4.5, 0.4, 0.4),
    # Step 2
    dt('2',                        FONT_BOLD,  80, f'0x5DD6CA@0.25', cx(), cy_up(20), 7.0, 6.0, 0.4, 0.4),
    dt('Arvo analyserar.',         FONT_BOLD,  42, WHITE,            cx(), cy_up(20), 7.2, 5.5, 0.4, 0.4),
    dt('AI extraherar vad du faktiskt betalar.', FONT_LIGHT, 26, f'white@0.6', cx(), cy_up(-40), 7.7, 4.5, 0.4, 0.4),
    # Step 3
    dt('3',                        FONT_BOLD,  80, f'0x5DD6CA@0.25', cx(), cy_up(20), 14.0, 5.5, 0.4, 0.4),
    dt('Du sparar.',               FONT_BOLD,  42, WHITE,            cx(), cy_up(20), 14.2, 5.2, 0.4, 0.4),
    dt('Vi förhandlar. Du tar pengarna.', FONT_LIGHT, 26, f'white@0.6', cx(), cy_up(-40), 14.7, 4.5, 0.4, 0.4),
])

# ── S06: Demo clip — cut from recorded demo (14s–44s) ────────────────────────
print('[7/9] S06 — Demo-klipp…')
# Use 30s of the demo: from t=9s (testa-faktura loads) to t=39s
demo_start = 9.0
demo_len   = 30.0
demo_out   = f'{TMP}/s06.mp4'

# Scale demo to 1280×720, add subtle dark vignette + overlays
overlays_demo = [
    dt('Testa med en riktig faktura.',  FONT_BOLD,  32, WHITE,        cx(), f'h-{160}', 1.0, 5.0,  0.4, 0.4, True),
    dt('Analysen tar under 10 sekunder.', FONT_LIGHT, 24, f'white@0.7', cx(), f'h-{120}', 1.5, 4.5, 0.4, 0.4),
    dt('156 000 kr / år.',             FONT_BOLD,  44, f'0x5DD6CA',  cx(), f'h-{155}', 16.0, 7.0, 0.5, 0.5, True),
    dt('Arvo hittar besparingen åt dig.', FONT_LIGHT, 24, f'white@0.7', cx(), f'h-{108}', 16.5, 6.0, 0.4, 0.4),
]
demo_vf = ','.join(overlays_demo)

run(
    f"ffmpeg -y -ss {demo_start} -t {demo_len} -i {SRC} "
    f"-vf \"scale={W}:{H}:force_original_aspect_ratio=decrease,"
    f"pad={W}:{H}:(ow-iw)/2:(oh-ih)/2:color={DARK},"
    f"{demo_vf}\" "
    f"-c:v libx264 -preset fast -crf 16 -an {demo_out}",
    'demo-klipp'
)

# ── S07: Siffror ───────────────────────────────────────────────────────────────
print('[8/9] S07 — Siffror…')
make_slate(f'{TMP}/s07.mp4', 20.0, [
    dt('156 000 kr / år.',   FONT_BOLD,  84, WHITE,         cx(), cy_up(60), 0.8, 8.5, 0.7, 0.5),
    dt('Skrivarleasing — ett verkligt kundexempel.', FONT_LIGHT, 22, f'white@0.55', cx(), cy_up(-40), 1.5, 7.5, 0.4, 0.4),
    teal_line(0.8, 8.5, '(h+80)/2', 300),
    # Second stat
    dt('30–40 %',  FONT_BOLD,  72, WHITE, cx(), cy_up(60), 10.5, 8.5, 0.6, 0.5),
    dt('mer än nödvändigt betalas av svenska SMB-företag varje år.', FONT_LIGHT, 22, f'white@0.6', cx(), cy_up(-40), 11.2, 7.5, 0.4, 0.4),
    teal_line(10.5, 8.5, '(h+80)/2', 200),
])

# ── S08: Avgiftsmodell ─────────────────────────────────────────────────────────
print('[8b/9] S08 — Avgiftsmodell…')
make_slate(f'{TMP}/s08.mp4', 18.0, [
    dt('Noll kronor i förskott.',    FONT_BOLD,  60, WHITE,  cx(), cy_up(80), 0.6, 9.5, 0.7, 0.5),
    dt('Arvo tar 20 % av realiserad besparing.', FONT_LIGHT, 28, f'white@0.65', cx(), cy_up(-10), 1.4, 8.5, 0.4, 0.4),
    dt('Ingen besparing — ingen kostnad.',       FONT_LIGHT, 28, f'white@0.65', cx(), cy_up(-55), 2.2, 7.5, 0.4, 0.4),
    teal_line(0.6, 9.5, '(h+100)/2', 260),
    dt('Vi är på din sida.',         FONT_BOLD,  36, f'0x5DD6CA',  cx(), cy_up(-120), 10.5, 7.0, 0.6, 0.5),
])

# ── S09: CTA ───────────────────────────────────────────────────────────────────
print('[9/9] S09 — CTA…')
make_slate(f'{TMP}/s09.mp4', 18.0, [
    dt('Ladda upp din första faktura.',  FONT_BOLD,  52, WHITE,       cx(), cy_up(50), 0.7, 12.0, 0.7, 0.5),
    dt('Gratis. Ingen registrering. Direkt svar.', FONT_LIGHT, 26, f'white@0.65', cx(), cy_up(-20), 1.4, 11.0, 0.4, 0.4),
    teal_line(0.7, 12.0, '(h+70)/2', 220),
    dt('arvo-flow.github.io',           FONT_LIGHT, 28, f'0x5DD6CA', cx(), cy_up(-90), 3.5, 10.0, 0.5, 0.5),
])

# ═══════════════════════════════════════════════════════════════════════════════
# CONCAT all sections with crossfades
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[concat] Konkatenerar med crossfades…')

sections = [
    (f'{TMP}/s01.mp4', 6.0),
    (f'{TMP}/s02.mp4', 10.0),
    (f'{TMP}/s03.mp4', 10.0),
    (f'{TMP}/s04.mp4', 10.0),
    (f'{TMP}/s05.mp4', 20.0),
    (f'{TMP}/s06.mp4', 30.0),
    (f'{TMP}/s07.mp4', 20.0),
    (f'{TMP}/s08.mp4', 18.0),
    (f'{TMP}/s09.mp4', 18.0),
]

xf  = 0.5  # crossfade duration
n   = len(sections)

inputs = ' '.join(f'-i {p}' for p, _ in sections)

# Build normalise chain
norm_parts = []
for i in range(n):
    norm_parts.append(f'[{i}:v]fps={FPS},format=yuv420p,setpts=PTS-STARTPTS[v{i}]')

# Build xfade chain
xf_parts = []
cur_offset = 0.0
prev_out = 'v0'
for i in range(1, n):
    cur_offset += sections[i-1][1] - xf
    next_out = f'vx{i}'
    xf_parts.append(
        f'[{prev_out}][v{i}]xfade=transition=fade:duration={xf}:offset={cur_offset:.3f}[{next_out}]'
    )
    prev_out = next_out

total_video_dur = sum(d for _, d in sections) - xf * (n - 1)

filter_complex = ';'.join(norm_parts + xf_parts)

run(
    f"ffmpeg -y {inputs} "
    f"-filter_complex \"{filter_complex}\" "
    f"-map '[{prev_out}]' "
    f"-c:v libx264 -preset fast -crf 16 {TMP}/video_noa.mp4",
    'concat xfade'
)

# ═══════════════════════════════════════════════════════════════════════════════
# FINAL MIX — video + music
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[final] Mixar musik + video…')
run(
    f"ffmpeg -y "
    f"-i {TMP}/video_noa.mp4 -i {TMP}/music.wav "
    f"-filter_complex \"[1:a]afade=t=out:st={total_video_dur-5:.2f}:d=5,volume=0.82[a]\" "
    f"-map 0:v -map '[a]' "
    f"-c:v copy -c:a aac -b:a 192k "
    f"-movflags +faststart "
    f"-t {total_video_dur:.2f} "
    f"{OUT}",
    'final mix'
)

size = os.path.getsize(OUT) / 1024 / 1024
print(f'\n✅  Klar: {OUT}  ({size:.1f} MB)')
print(f'   Total längd: {total_video_dur:.1f}s ({total_video_dur/60:.1f} min)')
