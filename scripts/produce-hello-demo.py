#!/usr/bin/env python3
"""
"Hello, Arvo Flow." — Apple-style produktvideo.
Struktur:
  [intro slate]  Hej, / Arvo Flow.
  [demo A]       0–22s  — landningssida, upload, analys
  [money slate]  156 000 kr / år  (ENORMT på svart)
  [demo B]       22–39.6s — formulär, fullmakt, bekräftelse
  [outro slate]  Noll kronor i förskott. / arvo-flow.github.io

Ljud: click, snap (PDF), impact (number reveal), checkbox-click, success ding.
Output: /tmp/arvo-hello.mp4
"""

import subprocess, os, math

SRC   = '/tmp/arvo-demo.webm'
OUT   = '/tmp/arvo-hello.mp4'
TMP   = '/tmp/hello_build'
BOLD  = '/usr/share/fonts/truetype/noto/NotoSans-Bold.ttf'
REG   = '/usr/share/fonts/truetype/noto/NotoSans-Regular.ttf'
W, H, FPS = 1280, 720, 30
DARK  = '0x0E1A17'

os.makedirs(TMP, exist_ok=True)

def run(cmd, label=''):
    print(f'  ▶ {label}')
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if r.returncode != 0:
        print('ERR:', r.stderr[-800:])
        raise RuntimeError(label)

def norm(path, dur=None):
    """Normalize a clip to FPS=30, yuv420p."""
    dur_flag = f'-t {dur}' if dur else ''
    out = path.replace('.mp4', '_n.mp4')
    run(
        f'ffmpeg -y -i {path} {dur_flag} '
        f'-vf "fps={FPS},format=yuv420p,scale={W}:{H}" '
        f'-c:v libx264 -preset fast -crf 18 -an {out}',
        f'norm {os.path.basename(path)}'
    )
    return out

# ═══════════════════════════════════════════════════════════════════
# 1. LJUD-DESIGN
# ═══════════════════════════════════════════════════════════════════
print('\n[1/7] Genererar ljud-design…')

def gen_sound(name, expr, dur, vol=0.9):
    path = f'{TMP}/{name}.wav'
    run(
        f'ffmpeg -y -f lavfi '
        f'-i "aevalsrc={expr}:s=44100:c=stereo" '
        f'-af "volume={vol},afade=t=out:st={dur-0.01}:d=0.01" '
        f'-t {dur} {path}',
        name
    )
    return path

# UI-klick: mjuk men tydlig
gen_sound('click',   'sin(2*PI*680*t)*exp(-t*110)', 0.06)
# PDF-snap: fysisk "thud" (likt [SNAP] i Apple-videon)
gen_sound('snap',    'sin(2*PI*160*t)*exp(-t*60)+sin(2*PI*320*t)*exp(-t*120)+sin(2*PI*80*t)*exp(-t*40)', 0.18, 1.0)
# Number reveal: låg impact + hög shimmer (dramatisk)
gen_sound('impact',  '(sin(2*PI*60*t)*exp(-t*18)+sin(2*PI*1200*t)*exp(-t*35)*0.3)', 0.5, 1.0)
# Checkbox-click: skarpare, mer taktil
gen_sound('check',   'sin(2*PI*900*t)*exp(-t*180)+sin(2*PI*450*t)*exp(-t*90)*0.4', 0.05)
# Success ding: A-dur ackord — A4+C#5+E5
gen_sound('success', '(sin(2*PI*440*t)+sin(2*PI*554*t)*0.7+sin(2*PI*659*t)*0.5)*exp(-t*5)', 0.7, 0.85)

# Ambient pad: A-moll, extremt subtilt — LYDER UNDER ljuden
run(
    f'ffmpeg -y -f lavfi '
    f'-i "aevalsrc=0.15*sin(2*PI*220*t)+0.10*sin(2*PI*330*t)+0.08*sin(2*PI*440*t)+0.04*sin(2*PI*261*t):s=44100:c=stereo" '
    f'-af "aecho=0.5:0.35:400:0.3,volume=0.55,'
    f'afade=t=in:st=0:d=3,afade=t=out:st=47:d=4" '
    f'-t 51 {TMP}/pad.wav',
    'ambient pad'
)

# ═══════════════════════════════════════════════════════════════════
# 2. VIDEO-SLATES (svart bakgrund)
# ═══════════════════════════════════════════════════════════════════
print('[2/7] Intro-slate "Hej, Arvo Flow."…')

def slate(name, lines, dur):
    """Generera en mörk slate med en eller flera textrader."""
    filters = []
    y_start = H // 2 - (len(lines) - 1) * 60
    for i, (txt, size, color, t0, tdur) in enumerate(lines):
        fade_in, fade_out = 0.45, 0.40
        t1 = t0 + fade_in
        t2 = t0 + tdur - fade_out
        t3 = t0 + tdur
        alpha = (
            f"if(lt(t,{t0:.2f}),0,"
            f"if(lt(t,{t1:.2f}),(t-{t0:.2f})/{fade_in:.2f},"
            f"if(lt(t,{t2:.2f}),1,"
            f"if(lt(t,{t3:.2f}),({t3:.2f}-t)/{fade_out:.2f},0))))"
        )
        escaped = txt.replace("'","'").replace(':',r'\:').replace(',',r'\,')
        y = y_start + i * 120
        filters.append(
            f"drawtext=fontfile='{BOLD}':text='{escaped}'"
            f":fontsize={size}:fontcolor={color}"
            f":x=(w-text_w)/2:y={y}"
            f":alpha='{alpha}':enable='between(t,{t0:.2f},{t3:.2f})'"
            f":shadowcolor=black@0.3:shadowx=1:shadowy=1"
        )
    vf = ','.join(filters)
    run(
        f'ffmpeg -y '
        f'-f lavfi -i "color=c={DARK}:size={W}x{H}:rate={FPS}" '
        f'-vf "{vf}" '
        f'-t {dur} -c:v libx264 -preset fast -crf 18 -an {TMP}/{name}.mp4',
        name
    )

# Intro: "Hej," dyker upp, sedan "Arvo Flow." — Apple-klassikern
slate('intro', [
    ('Hej,',        72, 'white@0.90',  0.3, 1.5),
    ('Arvo Flow.',  88, 'white',       1.3, 2.2),
], dur=4.0)

# Money slate: 156 000 ENORMT — det här är "money shot"
slate('money', [
    ('156 000 kr / år.',            96, 'white',       0.3, 3.2),
    ('Det är vad du betalar idag.', 24, 'white@0.60',  1.1, 2.4),
], dur=4.0)

# Outro
slate('outro', [
    ('Noll kronor i förskott.',  56, 'white',       0.4, 3.2),
    ('arvo-flow.github.io',      22, '0x5DD6CA',   1.2, 2.5),
], dur=4.5)

# ═══════════════════════════════════════════════════════════════════
# 3. KLIPP DEMO-VIDEON I TVÅ DELAR + NORMALISERA
# ═══════════════════════════════════════════════════════════════════
print('[3/7] Klipper demo-video…')

# Del A: 0–22s  (landningssida → upload → analys → resultat precis dyker upp)
run(
    f'ffmpeg -y -i {SRC} -t 22 '
    f'-vf "fps={FPS},format=yuv420p" '
    f'-c:v libx264 -preset fast -crf 18 -an {TMP}/demo_a.mp4',
    'demo A (0–22s)'
)

# Del B: 22–39.6s (formulär, fullmakt, submit, bekräftelse)
run(
    f'ffmpeg -y -ss 22 -i {SRC} '
    f'-vf "fps={FPS},format=yuv420p" '
    f'-c:v libx264 -preset fast -crf 18 -an {TMP}/demo_b.mp4',
    'demo B (22–39.6s)'
)

# Normalisera slates
run(f'ffmpeg -y -i {TMP}/intro.mp4 -vf "fps={FPS},format=yuv420p" -c:v libx264 -preset fast -crf 18 -an {TMP}/intro_n.mp4', 'norm intro')
run(f'ffmpeg -y -i {TMP}/money.mp4 -vf "fps={FPS},format=yuv420p" -c:v libx264 -preset fast -crf 18 -an {TMP}/money_n.mp4', 'norm money')
run(f'ffmpeg -y -i {TMP}/outro.mp4 -vf "fps={FPS},format=yuv420p" -c:v libx264 -preset fast -crf 18 -an {TMP}/outro_n.mp4', 'norm outro')

# ═══════════════════════════════════════════════════════════════════
# 4. KONKATENERA MED HÅRDA CUTS (Apple-stil) + en dissolve
# ═══════════════════════════════════════════════════════════════════
print('[4/7] Konkatenerar klipp…')

# Sekvens: intro → demo_a → money → demo_b → outro
# intro→demo_a: dissolve 0.4s (svart→liv)
# demo_a→money: CUT (dramatisk)
# money→demo_b: dissolve 0.4s (svart→formulär)
# demo_b→outro: dissolve 0.5s

# Dela: intro(4s) -fade- demo_a(22s) [HARD CUT] money(4s) -fade- demo_b(17.6s) -fade- outro(4.5s)

# Steg A: intro + demo_a med dissolve
d1 = 0.4
run(
    f'ffmpeg -y -i {TMP}/intro_n.mp4 -i {TMP}/demo_a.mp4 '
    f'-filter_complex "[0][1]xfade=transition=fade:duration={d1}:offset={4.0-d1}[v]" '
    f'-map "[v]" -c:v libx264 -preset fast -crf 18 {TMP}/part1.mp4',
    'xfade intro→demo_a'
)

# Steg B: part1 + money med HARD CUT (concat)
run(
    f'ffmpeg -y -i {TMP}/part1.mp4 -i {TMP}/money_n.mp4 '
    f'-filter_complex "[0][1]concat=n=2:v=1:a=0[v]" '
    f'-map "[v]" -c:v libx264 -preset fast -crf 18 {TMP}/part2.mp4',
    'concat →money (hard cut)'
)

# Steg C: part2 + demo_b med dissolve
d2 = 0.4
# Behöver veta längden på part2
r = subprocess.run(
    f'ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {TMP}/part2.mp4',
    shell=True, capture_output=True, text=True
)
p2_dur = float(r.stdout.strip())
run(
    f'ffmpeg -y -i {TMP}/part2.mp4 -i {TMP}/demo_b.mp4 '
    f'-filter_complex "[0][1]xfade=transition=fade:duration={d2}:offset={p2_dur-d2}[v]" '
    f'-map "[v]" -c:v libx264 -preset fast -crf 18 {TMP}/part3.mp4',
    'xfade money→demo_b'
)

# Steg D: part3 + outro med dissolve
d3 = 0.5
r2 = subprocess.run(
    f'ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {TMP}/part3.mp4',
    shell=True, capture_output=True, text=True
)
p3_dur = float(r2.stdout.strip())
run(
    f'ffmpeg -y -i {TMP}/part3.mp4 -i {TMP}/outro_n.mp4 '
    f'-filter_complex "[0][1]xfade=transition=fade:duration={d3}:offset={p3_dur-d3}[v]" '
    f'-map "[v]" -c:v libx264 -preset fast -crf 18 {TMP}/video_silent.mp4',
    'xfade demo_b→outro'
)

# ═══════════════════════════════════════════════════════════════════
# 5. RÄKNA UT FINAL TIDSLINJE OCH BYGG LJUD-SPÅR
# ═══════════════════════════════════════════════════════════════════
print('[5/7] Bygger synkat ljud-spår…')

r3 = subprocess.run(
    f'ffprobe -v quiet -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {TMP}/video_silent.mp4',
    shell=True, capture_output=True, text=True
)
total = float(r3.stdout.strip())
print(f'  Total videolängd: {total:.2f}s')

# Beräkna ljudtidpunkter i det ihopsatta klippet:
#   intro(4s) -0.4xfade- demo_a(22s) [HARD CUT] money(4s) -0.4xfade- demo_b(17.6s) -0.5xfade- outro(4.5s)
intro_end = 4.0
# demo_a startar vid 4.0 - 0.4 = 3.6 i final (pga xfade overlap)
demo_a_start = intro_end - d1  # 3.6
# I demo_a: CTA-klick ≈ t=8.5 → final t = demo_a_start + 8.5
t_click_cta  = demo_a_start + 8.5   # ~12.1
t_snap_pdf   = demo_a_start + 15.0  # ~18.6
t_impact     = demo_a_start + 22.0  # money slate börjar här (~25.6)
# demo_b startar: intro(4) + demo_a(22) - d1(0.4) + money(4) - d2(0.4) = 29.2
demo_b_start = 4.0 - d1 + 22.0 + 4.0 - d2  # 29.2
# I demo_b: checkbox ≈ t=11 (relativt 22s in original = t=33 original)
t_check      = demo_b_start + 11.0  # ~40.2
t_submit     = demo_b_start + 14.0  # ~43.2
t_success    = demo_b_start + 17.0  # ~46.2

print(f'  Ljud-tidpunkter: CTA={t_click_cta:.1f}  PDF={t_snap_pdf:.1f}  '
      f'Impact={t_impact:.1f}  Check={t_check:.1f}  Success={t_success:.1f}')

# Bygg ett mixat ljud-spår: pad + alla sound effects med adelay
sounds_with_times = [
    (f'{TMP}/pad.wav',     0,         1.0),
    (f'{TMP}/click.wav',   t_click_cta, 0.9),
    (f'{TMP}/snap.wav',    t_snap_pdf,  1.1),
    (f'{TMP}/impact.wav',  t_impact,    1.2),
    (f'{TMP}/check.wav',   t_check,     1.0),
    (f'{TMP}/click.wav',   t_submit,    0.8),
    (f'{TMP}/success.wav', t_success,   1.0),
]

inputs = ' '.join(f'-i {s}' for s, _, _ in sounds_with_times)
delays = []
for i, (_, t, vol) in enumerate(sounds_with_times):
    ms = int(t * 1000)
    delays.append(f'[{i}]adelay={ms}|{ms},volume={vol}[a{i}]')

amix_in = ''.join(f'[a{i}]' for i in range(len(sounds_with_times)))
fc = (';'.join(delays) +
      f';{amix_in}amix=inputs={len(sounds_with_times)}:normalize=0,'
      f'afade=t=out:st={total-2.5:.2f}:d=2.5,volume=0.9[aout]')

run(
    f'ffmpeg -y {inputs} '
    f'-filter_complex "{fc}" '
    f'-map "[aout]" '
    f'-t {total:.2f} {TMP}/audio_mix.wav',
    'ljud-mix'
)

# ═══════════════════════════════════════════════════════════════════
# 6. KOMBINERA VIDEO + LJUD → FINAL
# ═══════════════════════════════════════════════════════════════════
print('[6/7] Slutlig export…')
run(
    f'ffmpeg -y '
    f'-i {TMP}/video_silent.mp4 -i {TMP}/audio_mix.wav '
    f'-map 0:v -map 1:a '
    f'-c:v copy -c:a aac -b:a 192k '
    f'-movflags +faststart '
    f'-t {total:.2f} '
    f'{OUT}',
    'final export'
)

size = os.path.getsize(OUT) / 1024 / 1024
print(f'\n✅  {OUT}  ({size:.1f} MB, {total:.1f}s)')
print('   Öppna i QuickTime / Chrome / VLC.')
