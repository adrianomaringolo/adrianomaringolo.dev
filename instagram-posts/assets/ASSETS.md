# Assets compartilhados dos posts

Arquivos reutilizáveis entre posts. Os slides apontam para eles por path relativo
(`../../assets/...` a partir de `html/post-NN/`). Não copie para a pasta do post.

## Logos (`logos/`)

Do manual da marca (`marca/MARCA.md`). **Não entram nos slides dos posts** (ver BRAND.md,
"Elementos de marca"); valem para materiais fora do feed.

## Ilustrações do Adriano (`images-perfil/`)

Retratos em estilo cartoon, recortados das folhas da pasta (01–09 de `Nove Momentos de um Criador Curioso.png`; 10–18 de
`Colagem de Nove Momentos Criativos.png`; 19–20 de `Nove Momentos de um Criativo Desenvolvedor.png`,
cujos outros quadros repetiam momentos já existentes). Cada recorte tem **só ~375×420–500px**: use como recorte, card,
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
| `images-perfil/10-design-figma.png` | De costas, desenhando telas no Figma com caneta (moletom azul) | Design, layout, interface antes do código |
| `images-perfil/11-palestra.png` | Palestrando com microfone e crachá, plateia (camiseta preta) | Comunidade, compartilhar conhecimento, autoridade |
| `images-perfil/12-brincando-blocos.png` | Montando blocos de brinquedo num quarto infantil (blusa clara) | Família, paternidade, "construir aos poucos" |
| `images-perfil/13-wireframe.png` | De costas, desenhando wireframe num quadro com post-its (moletom verde) | Planejamento, estrutura, briefing visual |
| `images-perfil/14-fotografia.png` | Fotografando nas montanhas, mochila (camisa azul) | Hobby, olhar para detalhe, viagem, fim de semana |
| `images-perfil/15-cozinhando.png` | Cozinhando, temperando a panela (avental) | Hobby, receita/processo, cuidado com o detalhe |
| `images-perfil/16-videogame.png` | Jogando videogame com fone no sofá (moletom vinho) | Lazer, descanso, sexta à noite |
| `images-perfil/17-estudando.png` | Escrevendo num caderno, livros React, TypeScript, System Design | Estudo contínuo, aprendizado, autoridade técnica |
| `images-perfil/18-por-do-sol.png` | De costas, sentado olhando o pôr do sol sobre a cidade | Reflexão, fim de ciclo, visão de carreira |
| `images-perfil/19-call-clientes.png` | Em videochamada com quatro pessoas (camisa azul-clara) | Reunião com cliente, atendimento remoto, briefing |
| `images-perfil/20-game-on.png` | Rindo com controle e pipoca, neon "GAME ON" (camiseta preta) | Lazer, comemoração, leveza |

**Versões ampliadas (`images-perfil/3x/`)**: os mesmos 9 recortes em 3× (Lanczos + nitidez
leve, ~1120×1250–1510px). Use estas quando a ilustração passar de ~400px no slide; elas aguentam
círculo/card de até ~900px sem borrar tanto. Tela cheia (1080px) continua desaconselhada.

**Imagens novas**: coloque a folha na pasta e rode
`python3 scripts/recortar-ilustracoes.py "assets/images-perfil/<folha>.png"` (recorta pelas bordas
brancas e já gera o `3x/`). Renomeie `NN-novo-K.png` com o momento, nas duas pastas, e adicione a
linha na tabela acima. Uso na estratégia: `estrategia-conteudo.md`, seção 4.1.

Tratamento: `border-radius` 32–48px ou recorte circular, sombra colorida da marca
(`rgba(99,102,241,…)`, nunca cinza), `object-fit: cover` com `object-position` no rosto.
