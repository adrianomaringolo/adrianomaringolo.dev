# Assets — Adriano Maringolo

Arquivos compartilhados entre posts e materiais. Logos: dono é a skill `manual-marca` (`marca/MARCA.md`).
Os SVGs foram redesenhados por construção geométrica a partir do PNG do site (`apps/portfolio/public/logo.png`),
que era o único arquivo existente.

## Logos (`assets/logos/`)

| Arquivo | O que é | Quando usar |
|---|---|---|
| `logo-horizontal.svg` | símbolo + `adrianomaringolo.dev`, Marinho `#1E3969` | principal, fundo claro (e-mail, site, papel) |
| `logo-horizontal-negativo.svg` | o mesmo em Névoa `#F5F7FA` | fundo Marinho ou Noite |
| `logo-horizontal-mono.svg` | `currentColor` | colar inline e colorir por contexto |
| `logo.svg` / `logo-negativo.svg` / `logo-mono.svg` | só o símbolo (versões de cor) | quando não há espaço para o nome |
| `simbolo.svg` | símbolo em `currentColor` | ícone, selo |
| `avatar.svg` · `avatar-320.png` | A claro sobre círculo Marinho, com respiro para recorte | foto de perfil das redes |

Cada SVG tem PNG ao lado (`node ~/.claude/skills/manual-marca/scripts/logos.mjs .`).
O wordmark é gerado por `marca/gerar-wordmark.mjs` (Manrope 800 + 500 em curvas, fontes em `marca/fontes/`).
Tamanho mínimo: logo horizontal 180 px / 45 mm; símbolo 32 px / 10 mm. O logo **não entra nos slides dos posts**.
