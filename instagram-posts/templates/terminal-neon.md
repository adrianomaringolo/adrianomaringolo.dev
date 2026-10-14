# Template `terminal-neon`

> **Nível de criatividade:** 3 · Ousado. Fonte de exibição própria e/ou efeito de texto ou de imagem. Exige a exceção de tipografia descrita neste template e respeita o teto de criatividade do cliente.

O post vira uma **janela de terminal**: fonte monoespaçada, prompt `$`, cursor piscando,
texto com **deslocamento de cor (glitch)**, linhas de scan e brilho neon. Pode explicar uma
regra como um `diff` (como era, como fica). É o formato mais "dev" do feed, para o público de apoio.

---

## Preview

<table>
<tr><td width="32%"><img src="previews/terminal-neon/slide-01.png" alt="Capa"></td><td width="32%"><img src="previews/terminal-neon/slide-02.png" alt="Interno"></td><td width="32%"><img src="previews/terminal-neon/slide-03.png" alt="Fecho"></td></tr>
<tr><td align="center"><b>Capa</b><br><sub>janela de terminal + glitch</sub></td><td align="center"><b>Interno</b><br><sub>código com diff</sub></td><td align="center"><b>Fecho</b><br><sub>comando de contato</sub></td></tr>
</table>

Conteúdo placeholder. O HTML que gera estas imagens está em `previews/terminal-neon/` — edite e rode
`node scripts/export-templates.mjs terminal-neon` para regerar.

---

## Quando usar

- Autoridade técnica explicada de forma leve: Clean Code, IA no fluxo, boas práticas.
- Antes e depois em linguagem de código (`- como era` / `+ como fica`).
- Pilar 4 (autoridade). **Respeita a regra de mix:** o público dev não pode dominar o feed.

**Não use quando…** o público é dono de negócio sem familiaridade técnica: o visual afasta.
Para explicar um mecanismo a leigos, use `explicador-tecnico`.

---

## Tipografia própria

> **Exceção de tipografia, só neste template.** O arquivo de marca manda em Manrope para tudo.
> Este template usa **JetBrains Mono** (monoespaçada) como fonte de exibição **apenas nos elementos listados abaixo**.
> O handle, o texto de apoio e o rodapé continuam em Manrope. Se a exceção virar regra do
> feed, formalize no manual (`/manual-marca manual`).

| Elemento | Fonte | Tamanho | Peso |
|---|---|---|---|
| Título glitch | JetBrains Mono | 104–120px | 800, `letter-spacing: -0.05em` |
| Título interno | JetBrains Mono | 64px | 800 |
| Prompt / comandos | JetBrains Mono | 34px | 400–700 |
| Código | JetBrains Mono | 33–36px | 400 |
| Linhas `[ok]` | JetBrains Mono | 31–33px | 400 / 800 |
| Handle, dots | Manrope | 25px | 700 |

```html
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&display=swap" rel="stylesheet">
```

---

## Efeitos de texto

```css
.glitch { text-shadow: -5px 0 rgba(6,182,212,.85), 5px 0 rgba(99,102,241,.85), 0 0 34px rgba(6,182,212,.35); } /* aberração cromática */
.cur    { display: inline-block; width: .5em; height: .9em; background: linear-gradient(180deg, #06b6d4, #6366f1);
          box-shadow: 0 0 24px rgba(6,182,212,.8); }                                                           /* cursor neon */
.scan   { background: repeating-linear-gradient(180deg, rgba(255,255,255,.025) 0 2px, transparent 2px 6px); }    /* linhas de scan */
.win    { border: 1.5px solid rgba(6,182,212,.4); box-shadow: 0 0 60px -10px rgba(6,182,212,.35); }
```

O gradiente de marca, se usado numa palavra do título, entra com `text-shadow: none`
(o glitch e o gradiente não combinam na mesma palavra).

Paleta de sintaxe, só com a marca: comentário `#64748b`, palavra-chave cyan `#06b6d4`, string
indigo claro `#a5b4fc`, linha adicionada em cyan claro com fundo em gradiente suave, linha
removida em cinza riscado.

---

## Estrutura de slides

| Slide | Papel | Tema |
|---|---|---|
| 01 | Capa: janela, comando, título com glitch e cursor, 2 linhas `[ok]` e 1 `[..]` | Escuro `#070d1c` |
| 02 a N-1 | Regra em código: título, 4 a 6 linhas com `diff`, linha `[ok]` de efeito | Escuro |
| N | Fecho: comando de contato, chamada com glitch, `[ok]` e URL | Escuro |

Faixa: **3 a 6 slides**. Tudo escuro, pois o tema é o terminal.

---

## Capa

Janela com barra de título (3 pontos em cyan, indigo e cinza + nome do arquivo). Dentro, o
bloco **centralizado na vertical**: linha de comando, título glitch com cursor, e as linhas
`[ok]`/`[..]` como promessas do carrossel.

## Slides internos

Título pequeno com glitch, bloco de código com **números de linha**, comentário, uma linha
removida (riscada, fundo cinza, borda esquerda cinza) e uma adicionada (cyan, fundo em
gradiente, borda esquerda cyan). Fecha com `[ok]` e o efeito em linguagem de negócio.

## Fecho

Comando `$ chame adriano --orcamento`, chamada com glitch, `[ok]` sobre prazo e preço fechados e a
URL em gradiente (JetBrains Mono 800).

---

## Imagens

Nenhuma.

---

## Variações permitidas

- Nome do arquivo na barra (`regra-01.js`, `post.sh`, `config.json`).
- Título com glitch cromático ou com brilho simples.
- Cursor em bloco (padrão) ou sublinhado.
- Linhas de código com ou sem `diff`.
- Linguagem do trecho: JS, CSS, HTML, shell ou pseudo-código em português.
- Janela cheia (padrão) ou tela inteira sem moldura.

## Travas

- **Todo código é real e correto** ou claramente pseudo-código em português. Razão: público dev percebe erro, e a marca vende honestidade técnica.
- **Todo trecho vem com a tradução para linguagem de negócio** (linha `[ok]`). Razão: regra da marca sobre jargão.
- **Sem emoji; os símbolos são `[ok]`, `[..]`, `$`, `+`, `-`.** Razão: regra de nenhum emoji nos slides.
- **Linhas de scan e glitch só em decoração**, nunca sobre texto de corpo pequeno. Razão: legibilidade.
- **Glitch sempre com as cores da marca** (cyan e indigo). Razão: unidade.
- Fundo escuro no `body`; handle e progress dots em todos os slides.

---

## Posts de referência

Nenhum ainda. Candidato: `post-47` (Clean Code: 5 regras que eu aplico todo dia), hoje em `explicador-tecnico`.
