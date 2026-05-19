#!/usr/bin/env python3
"""
Arvo Flow — Premium Sales Video v3
Fixes: fadeblack transitions, 90%-scaled demo clips, detuned music,
       fixed text layout, reduced font sizes for breathing room.

Output: /tmp/arvo-sales.mp4
"""

import subprocess, os

SRC = '/tmp/arvo-demo-switch.webm'
OUT = '/tmp/arvo-sales.mp4'
TMP = '/tmp/arvo_sales_build'

PLAYFAIR = '/tmp/fonts/Playfair-Bold.ttf'
PLAYFAIR_M = '/tmp/fonts/Playfair-Medium.ttf'
INTER    = '/tmp/fonts/Inter-Regular.ttf'
INTER_M  = '/tmp/fonts/Inter-Medium.ttf'
INTER_S  = '/tmp/fonts/Inter-SemiBold.ttf'
NOTO_B   = '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'    # fallback for arrow glyph

W, H = 1280, 720
FPS  = 30
BG   = '0x0E1A17'
TEAL = '0x5DD6CA'

os.makedirs(TMP, exist_ok=True)

def run(cmd, label=''):
    print(f'  ▶ {label or cmd[:70]}')
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if r.returncode != 0:
        print('STDERR:', r.stderr[-600:])
        raise RuntimeError(f'failed: {label}')

# ── Helpers ───────────────────────────────────────────────────────────────────

def esc(t):
    return t.replace("'", "’").replace(':', r'\:').replace(',', r'\,')

def dt(text, font, size, color, x, y, t0, dur, fi=0.40, fo=0.35):
    t1, t2, t3 = t0 + fi, t0 + dur - fo, t0 + dur
    a = (f"if(lt(t,{t0:.3f}),0,"
         f"if(lt(t,{t1:.3f}),(t-{t0:.3f})/{fi:.3f},"
         f"if(lt(t,{t2:.3f}),1,"
         f"if(lt(t,{t3:.3f}),({t3:.3f}-t)/{fo:.3f},0))))")
    return (f"drawtext=fontfile='{font}':text='{esc(text)}'"
            f":fontsize={size}:fontcolor={color}"
            f":x={x}:y={y}:alpha='{a}':enable='between(t,{t0:.3f},{t3:.3f})'")

def teal_bar(t0, dur, y_abs, w=160, fi=0.25, fo=0.25):
    t1, t2, t3 = t0+fi, t0+dur-fo, t0+dur
    a = (f"if(lt(t,{t0:.3f}),0,"
         f"if(lt(t,{t1:.3f}),(t-{t0:.3f})/{fi:.2f},"
         f"if(lt(t,{t2:.3f}),1,"
         f"if(lt(t,{t3:.3f}),({t3:.3f}-t)/{fo:.2f},0))))")
    return (f"drawbox=x=(iw-{w})/2:y={y_abs}:w={w}:h=3:"
            f"color=0x5DD6CA@1.0:t=fill:"
            f"enable='between(t,{t0:.3f},{t3:.3f})'")

CX = '(w-text_w)/2'
CY = '(h-text_h)/2'

def above(n): return f'(h-text_h)/2-{n}'
def below(n): return f'(h-text_h)/2+{n}'

# ── Slate builder ─────────────────────────────────────────────────────────────

def slate(fname, dur, filters):
    vf = ','.join(filters)
    run(f"ffmpeg -y "
        f"-f lavfi -i \"color=c={BG}:size={W}x{H}:rate={FPS}\" "
        f"-vf \"{vf}\" "
        f"-t {dur} -c:v libx264 -preset fast -crf 15 {fname}",
        f'slate {os.path.basename(fname)}')

# ── Demo clip builder ─────────────────────────────────────────────────────────
# Each clip is inset to 88% with dark border → blends with slates on fadeblack.

def demo(fname, t_start, dur, extra=''):
    # Scale to 88 % of frame, centre on brand-dark bg
    sw = int(W * 0.88)  # 1126
    sh = int(H * 0.88)  # 634
    px = (W - sw) // 2  # 77
    py = (H - sh) // 2  # 43
    vf = (f"scale={sw}:{sh}:force_original_aspect_ratio=decrease,"
          f"pad={W}:{H}:{px}:{py}:color={BG}")
    if extra:
        vf += ',' + extra
    run(f"ffmpeg -y -ss {t_start} -t {dur} -i {SRC} "
        f"-vf \"{vf}\" "
        f"-c:v libx264 -preset fast -crf 15 -an {fname}",
        f'demo {os.path.basename(fname)} ({t_start:.0f}-{t_start+dur:.0f}s)')

# ═══════════════════════════════════════════════════════════════════════════════
# MUSIC — detuned oscillator pairs → organic beating, no exponential decay
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[MUSIK]')


def make_pad(fname, dur, notes, vol, echo1='0.72:0.55:450:0.50',
             echo2='0.50:0.30:900:0.28', fade_out_at=None):
    """notes = list of (freq, amp) pairs — each gets a slightly detuned twin."""
    parts = []
    for i, (f, a) in enumerate(notes):
        detune = 0.18 * (i + 1)          # slight detuning per voice
        parts.append(f"{a:.3f}*sin(2*PI*{f:.3f}*t)")
        parts.append(f"{a*0.85:.3f}*sin(2*PI*{f+detune:.3f}*t)")
    expr = '+'.join(parts)
    fo = fade_out_at if fade_out_at else dur - 4
    run(f"ffmpeg -y -f lavfi "
        f"-i \"aevalsrc={expr}:s=44100:c=stereo\" "
        f"-af \"aecho={echo1},aecho={echo2},"
        f"afade=t=in:st=0:d=3,"
        f"afade=t=out:st={fo:.1f}:d=4,"
        f"highpass=f=55,lowpass=f=9000,volume={vol}\" "
        f"-t {dur} {fname}",
        f'pad {os.path.basename(fname)}')

# Act 1 — dark Am drone (sparse, tense)
make_pad(f'{TMP}/m1.wav', 38,
    [(110, 0.22), (165, 0.14), (220, 0.16), (277, 0.08)],
    vol=0.52,
    echo1='0.78:0.62:550:0.58', echo2='0.55:0.35:1100:0.30')

# Act 2 — fuller Am chord + 5th (builds)
make_pad(f'{TMP}/m2.wav', 42,
    [(110, 0.20), (165, 0.16), (220, 0.18), (330, 0.14), (440, 0.10), (659, 0.06)],
    vol=0.64,
    echo1='0.68:0.50:380:0.46', echo2='0.48:0.28:800:0.24')

# Act 3 — A-major resolution (hopeful, warm)
make_pad(f'{TMP}/m3.wav', 42,
    [(110, 0.20), (220, 0.18), (330, 0.16), (440, 0.14),
     (554, 0.12), (659, 0.09), (880, 0.06)],  # C#4 = major third
    vol=0.72,
    echo1='0.62:0.44:320:0.40', echo2='0.44:0.26:700:0.22')

# Concat
run(f"ffmpeg -y -i {TMP}/m1.wav -i {TMP}/m2.wav -i {TMP}/m3.wav "
    f"-filter_complex \"[0:a][1:a][2:a]concat=n=3:v=0:a=1[a]\" "
    f"-map '[a]' -c:a pcm_s16le {TMP}/music.wav", 'musik concat')

# ═══════════════════════════════════════════════════════════════════════════════
# VIDEO SECTIONS
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[SECTIONS]')

# ── ACT 1 — PROBLEM (0–29s) ────────────────────────────────────────────────────

# S01 — "Du betalar överpris."   3.5s
slate(f'{TMP}/s01.mp4', 3.5, [
    dt('Du betalar överpris.', PLAYFAIR, 72, 'white', CX, above(8), 0.5, 2.6, 0.55, 0.40),
])

# S02 — categories, 1.4s each, longer hold   6s
slate(f'{TMP}/s02.mp4', 6.0, [
    dt('Bredband.',        INTER_M, 36, TEAL, CX, above(74), 0.3, 5.4, 0.35, 0.35),
    dt('Mobilabonnemang.', INTER_M, 36, TEAL, CX, above(24), 0.9, 4.8, 0.35, 0.35),
    dt('Skrivarleasing.',  INTER_M, 36, TEAL, CX, below(26), 1.5, 4.2, 0.35, 0.35),
    dt('Mjukvaruavtal.',   INTER_M, 36, TEAL, CX, below(76), 2.1, 3.6, 0.35, 0.35),
])

# S03 — number   3s
slate(f'{TMP}/s03.mp4', 3.0, [
    dt('30–40 %',           PLAYFAIR,   88, 'white',      CX, above(30), 0.35, 2.2, 0.45, 0.35),
    dt('mer än nödvändigt.', INTER,     24, 'white@0.72', CX, below(54), 0.65, 1.9, 0.35, 0.30),
])

# D01 — landing page   7s
demo(f'{TMP}/d01.mp4', 0.0, 7.0)

# S04 — tension   2.5s
slate(f'{TMP}/s04.mp4', 2.5, [
    dt('Priserna är dolda.', PLAYFAIR, 64, 'white', CX, above(6), 0.35, 1.8, 0.40, 0.30),
])

# D02 — navigate + upload   8s (t=7–15)
demo(f'{TMP}/d02.mp4', 7.0, 8.0)

# ── ACT 2 — REVEAL (29–52s) ───────────────────────────────────────────────────

# S05 — brand reveal   4s
slate(f'{TMP}/s05.mp4', 4.0, [
    dt('Arvo Flow.', PLAYFAIR, 88, 'white', CX, above(20), 0.55, 3.0, 0.60, 0.40),
    teal_bar(0.9, 2.4, H//2 + 52, 200),
])

# D03 — Analysera + spinner + results   9s (t=19–28)
demo(f'{TMP}/d03.mp4', 19.0, 9.0)

# D04 — SavingsBlock close   7s (t=30–37)
demo(f'{TMP}/d04.mp4', 30.0, 7.0)

# ── ACT 3 — THE NUMBER (52–70s) ───────────────────────────────────────────────

# S06 — "+18 240 kr" hero   4.5s
slate(f'{TMP}/s06.mp4', 4.5, [
    dt('+18 240 kr', PLAYFAIR, 92, 'white',      CX, above(36), 0.45, 3.6, 0.55, 0.40),
    dt('nettobesparing per år', INTER_S, 20, TEAL,     CX, below(52), 0.80, 3.1, 0.35, 0.30),
    teal_bar(0.8, 3.2, H//2 + 44, 220),
])

# S07 — before/after — ONE line, fixed layout   3.5s
slate(f'{TMP}/s07.mp4', 3.5, [
    dt('81 600 kr',      INTER_M,  44, 'white@0.38', '(w/2)-260-text_w', above(8), 0.35, 2.7, 0.35, 0.30),
    dt('→',              INTER_M,  44, TEAL,          '(w-text_w)/2',     above(8), 0.35, 2.7, 0.35, 0.30),
    dt('58 800 kr/år',   INTER_M,  44, 'white',       '(w/2)+260',        above(8), 0.35, 2.7, 0.35, 0.30),
    dt('Telia → Hallon  ·  Arvo sköter bytet', INTER, 18, 'white@0.48', CX, below(52), 0.65, 2.4, 0.30, 0.28),
])

# D05 — PartnerBlock + modal   7s (t=37–44)
demo(f'{TMP}/d05.mp4', 37.0, 7.0)

# S08 — confirmation   2.5s
slate(f'{TMP}/s08.mp4', 2.5, [
    dt('Bytet igångsatt.', PLAYFAIR_M, 64, TEAL, CX, above(6), 0.35, 1.8, 0.40, 0.30),
])

# ── ACT 4 — MODEL + CTA (70–102s) ────────────────────────────────────────────

# S09 — "Noll kronor i förskott."   3.5s
slate(f'{TMP}/s09.mp4', 3.5, [
    dt('Noll kronor i förskott.', PLAYFAIR, 68, 'white', CX, above(8), 0.40, 2.6, 0.45, 0.35),
])

# S10 — fee split   3s
slate(f'{TMP}/s10.mp4', 3.0, [
    dt('20 % av realiserad besparing.',    INTER_M, 32, 'white@0.82', CX, above(26), 0.35, 2.2, 0.35, 0.30),
    dt('Ingen besparing — ingen kostnad.', INTER,  22, 'white@0.68', CX, below(30), 0.65, 1.9, 0.30, 0.28),
])

# S11 — CTA   4s
slate(f'{TMP}/s11.mp4', 4.0, [
    dt('Ladda upp din faktura.',        PLAYFAIR,  68, 'white',      CX, above(26), 0.45, 3.1, 0.50, 0.40),
    dt('Gratis. Svar på 10 sekunder.', INTER,      22, 'white@0.70', CX, below(40), 0.75, 2.7, 0.35, 0.30),
])

# S12 — URL   7s
slate(f'{TMP}/s12.mp4', 7.0, [
    dt('arvo-flow.github.io', INTER_S, 30, TEAL, CX, CY, 0.65, 5.7, 0.55, 0.55),
    teal_bar(0.65, 5.7, H//2 + 28, 320),
])

# ═══════════════════════════════════════════════════════════════════════════════
# CONCAT — fadeblack transitions (works cleanly light↔dark)
# ═══════════════════════════════════════════════════════════════════════════════
print('\n[CONCAT]')

sections = [
    (f'{TMP}/s01.mp4', 3.5),
    (f'{TMP}/s02.mp4', 6.0),
    (f'{TMP}/s03.mp4', 3.0),
    (f'{TMP}/d01.mp4', 7.0),
    (f'{TMP}/s04.mp4', 2.5),
    (f'{TMP}/d02.mp4', 8.0),
    (f'{TMP}/s05.mp4', 4.0),
    (f'{TMP}/d03.mp4', 9.0),
    (f'{TMP}/d04.mp4', 7.0),
    (f'{TMP}/s06.mp4', 4.5),
    (f'{TMP}/s07.mp4', 3.5),
    (f'{TMP}/d05.mp4', 7.0),
    (f'{TMP}/s08.mp4', 2.5),
    (f'{TMP}/s09.mp4', 3.5),
    (f'{TMP}/s10.mp4', 3.0),
    (f'{TMP}/s11.mp4', 4.0),
    (f'{TMP}/s12.mp4', 7.0),
]

XF  = 0.55   # fadeblack duration
n   = len(sections)
total = sum(d for _, d in sections) - XF * (n - 1)

inputs = ' '.join(f'-i {p}' for p, _ in sections)
norm   = ';'.join(f'[{i}:v]fps={FPS},format=yuv420p,setpts=PTS-STARTPTS[v{i}]'
                  for i in range(n))
xfade_parts = []
offset = 0.0
prev = 'v0'
for i in range(1, n):
    offset += sections[i-1][1] - XF
    nxt = f'vx{i}'
    xfade_parts.append(
        f'[{prev}][v{i}]xfade=transition=fadeblack:duration={XF}:offset={offset:.3f}[{nxt}]')
    prev = nxt

fc = norm + ';' + ';'.join(xfade_parts)
run(f"ffmpeg -y {inputs} "
    f"-filter_complex \"{fc}\" "
    f"-map '[{prev}]' "
    f"-c:v libx264 -preset fast -crf 15 {TMP}/video_noa.mp4",
    'concat fadeblack')

# ── Final mix ─────────────────────────────────────────────────────────────────
print('\n[FINAL]')
run(f"ffmpeg -y "
    f"-i {TMP}/video_noa.mp4 -i {TMP}/music.wav "
    f"-filter_complex \"[1:a]afade=t=out:st={total-5:.2f}:d=5,volume=0.78[a]\" "
    f"-map 0:v -map '[a]' "
    f"-c:v copy -c:a aac -b:a 192k "
    f"-movflags +faststart "
    f"-t {total:.2f} {OUT}",
    'final mix')

size = os.path.getsize(OUT) / 1024 / 1024
m, s = divmod(int(total), 60)
print(f'\n✅  {OUT}  ({size:.1f} MB, {m}:{s:02d})')
