# Template `checklist-salvavel`

> **Nível de criatividade:** 1 · Base. Só Manrope, esqueleto previsível, sem efeito de texto ou de imagem. Cabe em qualquer cliente e é a base do feed.

Uma **lista de verificação feita para ser salva**: caixas grandes de marcar, itens curtos e
verificáveis, e um selo "Salve" desde a capa. O leitor guarda o post e volta a ele na hora de
decidir. Nasceu de posts como o `post-39` (12 perguntas antes de contratar), que viviam como
lista tipográfica mas pediam um objeto próprio.

---

## Preview

<table>
<tr><td width="32%"><img src="previews/checklist-salvavel/slide-01.png" alt="Capa"></td><td width="32%"><img src="previews/checklist-salvavel/slide-02.png" alt="Interno"></td><td width="32%"><img src="previews/checklist-salvavel/slide-03.png" alt="Fecho"></td></tr>
<tr><td align="center"><b>Capa</b><br><sub>folha de checklist sobre fundo escuro</sub></td><td align="center"><b>Interno</b><br><sub>bloco com 4 itens</sub></td><td align="center"><b>Fecho</b><br><sub>convite a salvar</sub></td></tr>
</table>

Conteúdo placeholder. O HTML que gera estas imagens está em `previews/checklist-salvavel/` — edite e rode
`node scripts/export-templates.mjs checklist-salvavel` para regerar.

---

## Quando usar

- Antes de contratar, antes de publicar, "o que conferir em…": qualquer coisa que o leitor
  vai **conferir item a item**.
- Pilar 1 (educação para o cliente). Meta do post: **salvamento**, mais que curtida.
- Entre 6 e 15 itens no total, divididos em blocos.

**Não use quando…** a lista é explicação, não verificação. Se cada item precisa de um
parágrafo para fazer sentido, use `tipografico`. Se o conteúdo é uma escolha entre caminhos,
use `fluxograma-decisao`.

---

## Estrutura de slides

| Slide | Papel | Tema |
|---|---|---|
| 01 | Capa: promessa + folha de checklist com 2 itens marcados, 2 por marcar | Escuro `#0a1226` |
| 02 a N-1 | Um bloco por slide, 3 a 5 itens com caixa grande e uma linha de explicação | Claro `#f5f7fa` |
| N | Fecho: ícone de salvar + convite | Escuro `#0f172a` |

Faixa: **4 a 7 slides**. Post único (1 slide) só para checklist de até 5 itens, sem slide de fecho.

---

## Capa

A "folha" é o elemento do template: um card branco com cabeçalho (`Checklist · N itens`),
selo **Salve** em gradiente e linhas com caixa. As duas primeiras ficam marcadas, a quarta
esmaece e a última linha diz quantos itens vêm nos próximos slides.

```css
.sheet { background: #fff; border-radius: 26px; padding: 12px 36px 6px;
         box-shadow: 0 34px 80px -26px rgba(0,0,0,0.7); }
.box   { width: 54px; height: 54px; border-radius: 14px; border: 3px solid #cbd5e1; }
.row.done .box { border: none; background: linear-gradient(135deg, #0891b2, #6366f1); } /* check Lucide */
.row.fade { opacity: .38; }
```

O título e a folha ficam num bloco único: título no topo, folha **centralizada na vertical**
no espaço restante (`.mid { flex: 1; justify-content: center }`).

---

## Slides internos

Cada item é um cartão branco com caixa (52px), **título em 800** e uma linha de apoio
("como conferir"). O contador do bloco (`Bloco 01 / 03`) e o intervalo de itens
(`Itens 1 a 4`) ficam no topo. A nota final (`Dica do bloco`) é opcional.

---

## Fecho

Escuro `#0f172a`, com o ícone `bookmark` num quadrado em gradiente, título curto com o
convite a salvar e dois cartões "se… então…" (`fecho-desfechos`). `fecho-recap` também cabe,
repetindo o número de itens. URL em gradiente.

---

## Imagens

Nenhuma. Ícones Lucide (`check`, `bookmark`), path real, `stroke-width: 2`.

---

## Escala tipográfica

| Elemento | Tamanho | Peso |
|---|---|---|
| Headline de capa | 84–92px | 900 |
| Item da folha (capa) | 33–36px | 700 |
| Título do item (interno) | 30–34px | 800 |
| Apoio do item | 23–25px | 500 |
| Headline de bloco | 62–68px | 900 |

---

## Variações permitidas

- Capa com 2 a 3 itens marcados e 1 a 2 esmaecidos.
- Blocos de 3, 4 ou 5 itens, conforme o texto.
- Itens **sem** linha de apoio quando o título já basta (aí cabem até 6 por slide).
- Caixa marcada como `check` (padrão) ou numerada (`1`, `2`…) em checklists com ordem.
- Slide de "sinais de alerta" no fim (caixas com `x`, em cinza), como no `post-39`.
- `fecho-desfechos` ou `fecho-recap`.

## Travas

- **Cada item é verificável** (o leitor consegue dizer sim ou não). Item vago como "tenha uma
  boa presença" vira `tipografico`. Razão: o valor do template é a conferência.
- **Selo "Salve" na capa e `bookmark` no fecho.** Razão: o objetivo do formato é salvamento.
- **Caixas sempre à esquerda e iguais entre os slides.** Razão: o leitor reconhece o objeto.
- **Itens marcados na capa são exemplo**, nunca resultado de pesquisa. Razão: não afirmar nada
  sem fonte.
- Nunca mais de 5 itens por slide interno. Razão: legibilidade no celular.
- `background` escuro declarado no `body`; `accent-left` + `accent-top`, progress dots e handle em todos os slides.
- Nenhum emoji no slide.

---

## Posts de referência

Nenhum ainda. Semente: `post-39` (12 perguntas antes de contratar quem vai fazer o seu site),
hoje em `tipografico`.
