# Assets compartilhados dos posts

Arquivos reutilizáveis entre posts. Os slides apontam para eles por path relativo
(`../../assets/...` a partir de `html/post-NN/`). Não copie para a pasta do post.

## Logos (`logos/`)

Do manual da marca (`marca/MARCA.md`). **Não entram nos slides dos posts** (ver BRAND.md,
"Elementos de marca"); valem para materiais fora do feed.

## Ilustrações do Adriano (`images-perfil/`)

Retratos em estilo cartoon, recortados de `Nove Momentos de um Criador Curioso.png` (a folha
original fica na pasta). Cada recorte tem **só ~375×420–500px**: use como recorte, card,
polaroide ou palco de até ~650px de largura no slide (ou até ~900px com as versões `3x/`). **Nunca em tela cheia** (1080px), que
amplia demais e borra.

| Arquivo | Momento | Quando usar |
|---|---|---|
| `images-perfil/01-cafe.png` | Café na mão, notebook, estante (blusa azul) | Apresentação, bom dia, começo de projeto |
| `images-perfil/02-ideia.png` | Mão no queixo, lâmpada acesa (blusa verde) | Briefing, pensar antes de codar, dúvida do cliente |
| `images-perfil/03-codando.png` | Digitando, código no monitor (moletom vinho) | Desenvolvimento, "quem faz é quem você contrata" |
| `images-perfil/04-livros-stack.png` | Pilha de livros React, TypeScript, Next.js, Design Systems, Clean Code | Autoridade técnica, stack, estudo |
| `images-perfil/05-cachorro.png` | Fazendo carinho no cachorro (blusa clara) | Humano, fim de semana, descanso |
| `images-perfil/06-rua-cidade.png` | Mochila e garrafa, cidade ao fundo | Remoto, de qualquer lugar, rotina |
| `images-perfil/07-foco-fones.png` | Fones, digitando, caneca (blusa amarela) | Foco, modo produção, prazo |
| `images-perfil/08-joinha.png` | Joinha na mesa (camiseta marinho) | Entrega, aprovação, fecho, CTA |
| `images-perfil/09-leitura.png` | Lendo no sofá, abajur (moletom roxo) | Estudo, noite, opinião, carreira |

**Versões ampliadas (`images-perfil/3x/`)**: os mesmos 9 recortes em 3× (Lanczos + nitidez
leve, ~1120×1250–1510px). Use estas quando a ilustração passar de ~400px no slide; elas aguentam
círculo/card de até ~900px sem borrar tanto. Tela cheia (1080px) continua desaconselhada.

**Imagens novas**: coloque a folha na pasta e rode
`python3 scripts/recortar-ilustracoes.py "assets/images-perfil/<folha>.png"` (recorta pelas bordas
brancas e já gera o `3x/`). Renomeie `NN-novo-K.png` com o momento, nas duas pastas, e adicione a
linha na tabela acima. Uso na estratégia: `estrategia-conteudo.md`, seção 4.1.

Tratamento: `border-radius` 32–48px ou recorte circular, sombra colorida da marca
(`rgba(99,102,241,…)`, nunca cinza), `object-fit: cover` com `object-position` no rosto.
