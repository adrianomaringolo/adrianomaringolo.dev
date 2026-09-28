---
target: a página inicial (home)
total_score: 17
max_score: 24
na_heuristics: 5,7,9,10
p0_count: 3
p1_count: 1
timestamp: 2026-08-25T02-27-46Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review · B: detector + browser evidence), isolados um do outro

## Design Health Score

| # | Heuristic | Score | Achado principal |
|---|-----------|-------|-----|
| 1 | Visibilidade do status do sistema | 3 | Toggles de tema/idioma e nav ativa dão feedback claro; o canvas de partículas do hero é um elemento ambiente contínuo, não um status. |
| 2 | Correspondência com o mundo real | 4 | Copy natural, bilíngue, ordem lógica de leitura. |
| 3 | Controle e liberdade do usuário | 2 | O painel lateral do ServicePicker não tem `Escape`, `role="dialog"`, nem gestão de foco — só fecha via clique no backdrop ou no X. |
| 4 | Consistência e padrões | 3 | O padrão de lista editorial é aplicado com disciplina em todo o resto da página — só o hero foge dele com um efeito de partículas que não existe em nenhuma outra seção. |
| 5 | Prevenção de erros | n/a | Não há formulários/ações destrutivas na home. |
| 6 | Reconhecimento em vez de recordação | 3 | Nav com texto, labels de seção persistentes; thumbnails de projeto só aparecem no hover — zero pista de que existem para quem usa toque. |
| 7 | Flexibilidade e eficiência | n/a | Superfície Persuade/portfólio — não se espera atalho de power user aqui. |
| 8 | Design estético e minimalista | 2 | About/ServicePicker/Testimonials/Projects são exemplares nisso; o canvas de partículas + a foto composta em IA do About contradizem essa mesma restrição, na seção mais visível da página. |
| 9 | Recuperação de erros | n/a | Não há interações que produzem erro nesta superfície. |
| 10 | Ajuda e documentação | n/a | Não se aplica a um portfólio. |
| **Total** | | **17/24 (71%)** | **Bom, na borda inferior — quase todo o desconto vem do hero** |

## Veredito de especificidade do design

A IA, a copy e os padrões de interação de cinco das sete seções (About, ServicePicker, Testimonials, FeaturedProjects, FeaturedBlog/CTA) são genuinamente autorais e alinhados ao `DESIGN.md`: a lista editorial numerada com thumbnail no hover, o padrão de linha de disciplina/serviço reaproveitado entre About e ServicePicker, a linha "trabalhei com" citando empresas reais, o painel deslizante talhado para exatamente três ofertas reais. Isso não é um template — não dá pra colar em outro portfólio sem reescrever.

O hero — a seção que mais deveria carregar "isso é uma pessoa real e específica" — é o oposto disso. O `neural-network-canvas.tsx` roda um campo de partículas em loop indefinido atrás do nome; a foto do About é um composto claramente gerado por IA (lâmpada brilhando, ícones flutuantes de coração/escudo/cérebro, Terra vista do espaço, linhas de constelação); e o próprio nome carrega um efeito de "tinta" que segue o cursor (`hero-blobs.tsx`) não documentado no `DESIGN.md`. A parte mais pessoal da página é, paradoxalmente, a menos específica e a que mais viola o próprio sistema de design documentado.

**Scan determinístico (detector)**: a varredura por CLI achou 2 hits (gradiente de texto, paleta roxa) — mas ambos em `services-section.tsx`, um arquivo **morto, não importado em lugar nenhum** (confirmado por busca no código; `page.tsx` usa `ServicePickerSection`, não `ServicesSection`). Não afeta a home real — vale só como faxina.

A varredura ao vivo no navegador (DOM renderizado, incluindo nav/layout) achou 14 ocorrências, mas a maioria são **falsos positivos em relação ao próprio DESIGN.md deste projeto**: 10 delas são "cyan neon text" nos labels de seção (`text-xs tracking-[0.2em] text-primary uppercase font-mono`) — esse é literalmente o componente "Section labels" documentado e usado de propósito em toda a página, não uma imitação genérica de IA. O `kicker-above-heading` flagra o mesmo padrão de eyebrow que o site usa deliberadamente em todo lugar. Os 4 `image-hover-transform` batem no mesmo microinteração de hover documentada (`group-hover:translate-x-1`) que o `DESIGN.md` aprova explicitamente. O detector é calibrado para "slop" genérico e não tem contexto de que cyan é o token `--primary` intencional desta marca — então, cruzando com o próprio sistema documentado, só sobra ruído aqui, não achados reais.

## Impressão geral

O meio da página (About → ServicePicker → Testimonials → Projects) é a parte mais forte do site: quieta, crível, bem ritmada. O problema é que a jornada emocional está invertida — o primeiro momento (hero) é o mais fraco, com uma animação de entrada que renderizou de forma ilegível em testes automatizados e um efeito de partículas que contradiz a própria filosofia de restrição do site. A maior oportunidade não é adicionar nada — é fazer o hero seguir a mesma disciplina que o resto da página já demonstra.

## O que está funcionando

1. **Lista editorial do `FeaturedProjects`** — implementação fiel do padrão anti-card-grid documentado: índice, título/descrição/tech, thumbnail no hover, mais um toque bacana (o preview flutuante grande em telas `xl:`) que adiciona charme sem adicionar chrome.
2. **Fluxo ServicePicker → painel lateral** — confiante e específico: três ofertas reais, painel com blur no backdrop, scroll-lock e link de contato já filtrado pelo serviço escolhido. Isso é interação autoral, não boilerplate.
3. **Seção de depoimentos** — nomes, cargos e empresas reais, em português natural, sem estrelinhas nem agregação de vaidade. Recusa disciplinada do padrão genérico de "prova social" — exatamente o que o `DESIGN.md` pede.

## Problemas prioritários

**[P0] Nome do hero renderizou ilegível/quebrado no carregamento, de forma reprodutível**
- **O quê**: em cargas de página separadas (1440px, claro e escuro), o `<h1>Adriano Maringolo</h1>` apareceu como fragmentos ilegíveis por alguns segundos — o texto no DOM estava correto, mas o wrapper de animação de entrada (`LineReveal`, `hero-section.tsx`, `overflow-hidden` + Framer Motion `y: '105%' → '0%'`) parecia travado.
- **Ressalva importante**: eu mesmo reproduzi algo parecido nesta mesma sessão (formas abstratas em vez do nome, aos ~2s) — mas ao esperar mais um pouco (sem clicar em nada), o nome renderizou perfeitamente. Isso contradiz parcialmente a afirmação de que "só resolve com interação" — parece mais um problema de timing em modo dev (primeira compilação do Turbopack, fontes, cálculo do path SVG do nome) do que um travamento permanente. **Vale testar num build de produção (`npm run build && npm start`) antes de tratar isso como confirmado** — mas o sintoma de "nome ilegível nos primeiros segundos" é real e foi visto duas vezes, de forma independente.
- **Por que importa**: é o conteúdo mais importante da página inteira, e não existe fallback estático — se a animação não disparar a tempo, quem chega vê nada ou fragmentos onde deveria ver o nome da pessoa.
- **Fix**: confirmar em build de produção primeiro; de qualquer forma, dar um fallback seguro (nome sempre legível sem clip, com o reveal como enhancement progressivo por cima, não como único caminho pra visibilidade).
- **Comando sugerido**: `/impeccable harden`

**[P0] O hero viola os próprios anti-padrões documentados no DESIGN.md**
- **O quê**: `neural-network-canvas.tsx` roda um campo de 30 partículas conectadas, em loop indefinido, full-viewport, atrás do nome. O `DESIGN.md` proíbe explicitamente "decorações de código flutuante ou efeitos de partículas" e limita animações em loop a "glows ambiente extremamente sutis (opacidade máx. 0,07)" — isso não é nem uma coisa nem outra.
- **Por que importa**: é o próprio sistema de design documentado do projeto sendo violado na seção mais visível da página, contradizendo diretamente o Princípio #2 ("Restrição é confiança") e a anti-referência "Agência/estúdio espetacular" que o `PRODUCT.md` rejeita explicitamente.
- **Fix**: remover o canvas de partículas, ou trocar pelo padrão de glow ambiente já aprovado (gradiente radial, opacidade ≤0,10, posição estática) — que já é usado corretamente em outro lugar do mesmo hero.
- **Comando sugerido**: `/impeccable quieter`

**[P0] Foto do About é um composto gerado por IA, não o "humano antes de profissional" que o site promete**
- **O quê**: `about-profile-photo-{light,dark}.jpeg` mostram a pessoa na frente de uma cena sintética — lâmpada brilhando, ícones flutuantes (coração/escudo/globo/cérebro), Terra vista do espaço, linhas de constelação. Eu mesmo vi essa imagem diretamente nesta sessão.
- **Por que importa**: o Princípio #3 é explícito: "uma pessoa real, com experiência real — não um currículo impresso num site." Essa imagem é o oposto disso — é literalmente o exemplo do anti-referência "portfólio genérico de dev com IA" que o `PRODUCT.md` cita, bem no ponto da página onde um cliente em potencial decide se confia na pessoa por trás do trabalho.
- **Fix**: trocar por uma foto real, sem composição, da pessoa — quanto mais simples, mais alinhada à restrição que a marca já pede em todo o resto.
- **Comando sugerido**: `/impeccable polish`

**[P1] FeaturedBlog e CTA mostram os mesmos posts, um atrás do outro**
- **O quê**: `FeaturedBlog` mostra um post em destaque mais os próximos 3; logo abaixo, `CTASection` mostra os 3 posts mais recentes — sobrepondo pelo menos 2 títulos já vistos na seção anterior. Além disso, o `DESIGN.md` documenta a estrutura da home terminando em Hero/About/ServicePicker/Testimonials/FeaturedProjects/CTA — **sem mencionar `FeaturedBlog`**, o que sugere uma seção adicionada sem reconciliar a documentação.
- **Por que importa**: viola o Princípio 5 ("toda seção precisa justificar seu lugar") e cria uma repetição confusa bem antes do CTA final — o pior lugar da página pra isso, dado o efeito peak-end.
- **Fix**: ou remove a lista de posts recentes do CTA (já que o FeaturedBlog cobre isso), ou remove o FeaturedBlog e deixa só o CTA mostrar os posts, como documentado.
- **Comando sugerido**: `/impeccable distill`

**[P2] Painel do ServicePicker não tem saída por teclado**
- **O quê**: o painel lateral (`service-picker-section.tsx`) não tem handler de `Escape`, `role="dialog"`/`aria-modal`, nem gestão de foco (não move foco pro painel ao abrir, nem devolve pro botão ao fechar).
- **Por que importa**: quem usa teclado consegue abrir o painel, mas não tem como fechá-lo sem mouse a não ser tabulando por todo o conteúdo até achar o X visível — um gap real de acessibilidade e de "controle e liberdade do usuário".
- **Fix**: adicionar `role="dialog"` + `aria-modal="true"`, um handler de `Escape` que chama `setOpen(null)`, e mover o foco pro painel ao abrir / devolver ao gatilho ao fechar.
- **Comando sugerido**: `/impeccable harden`

## Red flags por persona

**Jordan (primeira vez no site)**
- Nos primeiros 5 segundos, pode ver o nome em branco ou fragmentado em vez de "Adriano Maringolo" (ver P0 acima).
- A foto do About não parece uma foto real à primeira vista (fundo espacial, ícones flutuantes) — bem no ponto em que Jordan está decidindo se confia num estranho com um projeto.
- Ao rolar até o fim, vê os mesmos dois títulos de post duas vezes seguidas (FeaturedBlog → CTA) e pode achar que a página travou ou que rolou passado algo sem perceber.

**Riley (testador metódico)**
- Recarregando a página várias vezes, encontra o nome do hero genuinamente quebrado no carregamento.
- Ao recarregar a seção de depoimentos, vê um conjunto diferente de 4 citações toda vez (`Math.random()` sem seed) — sem forma de referenciar um conjunto específico, e com um salto de conteúdo de um frame após a hidratação.
- Abrindo o devtools, vê um warning do Next.js sobre a foto do About usar `fill` com um elemento pai sem `position` válido — mina a alegação de "precisão em cada detalhe" assim que alguém olha por baixo do capô.

**Casey (mobile, distraída)**
- A coluna de thumbnail do `FeaturedProjects` é `hidden lg:block` com `opacity-0 group-hover:opacity-100` — em touch não existe hover, então Casey nunca vê uma única captura de tela de projeto, nem um fallback estático, justamente na seção que devia ser "o produto" (Princípio #1).
- O preview flutuante grande também é exclusivo de desktop (`xl:block`), dobrando a mesma lacuna.
- (Limitação do teste: a automação de navegador não conseguiu forçar uma viewport realmente estreita nesta sessão — então essa leitura é baseada no código-fonte, não confirmada visualmente ao vivo.)

## Observações menores

- Os tokens de modo claro em `globals.css` já divergem do que o `DESIGN.md` documenta: `--background` é `#f5f7fa` (doc diz `#ffffff`), `--muted-foreground` é `#4b5563` (doc diz `#64748b`). Pequeno, mas vale reconciliar dado que "precisão em cada detalhe" é um princípio citado.
- Bastante texto real (não decorativo) usando opacidades bem baixas — datas, tempo de leitura, a linha "trabalhei com" a `/35` — vale um passe de contraste, pode estar abaixo de WCAG AA nessas opacidades.
- O efeito de "tinta" que segue o cursor no nome (`hero-blobs.tsx`) é tecnicamente impressionante mas não está documentado no `DESIGN.md` — vale uma decisão deliberada (manter e documentar, ou cortar) em vez de deixá-lo como uma exceção não reconciliada.
- `services-section.tsx` é código morto (não importado em lugar nenhum) e é onde o detector achou os únicos 2 hits via CLI — candidato a exclusão simples.

## Perguntas para considerar

- O resto da página prova que a restrição funciona — listas quietas, depoimentos reais, sem truques. Por que a seção que representa a própria pessoa (hero + foto do About) é a que recorre às escolhas mais artificiais e menos contidas da página inteira?
- Se a animação de entrada do nome pode falhar silenciosamente, o que "o nome como declaração tipográfica" realmente significa pra quem nunca vê isso disparar direito?
- Cortar o canvas de partículas e a foto composta em IA, e simplesmente mostrar o nome e uma foto real em silêncio, passaria mais confiança — ou menos — do que o que existe hoje?
