# Planejamento de Conteúdo — @adrianomaringolo.dev

> Atualizado em 2026-06-15 · Horizon: próximas 8 semanas

Formato: **Post** (imagem/frase) · **Carrossel** (slides educativos) · **Reel** (vídeo animado)

---

## Conteúdo existente

| ID | Formato | Tema | Status |
|---|---|---|---|
| post-01 | Post | Frase — clean code / artesanato | ✅ Publicado |
| post-02 | Post | Frase — sênior não é quem nunca erra | ✅ Publicado |
| post-03 | Post | Frase — código que funciona vs. código que comunica | ✅ Publicado |
| post-04 | Carrossel | IA para humanos: LLMs, agentes e usos práticos | Pronto para revisão |
| reel-01 | Reel | 3 erros comuns ao usar useEffect no React | ✅ Pronto para publicar |

---

## Fila de produção — Reels

### reel-07 — "3 verdades sobre o mercado de dev que ninguém te conta"
- **Gancho:** "O mercado de dev não é o que te venderam."
- **Cenas:**
  1. Hook (6s) — "TE VENDERAM." em vermelho pulsante
  2. Verdade 01 (8s) — A barra de entrada está subindo por causa da IA
  3. Verdade 02 (8s) — Os salários são bons, mas a validade é curta
  4. Verdade 03 (12s) — Entrevistas mais difíceis que vestibulares (lista animada)
  5. CTA (7s) — "Mas vale a pena? Sim." + sparkles
- **Total:** 41s | **Tom:** honesto, empático, sem sensacionalismo
- **Público:** devs iniciantes e em transição de carreira
- **Prioridade:** alta — tema atemporal, alto potencial de compartilhamento

### reel-02 — "5 hooks do React que você provavelmente não usa"
- **Gancho:** "useEffect não é o único hook que importa"
- **Cenas:** hook (5s) → useCallback (8s) → useMemo (8s) → useRef (8s) → useId (8s) → CTA (7s)
- **Ícones animados:** logo React girando no hook, ícones de engrenagem/otimização por cena
- **Prioridade:** alta — complementa reel-01, mesma série de React

### reel-03 — "TypeScript: 4 utility types que mudam tudo"
- **Gancho:** "Você usa TypeScript mas ainda declara types na mão?"
- **Cenas:** hook → `Partial<T>` → `Pick<T>` → `Omit<T>` → `Record<K,V>` → CTA
- **Ícones:** TS logo + shield/proteção animado
- **Prioridade:** alta — TypeScript tem alta demanda no público dev BR

### reel-04 — "Next.js App Router: o que mudou de verdade" *(baseado no blog post)*
- **Gancho:** "Pages Router ou App Router em 2026?"
- **Fonte:** blog `_nextjs-15-whats-new/pt-BR.mdx`
- **Cenas:** hook → Server Components → Layouts aninhados → Server Actions → quando NÃO migrar → CTA
- **Prioridade:** alta — blog post já existe, aproveitar o conteúdo

### reel-05 — "10 técnicas de performance em React" *(baseado no blog post)*
- **Gancho:** "Sua app React está lenta? Pode ser um desses 10 problemas"
- **Fonte:** blog `_react-performance-optimization/pt-BR.mdx`
- **Formato:** top 5 com preview + CTA para o blog completo
- **Prioridade:** média — blog post ainda é rascunho (`_` prefix)

### reel-06 — "IA no meu fluxo de trabalho como dev" *(baseado no blog post)*
- **Gancho:** "Não uso IA para escrever código. Uso para pensar mais rápido."
- **Fonte:** blog `_how-ai-transforms-web-development/pt-BR.mdx`
- **Tom:** pessoal, opinião, autêntico — maior potencial de engajamento
- **Prioridade:** alta — tema em alta, ângulo pessoal diferencia

---

## Fila de produção — Carrosséis

### carrossel-01 — "Por que todo dev precisa de portfólio" *(blog post publicado)*
- **Fonte:** `why-every-developer-needs-a-portfolio/pt-BR.mdx` (publicado em 2026-06-08)
- **Slides sugeridos:**
  1. Hook — "Portfólio não é vaidade. É reduzir a fricção entre seu talento e quem precisa dele."
  2. O mercado não te conhece mas pode te encontrar
  3. Currículo vs. portfólio — a diferença prática
  4. O nível exigido é mais baixo do que você imagina
  5. Qualquer coisa conta — GitHub, LinkedIn, projeto hospedado
  6. CTA — link na bio para o blog completo
- **Prioridade:** alta — conteúdo pronto, alta relevância para devs BR

### carrossel-02 — "5 regras de clean code que aplico todo dia"
- **Base:** ideas.md — frases sobre craftsperson e comunicação
- **Slides:**
  1. Hook — "Qualquer dev escreve código que funciona. O diferencial é código que comunica."
  2. Nomes que revelam intenção
  3. Funções que fazem uma coisa só
  4. Comentários explicam o porquê, não o quê
  5. Deixe o código mais limpo do que encontrou
  6. CTA
- **Prioridade:** média

### carrossel-03 — "Como estruturo um projeto Next.js do zero"
- **Conteúdo:** estrutura de pastas, config TypeScript, ESLint, variáveis de ambiente
- **Diferencial:** mostrar a estrutura real usada nos projetos do portfólio
- **Prioridade:** média

---

## Fila de produção — Apresentação de projetos

> Formato recomendado: **Post único** com screenshot do projeto + legenda com o case.
> Para projetos mais complexos, usar **carrossel** com antes/depois ou detalhes técnicos.

### projeto-01 — BuildGrid UI *(open source)*
- **Ângulo:** "Lancei minha primeira lib open source — e aprendi mais do que esperava"
- **Destaque:** desafio de consistência de componentes entre projetos, design de API pública, docs
- **Formato:** carrossel — problema → solução → stack → link do repositório
- **Por que primeiro:** open source gera mais engajamento na comunidade dev, cria autoridade
- **Prioridade:** alta

### projeto-02 — Sympro Landing Page
- **Ângulo:** "Landing page que converte visitante em lead antes do produto existir"
- **Destaque:** galeria rotativa de profissões no hero, floating cards de métricas, lista de espera
- **Formato:** post/carrossel com screenshots + detalhes de performance mobile (público em 4G)
- **Prioridade:** alta — bom visual, story técnico interessante (otimização LCP)

### projeto-03 — Gota de Cura
- **Ângulo:** "E-commerce para marca artesanal com propósito espiritual — um desafio diferente"
- **Destaque:** transmitir cuidado artesanal + missão solidária em código; gestão de produtos para usuário não técnico
- **Formato:** carrossel com o desafio de UX + stack escolhida
- **Prioridade:** média — nicho diferente, mostra versatilidade

### projeto-04 — Yane Leitão Personal Chef
- **Ângulo:** "Site para personal chef: onde gastronomia encontra código"
- **Destaque:** design criativo, foco em mobile, público específico
- **Formato:** post com screenshot bonito do site
- **Prioridade:** média

### projeto-05 — ASM Marketing Digital
- **Ângulo:** "Stack moderna para agência de marketing: Next.js + shadcn/ui em produção"
- **Destaque:** velocidade de desenvolvimento com componentes, deploy Vercel, TypeScript
- **Formato:** post técnico focado na stack
- **Prioridade:** baixa — menos visual que os outros

### projeto-06 — Morada Espírita / Portal da Morada
- **Ângulo:** "Webapp completo para centro espírita: do cadastro ao controle de eventos"
- **Destaque:** sistema de gestão para usuários não técnicos, simplicidade de UX
- **Formato:** carrossel com funcionalidades
- **Prioridade:** baixa

---

## Fila de produção — Posts de frase (slides únicos)

Banco de frases do `ideas.md` ainda não usadas:

| Frase | Tema | Prioridade |
|---|---|---|
| "Performance não é otimização de último minuto. É decisão de design do primeiro dia." | Frontend/Performance | Alta |
| "Tecnologia muda toda semana. Fundamentos te carregam por décadas." | Carreira | Alta |
| "Código limpo não é luxo. É respeito pelo próximo dev — que provavelmente vai ser você mesmo." | Clean Code | Média |

### Post sugerido — Certificados gratuitos da Anthropic sobre Claude

- **Ângulo:** "A Anthropic está oferecendo certificados gratuitos sobre Claude — e vale muito a pena"
- **Conteúdo:** divulgar os cursos/certificações gratuitas da Anthropic sobre como usar Claude para desenvolvimento, produtividade e criação de aplicações com IA
- **Tom:** dica de recurso genuíno, sem hype — mostrar o valor prático para devs
- **Formato sugerido:** carrossel ou post único com print/mockup do certificado
  - Slide 1: hook — "Certificado gratuito da Anthropic? Sim, existe."
  - Slide 2: o que você aprende (uso do Claude em código, prompts, API)
  - Slide 3: como acessar (link na bio)
  - Slide 4: CTA — "Já fiz o meu. E você?"
- **Hashtags sugeridas:** `#anthropic`, `#claude`, `#ia`, `#inteligenciaartificial`, `#devbrasil`, `#aprendizado`, `#certificado`, `#gratuito`
- **Prioridade:** alta — tema de IA em alta, gratuito = alto compartilhamento, posiciona como dev antenado em ferramentas modernas

> **Nota:** verificar URL oficial dos cursos/certificados antes de publicar e incluir na legenda.

---

### Novas frases sugeridas

| Frase | Tema |
|---|---|
| "O melhor código é o que o próximo dev não precisa perguntar sobre." | Clean Code |
| "TypeScript não é sobre tipos. É sobre comunicação entre devs." | TypeScript |
| "Abrir um PR é fácil. Revisar bem um PR de outra pessoa é uma habilidade rara." | Carreira |
| "Debugar é encontrar o gap entre o que você acha que o código faz e o que ele realmente faz." | Mentalidade |
| "Entrar no mercado sem portfólio é como mandar currículo sem aparecer na entrevista." | Carreira |
| "O maior inimigo da performance não é o código lento. É o código desnecessário." | Performance |

---

## Sugestão de calendário — próximas 8 semanas

| Semana | Conteúdo | Formato | Base |
|---|---|---|---|
| 1 | Publicar reel-01 (useEffect) | Reel | pronto |
| 1 | Frase — "Performance não é otimização de último minuto" | Post | ideas.md |
| 2 | projeto-01 — BuildGrid UI | Carrossel | portfólio |
| 2 | carrossel-01 — Por que todo dev precisa de portfólio | Carrossel | blog |
| 3 | reel-02 — 5 hooks do React | Reel | produzir |
| 3 | Frase — "Tecnologia muda toda semana. Fundamentos te carregam por décadas." | Post | ideas.md |
| 4 | projeto-02 — Sympro Landing Page | Post/Carrossel | portfólio |
| 4 | reel-04 — Next.js App Router | Reel | blog post |
| 5 | carrossel-02 — 5 regras de clean code | Carrossel | produzir |
| 5 | Frase — "O melhor código é o que o próximo dev não precisa perguntar sobre" | Post | nova |
| 6 | reel-06 — IA no meu fluxo de trabalho | Reel | blog post |
| 6 | Certificados gratuitos da Anthropic sobre Claude | Post/Carrossel | nova ideia |
| 6 | projeto-03 — Gota de Cura | Carrossel | portfólio |
| 7 | reel-03 — TypeScript utility types | Reel | produzir |
| 7 | projeto-04 — Yane Leitão | Post | portfólio |
| 8 | reel-05 — 10 técnicas de performance | Reel | blog post |
| 8 | carrossel-03 — estrutura Next.js do zero | Carrossel | produzir |

> **Ritmo sugerido:** 2 publicações por semana — 1 educativo (reel ou carrossel) + 1 post de frase ou projeto.

---

## Notas de produção

- **Reels baseados em blog posts**: publicar o reel antes do blog post (ou na mesma semana) — o reel dirige tráfego para o blog via "link na bio"
- **Blog posts rascunho** (`_` prefix): `_nextjs-15-whats-new`, `_react-performance-optimization`, `_how-ai-transforms-web-development` — publicar os posts antes ou junto dos reels correspondentes
- **Projetos**: sempre linkar para o portfólio (`adrianomaringolo.dev`) na legenda — CTA claro
- **Série React Hooks**: reel-01 e reel-02 formam uma série — mencionar na legenda do reel-02 que é continuação
