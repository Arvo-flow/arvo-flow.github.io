#!/usr/bin/env python3
"""
Arvo Flow — Premium Sales Video, Apple-style, no voice.
~1:45 total. Fast cuts. Playfair Display + Inter. Dark bg.

Output: /tmp/arvo-sales.mp4
"""

import subprocess, os

SRC   = '/tmp/arvo-demo-switch.webm'
OUT   = '/tmp/arvo-sales.mp4'
TMP   = '/tmp/arvo_sales_build'

# Brand fonts (downloaded from Google Fonts)
PLAYFAIR_BOLD   = '/tmp/fonts/Playfair-Bold.ttf'
PLAYFAIR_MED    = '/tmp/fonts/Playfair-Medium.ttf'
INTER_REG       = '/tmp/fonts/Inter-Regular.ttf'
INTER_MED       = '/tmp/fonts/Inter-Medium.ttf'
INTER_SEMI      = '/tmp/fonts/Inter-SemiBold.ttf'

W, H  = 1280, 720
FPS   = 30
BG    = '0x0E1A17'   # brand ink — exact match to theme.color.ink
TEAL  = '0x5DD6CA'
TEAL2 = '0x1B7A6E'
WHITE = 'white'

os.makedirs(TMP, exist_ok=True)

def run(cmd, label=''):
    print(f'  ▶ {label or cmd[:70]}')
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if r.returncode != 0:
        print('STDERR:', r.stderr[-800:])
        raise RuntimeError(f'ffmpeg failed: {label}')

# ── Text helper ───────────────────────────────────────────────────────────────

def esc(t):
    return t.replace("'", "’").replace(':', r'\:').replace(',', r'\,')

def dt(text, font, size, color, x, y, t0, dur, fi=0.3, fo=0.3):
    """drawtext with smooth fade."""
    t1 = t0 + fi
    t2 = t0 + dur - fo
    t3 = t0 + dur
    alpha = (
        f"if(lt(t,{t0:.3f}),0,"
        f"if(lt(t,{t1:.3f}),(t-{t0:.3f})/{fi:.3f},"
        f"if(lt(t,{t2:.3f}),1,"
        f"if(lt(t,{t3:.3f}),({t3:.3f}-t)/{fo:.3f},0))))"
    )
    return (
        f"drawtext=fontfile='{font}':text='{esc(text)}'"
        f":fontsize={size}:fontcolor={color}"
        f":x={x}:y={y}"
        f":alpha='{alpha}':enable='between(t,{t0:.3f},{t3:.3f})'"
    )

def line(t0, dur, y_px, w_px=180, fi=0.2, fo=0.2):
    """Teal accent horizontal line."""
    t1 = t0 + fi; t2 = t0 + dur - fo; t3 = t0 + dur
    alpha = (
        f"if(lt(t,{t0:.3f}),0,"
        f"if(lt(t,{t1:.3f}),(t-{t0:.3f})/{fi:.3f},"
        f"if(lt(t,{t2:.3f}),1,"
        f"if(lt(t,{t3:.3f}),({t3:.3f}-t)/{fo:.3f},0))))"
    )
    return (
        f"drawbox=x=(w-{w_px})/2:y={y_px}:w={w_px}:h=3:"
        f"color=0x5DD6CA@1.0:t=fill:"
        f"enable='between(t,{t0:.3f},{t3:.3f})'"
    )

def cx(): return '(w-text_w)/2'
def cy(): return '(h-text_h)/2'
def above(n): return f'(h-text_h)/2-{n}'
def below(n): return f'(h-text_h)/2+{n}'

def slate(fname, dur, filters):
    vf = ','.join(filters)
    run(
        f"ffmpeg -y "
        f"-f lavfi -i \"color=c={BG}:size={W}x{H}:rate={FPS}\" "
        f"-vf \"{vf}\" "
        f"-t {dur} -c:v libx264 -preset fast -crf 15 {fname}",
        f'slate {os.path.basename(fname)}'
    )

def demo_clip(fname, t_start, dur, extra_vf=''):
    """Cut a segment from the demo recording."""
    vf = f"scale={W}:{H}:force_original_aspect_ratio=decrease,pad={W}:{H}:(ow-iw)/2:(oh-ih)/2:color={BG}"
    if extra_vf:
        vf += ',' + extra_vf
    run(
        f"ffmpeg -y -ss {t_start} -t {dur} -i {SRC} "
        f"-vf \"{vf}\" "
        f"-c:v libx264 -preset fast -crf 15 -an {fname}",
        f'demo {os.path.basename(fname)} (t={t_start}–{t_start+dur})'
    )

# ═══════════════════════════════════════════════════════════════════════════════
# MUSIC — 3-act dynamic score, 110s
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[MUSIK] Genererar 3-akt score…')

# Act 1 (0–35s): Sparse, dark, minor. Establishes tension.
run(
    "ffmpeg -y -f lavfi "
    "-i \"aevalsrc="
    "0.20*sin(2*PI*110*t)*exp(-0.006*t)"
    "+0.13*sin(2*PI*220*t)*exp(-0.009*t)"
    "+0.08*sin(2*PI*165*t)*exp(-0.008*t)"
    "+0.05*sin(2*PI*277*t)*exp(-0.014*t)"
    ":s=44100:c=stereo\" "
    "-af \"aecho=0.72:0.55:500:0.55,"
    "aecho=0.5:0.3:1100:0.3,"
    "afade=t=in:st=0:d=2.5,"
    "afade=t=out:st=31:d=4,"
    "highpass=f=50,volume=0.58\" "
    f"-t 35 {TMP}/m1.wav",
    'musik akt 1'
)

# Act 2 (0–40s): Rhythmic Am arpeggio builds energy.
run(
    "ffmpeg -y -f lavfi "
    "-i \"aevalsrc="
    "0.22*sin(2*PI*220*t)*exp(-0.004*t)"
    "+0.17*sin(2*PI*330*t)*exp(-0.005*t)"
    "+0.14*sin(2*PI*440*t)*exp(-0.007*t)"
    "+0.10*sin(2*PI*261*t)*exp(-0.006*t)"
    "+0.07*sin(2*PI*659*t)*exp(-0.010*t)"
    "+0.12*sin(2*PI*110*t)*exp(-0.003*t)"
    ":s=44100:c=stereo\" "
    "-af \"aecho=0.60:0.40:220:0.40,"
    "aecho=0.45:0.25:550:0.25,"
    "afade=t=in:st=0:d=4,"
    "afade=t=out:st=36:d=4,"
    "highpass=f=55,volume=0.70\" "
    f"-t 40 {TMP}/m2.wav",
    'musik akt 2'
)

# Act 3 (0–40s): A-major lift — resolution, warmth, confidence.
run(
    "ffmpeg -y -f lavfi "
    "-i \"aevalsrc="
    "0.24*sin(2*PI*220*t)*exp(-0.003*t)"
    "+0.19*sin(2*PI*330*t)*exp(-0.004*t)"
    "+0.17*sin(2*PI*440*t)*exp(-0.005*t)"
    "+0.13*sin(2*PI*554*t)*exp(-0.006*t)"
    "+0.10*sin(2*PI*659*t)*exp(-0.008*t)"
    "+0.07*sin(2*PI*880*t)*exp(-0.011*t)"
    "+0.04*sin(2*PI*1109*t)*exp(-0.014*t)"
    ":s=44100:c=stereo\" "
    "-af \"aecho=0.58:0.38:260:0.38,"
    "aecho=0.42:0.22:650:0.20,"
    "afade=t=in:st=0:d=5,"
    "afade=t=out:st=35:d=5,"
    "highpass=f=60,volume=0.78\" "
    f"-t 40 {TMP}/m3.wav",
    'musik akt 3'
)

# Concat music (35 + 40 + 40 = 115s total)
run(
    f"ffmpeg -y "
    f"-i {TMP}/m1.wav -i {TMP}/m2.wav -i {TMP}/m3.wav "
    f"-filter_complex \"[0:a][1:a][2:a]concat=n=3:v=0:a=1[aout]\" "
    f"-map '[aout]' -c:a pcm_s16le {TMP}/music.wav",
    'musik concat'
)

# ═══════════════════════════════════════════════════════════════════════════════
# SECTION DEFINITIONS
# Each entry: (type, filename, duration, *args)
#   type='s'  → slate (slate fn args)
#   type='d'  → demo clip (t_start, dur, [extra_vf])
# ═══════════════════════════════════════════════════════════════════════════════

print('\n[SLATES] Bygger sektioner…')

# ── ACT 1: PROBLEM ─────────────────────────────────────────────────────────────

# S01 — "Du betalar överpris."  3s
slate(f'{TMP}/s01.mp4', 3.0, [
    dt('Du betalar överpris.', PLAYFAIR_BOLD, 80, WHITE, cx(), cy(), 0.4, 2.2, 0.5, 0.4),
])

# S02 — category cascade  4.5s
slate(f'{TMP}/s02.mp4', 4.5, [
    dt('Bredband.',          INTER_MED,  40, TEAL, cx(), above(80), 0.2, 4.0, 0.25, 0.3),
    dt('Mobilabonnemang.',   INTER_MED,  40, TEAL, cx(), above(28), 0.6, 3.6, 0.25, 0.3),
    dt('Skrivarleasing.',    INTER_MED,  40, TEAL, cx(), below(24), 1.0, 3.2, 0.25, 0.3),
    dt('Mjukvaruavtal.',     INTER_MED,  40, TEAL, cx(), below(76), 1.4, 2.8, 0.25, 0.3),
])

# S03 — number stat  3s
slate(f'{TMP}/s03.mp4', 3.0, [
    dt('30–40 %', PLAYFAIR_BOLD, 100, WHITE, cx(), above(20), 0.3, 2.3, 0.4, 0.3),
    dt('mer än nödvändigt.', INTER_REG, 26, f'white@0.65', cx(), below(60), 0.6, 2.0, 0.3, 0.3),
])

# S04 — "Varje år."  2.5s
slate(f'{TMP}/s04.mp4', 2.5, [
    dt('Varje år.', PLAYFAIR_MED, 72, WHITE, cx(), cy(), 0.3, 1.8, 0.35, 0.3),
])

# D01 — Landing page  7s (t=0–7)
demo_clip(f'{TMP}/d01.mp4', 0.0, 7.0)

# S05 — "Priserna är dolda."  2.5s
slate(f'{TMP}/s05.mp4', 2.5, [
    dt('Priserna är dolda.', PLAYFAIR_BOLD, 72, WHITE, cx(), cy(), 0.3, 1.8, 0.4, 0.3),
])

# S06 — "Du vet det inte."  2.5s
slate(f'{TMP}/s06.mp4', 2.5, [
    dt('Du vet det inte.', INTER_MED, 48, f'white@0.80', cx(), cy(), 0.3, 1.8, 0.35, 0.3),
])

# D02 — Navigate + upload  8s (t=7–15)
demo_clip(f'{TMP}/d02.mp4', 7.0, 8.0)

# ── ACT 2: REVEAL ──────────────────────────────────────────────────────────────

# S07 — "Arvo Flow." brand reveal  4s
slate(f'{TMP}/s07.mp4', 4.0, [
    dt('Arvo Flow.', PLAYFAIR_BOLD, 96, WHITE, cx(), above(18), 0.5, 3.1, 0.6, 0.4),
    line(0.8, 2.5, H//2 + 48, 220),
])

# S08 — tagline  2.5s
slate(f'{TMP}/s08.mp4', 2.5, [
    dt('AI-driven besparingsmotor.', INTER_MED, 32, f'white@0.80', cx(), cy(), 0.3, 1.8, 0.3, 0.3),
])

# D03 — Analysera + spinner + results  9s (t=19–28)
demo_clip(f'{TMP}/d03.mp4', 19.0, 9.0)

# S09 — "Hittade det."  2s
slate(f'{TMP}/s09.mp4', 2.0, [
    dt('Hittade det.', PLAYFAIR_MED, 68, TEAL, cx(), cy(), 0.25, 1.5, 0.3, 0.25),
])

# D04 — SavingsBlock + PartnerBlock  7s (t=30–37)
demo_clip(f'{TMP}/d04.mp4', 30.0, 7.0)

# ── ACT 3: THE NUMBER ──────────────────────────────────────────────────────────

# S10 — "+18 240 kr" HERO MOMENT  4s
slate(f'{TMP}/s10.mp4', 4.0, [
    dt('+18 240 kr', PLAYFAIR_BOLD, 108, WHITE, cx(), above(22), 0.4, 3.2, 0.5, 0.4),
    dt('nettobesparing per år', INTER_SEMI, 22,
       f'0x5DD6CA', cx(), below(64), 0.8, 2.6, 0.3, 0.3),
    line(0.8, 2.8, H//2 + 46, 260),
])

# S11 — breakdown  3.5s
slate(f'{TMP}/s11.mp4', 3.5, [
    dt('81 600', INTER_SEMI, 52, f'white@0.45', '(w-text_w)/2-160', cy(), 0.3, 2.8, 0.35, 0.3),
    dt('→', INTER_REG, 40, f'0x5DD6CA', cx(), cy(), 0.3, 2.8, 0.35, 0.3),
    dt('58 800 kr/år', INTER_SEMI, 52, WHITE, '(w-text_w)/2+80', cy(), 0.3, 2.8, 0.35, 0.3),
    dt('Telia → Hallon. Arvo sköter bytet.', INTER_REG, 20, f'white@0.55', cx(), below(56), 0.6, 2.4, 0.3, 0.3),
])

# D05 — PartnerBlock + Aktivera bytet modal  7s (t=37–44)
demo_clip(f'{TMP}/d05.mp4', 37.0, 7.0)

# S12 — confirmation  2.5s
slate(f'{TMP}/s12.mp4', 2.5, [
    dt('Bytet igångsatt.', PLAYFAIR_MED, 68, TEAL, cx(), cy(), 0.3, 1.8, 0.35, 0.3),
])

# ── ACT 4: MODEL ───────────────────────────────────────────────────────────────

# S13 — "Noll kronor i förskott."  3s
slate(f'{TMP}/s13.mp4', 3.0, [
    dt('Noll kronor i förskott.', PLAYFAIR_BOLD, 72, WHITE, cx(), cy(), 0.35, 2.2, 0.4, 0.3),
])

# S14 — fee model  3s
slate(f'{TMP}/s14.mp4', 3.0, [
    dt('20 % av realiserad besparing.', INTER_MED, 36, f'white@0.82', cx(), above(22), 0.3, 2.2, 0.3, 0.3),
    dt('Ingen besparing — ingen kostnad.', INTER_REG, 24, f'white@0.55', cx(), below(30), 0.6, 1.9, 0.3, 0.3),
])

# ── ACT 5: CTA ─────────────────────────────────────────────────────────────────

# S15 — CTA  3.5s
slate(f'{TMP}/s15.mp4', 3.5, [
    dt('Ladda upp din faktura.', PLAYFAIR_BOLD, 76, WHITE, cx(), above(20), 0.4, 2.7, 0.45, 0.35),
    dt('Gratis. Svar på 10 sekunder.', INTER_REG, 24, f'white@0.60', cx(), below(44), 0.7, 2.3, 0.3, 0.3),
])

# S16 — URL  6s
slate(f'{TMP}/s16.mp4', 6.0, [
    dt('arvo-flow.github.io', INTER_SEMI, 34, TEAL, cx(), cy(), 0.6, 4.8, 0.5, 0.5),
    line(0.6, 4.8, H//2 + 30, 340),
])

# ═══════════════════════════════════════════════════════════════════════════════
# CONCAT — xfade all sections
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[CONCAT] Konkatenerar…')

sections = [
    (f'{TMP}/s01.mp4', 3.0),   # Du betalar överpris.
    (f'{TMP}/s02.mp4', 4.5),   # Categories
    (f'{TMP}/s03.mp4', 3.0),   # 30-40%
    (f'{TMP}/s04.mp4', 2.5),   # Varje år.
    (f'{TMP}/d01.mp4', 7.0),   # Demo: landing
    (f'{TMP}/s05.mp4', 2.5),   # Priserna är dolda.
    (f'{TMP}/s06.mp4', 2.5),   # Du vet det inte.
    (f'{TMP}/d02.mp4', 8.0),   # Demo: upload
    (f'{TMP}/s07.mp4', 4.0),   # Arvo Flow. reveal
    (f'{TMP}/s08.mp4', 2.5),   # AI-driven besparingsmotor.
    (f'{TMP}/d03.mp4', 9.0),   # Demo: Analysera → results
    (f'{TMP}/s09.mp4', 2.0),   # Hittade det.
    (f'{TMP}/d04.mp4', 7.0),   # Demo: SavingsBlock
    (f'{TMP}/s10.mp4', 4.0),   # +18 240 kr HERO
    (f'{TMP}/s11.mp4', 3.5),   # 81 600 → 58 800
    (f'{TMP}/d05.mp4', 7.0),   # Demo: Aktivera bytet
    (f'{TMP}/s12.mp4', 2.5),   # Bytet igångsatt.
    (f'{TMP}/s13.mp4', 3.0),   # Noll kronor i förskott.
    (f'{TMP}/s14.mp4', 3.0),   # 20% modell
    (f'{TMP}/s15.mp4', 3.5),   # CTA
    (f'{TMP}/s16.mp4', 6.0),   # URL
]

XF  = 0.4  # crossfade duration
n   = len(sections)
total_dur = sum(d for _, d in sections) - XF * (n - 1)

inputs = ' '.join(f'-i {p}' for p, _ in sections)

norm  = ';'.join(f'[{i}:v]fps={FPS},format=yuv420p,setpts=PTS-STARTPTS[v{i}]' for i in range(n))
xf_parts = []
offset = 0.0
prev = 'v0'
for i in range(1, n):
    offset += sections[i-1][1] - XF
    nxt = f'vx{i}'
    xf_parts.append(f'[{prev}][v{i}]xfade=transition=fade:duration={XF}:offset={offset:.3f}[{nxt}]')
    prev = nxt

fc = norm + ';' + ';'.join(xf_parts)

run(
    f"ffmpeg -y {inputs} "
    f"-filter_complex \"{fc}\" "
    f"-map '[{prev}]' "
    f"-c:v libx264 -preset fast -crf 15 {TMP}/video_noa.mp4",
    'concat xfade'
)

# ── Final mix ─────────────────────────────────────────────────────────────────
print('\n[FINAL] Mixar musik + video…')
run(
    f"ffmpeg -y "
    f"-i {TMP}/video_noa.mp4 -i {TMP}/music.wav "
    f"-filter_complex \"[1:a]afade=t=out:st={total_dur-5:.2f}:d=5,volume=0.80[a]\" "
    f"-map 0:v -map '[a]' "
    f"-c:v copy -c:a aac -b:a 192k "
    f"-movflags +faststart "
    f"-t {total_dur:.2f} "
    f"{OUT}",
    'final mix'
)

size = os.path.getsize(OUT) / 1024 / 1024
print(f'\n✅  Klar: {OUT}  ({size:.1f} MB)')
print(f'   Längd: {total_dur:.1f}s = {int(total_dur//60)}:{int(total_dur%60):02d}')
