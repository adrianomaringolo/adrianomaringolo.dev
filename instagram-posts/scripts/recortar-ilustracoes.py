#!/usr/bin/env python3
"""
Recorta uma folha de ilustrações (grade com bordas brancas) em quadros separados.

Uso:
  python3 scripts/recortar-ilustracoes.py "assets/images-perfil/Folha.png"
  python3 scripts/recortar-ilustracoes.py "assets/images-perfil/Folha.png" --dry-run

Detecta as faixas brancas que separam os quadros, salva cada quadro em
assets/images-perfil/NN-novo-K.png (NN continua a numeração da pasta) e a versão ampliada
em assets/images-perfil/3x/ (Lanczos 3x + nitidez leve). Depois, renomeie os arquivos com o
momento de cada um (ex.: 10-reuniao.png, nas duas pastas) e registre no assets/ASSETS.md.

Uma imagem sem bordas brancas vira um quadro só.
"""
import re
import sys
from pathlib import Path

from PIL import Image, ImageFilter

WHITE = 230      # canal mínimo para contar como branco
LINE = 0.85      # fração de pixels brancos para a linha contar como borda
MIN_PANEL = 80   # quadros menores que isso (px) são ignorados
INSET = 2        # px cortados de cada lado, para não sobrar fio branco


def gutters(px, length, span, horizontal):
    """Índices (linhas ou colunas) que são faixa branca."""
    out = []
    for i in range(length):
        whites = 0
        samples = 0
        for j in range(0, span, 2):
            p = px[j, i] if horizontal else px[i, j]
            whites += min(p) > WHITE
            samples += 1
        if whites / samples > LINE:
            out.append(i)
    return set(out)


def segments(length, gut):
    """Trechos contínuos fora das faixas brancas."""
    segs, start = [], None
    for i in range(length + 1):
        inside = i < length and i not in gut
        if inside and start is None:
            start = i
        elif not inside and start is not None:
            if i - start >= MIN_PANEL:
                segs.append((start, i))
            start = None
    return segs


def next_index(folder):
    nums = [int(m.group(1)) for f in folder.glob('*.png') if (m := re.match(r'(\d+)-', f.name))]
    return max(nums, default=0) + 1


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    dry = '--dry-run' in sys.argv
    if not args:
        print(__doc__)
        sys.exit(1)
    src = Path(args[0])
    folder = src.parent
    im = Image.open(src).convert('RGB')
    W, H = im.size
    px = im.load()

    cols = segments(W, gutters(px, W, H, horizontal=False))
    rows = segments(H, gutters(px, H, W, horizontal=True))
    print(f'{src.name}: {W}×{H} → {len(rows)} linha(s) × {len(cols)} coluna(s)')

    n = next_index(folder)
    (folder / '3x').mkdir(exist_ok=True)
    k = 1
    for y0, y1 in rows:
        for x0, x1 in cols:
            box = (x0 + (INSET if x0 else 0), y0 + (INSET if y0 else 0),
                   x1 - (INSET if x1 < W else 0), y1 - (INSET if y1 < H else 0))
            crop = im.crop(box)
            name = f'{n:02d}-novo-{k}.png'
            print(f'  {name}  {crop.width}×{crop.height}')
            if not dry:
                crop.save(folder / name, optimize=True)
                up = crop.resize((crop.width * 3, crop.height * 3), Image.LANCZOS)
                up = up.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
                up.save(folder / '3x' / name, optimize=True)
            n += 1
            k += 1

    if dry:
        print('(dry-run: nada foi salvo)')
    else:
        print('Renomeie cada "NN-novo-K.png" com o momento (nas duas pastas) e registre no assets/ASSETS.md.')


if __name__ == '__main__':
    main()
