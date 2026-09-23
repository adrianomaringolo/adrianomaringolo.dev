# Previews dos templates

Imagens de exemplo de cada template, com **conteúdo placeholder**. Servem para ver o
esqueleto visual antes de escolher um template — não são posts reais e não vão para o
Instagram.

```
previews/
  <template-id>/
    slide-01.html   ← fonte do preview (standalone, 1080×1350)
    slide-01.png    ← gerado pelo export, versionado
```

## Regerar

```bash
node instagram-posts/scripts/export-templates.mjs                 # todos
node instagram-posts/scripts/export-templates.mjs case-showcase   # só um
node instagram-posts/scripts/export-templates.mjs --scale 0.5     # arquivos mais leves
```

Padrão: 1080×1350 em escala 1 (mesma dimensão do post real).

## Convenções

- O texto placeholder **descreve o próprio papel** ("Headline que para o scroll",
  "Frase de apoio que completa o headline"). Assim a imagem documenta o template em vez
  de contar uma história falsa.
- Onde o template pede foto ou screenshot, o preview mostra uma **área hachurada com
  rótulo** (`FOTO DE CAPA · bg-cover.jpg`) em vez de uma imagem real. O que importa é o
  lugar e o tamanho que a imagem ocupa.
- Números em gráficos são ilustrativos e a fonte aparece como `Fonte: Instituição, 2026`.
- O preview segue as **travas** do template. Se você mudar uma trava no `.md`, mude o
  preview junto e rode o export.

## Ao editar um template

Prefira `/instagram-post refinar-template <id>` — a skill mantém `.md`, preview e índice
em sincronia e avisa quais posts existentes a mudança afetaria.

Na mão:

1. Ajuste o `.md` do template.
2. Ajuste o HTML do preview correspondente.
3. Rode o export.
4. Confira que a imagem no `.md` reflete a mudança.

Preview desatualizado é pior que preview ausente: ele engana a próxima escolha de template.
