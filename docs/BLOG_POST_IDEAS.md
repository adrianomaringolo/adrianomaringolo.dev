# Sugestões de Posts para o Blog

> Levantamento feito em 2026-07-15 a partir do conteúdo real do site: `src/data/career.ts`,
> `about-technologies.tsx`, `about-principles.tsx`, FAQ de `/about` e os posts já
> publicados em `src/content/blog`. A ideia é que cada sugestão se apoie em algo que
> você genuinamente viveu ou construiu, não em tópicos genéricos de blog técnico.

## Já publicados ou em andamento (para não duplicar)

| Post | Categoria | Status |
|---|---|---|
| Why Every Developer Needs a Professional Portfolio | Carreira | ✅ Publicado |
| SOLID in React: An Introductory Guide to the 5 Principles | Background técnico | ✅ Publicado — promete 5 posts de aprofundamento, um por letra (S, O, L, I, D), com código antes/depois. |
| SOLID: Single Responsibility Principle na prática (React) | Background técnico | ✅ Publicado — primeiro post da série de aprofundamento (S), com refatoração real do `UserProfile` teasado no post introdutório. **Próximo da série: Open/Closed (O).** |
| 10 Técnicas Avançadas para Otimizar Performance em React | Background técnico | 📝 Rascunho (`_2025-01-20-react-performance-optimization`) — hoje é só uma lista de bullets, precisa de exemplos reais para ser publicado |
| Next.js 15: O Que Há de Novo | Background técnico | 📝 Rascunho (`_2025-01-18-nextjs-15-whats-new`) — provavelmente vale reescrever com foco em Server Components/Server Actions em vez de changelog de versão |
| Como a IA Está Transformando o Desenvolvimento Web | Background técnico | 📝 Rascunho (`_2025-01-15-how-ai-transforms-web-development`) — genérico demais hoje; a sugestão #6 abaixo é uma versão mais específica e defensável (fala do seu uso real de Claude Code/Cursor, não de IA em geral) |

---

## 1. Background técnico

Histórico: 15+ anos de carreira, começou em .NET/C# (Sedna, 2009), passou por
Angular/C# (Venturus), Tech Lead em projeto de saúde nos EUA (Dextra/CI&T),
component library acessível para e-commerce (Avenue Code), e hoje é Senior
Software Craftsperson na Codurance (Clean Code, TDD, arquitetura). Stack atual:
React, Next.js, TypeScript, Node.js, GraphQL, mais um bloco de IA/automação
(Claude Code, Cursor, Copilot, n8n).

1. **Continuar a série SOLID** — os 5 posts já prometidos (S, O, L, I, D), cada um com
   um exemplo React real de "antes" (violando o princípio) e "depois" (refatorado),
   e os limites de aplicar a regra ao pé da letra. É o item de maior prioridade —
   já existe expectativa criada com quem leu o post introdutório.

2. **"De 8 horas para 10 minutos: como identifiquei o gargalo real de um processo
   crítico"** — case study da experiência na Dextra/CI&T (projeto de saúde nos EUA,
   time de 9 devs). Foco não é "otimizei código", é o processo de diagnóstico:
   como descobrir *onde* o tempo realmente está sendo gasto antes de otimizar.

3. **"Construindo uma component library acessível (WCAG) para e-commerce em
   escala"** — case study da Avenue Code. Decisões técnicas reais de acessibilidade
   (não uma lista genérica de "dicas de a11y"): como testar, o que o WCAG exige na
   prática em componentes interativos, o que quebra primeiro quando ninguém está
   olhando.

4. **"TDD na prática: o que craftsmanship significa no dia a dia"** — informado
   pelo trabalho atual na Codurance. Menos manifesto, mais mecânica: como um ciclo
   red-green-refactor muda o design de um componente React, com exemplo de código.

5. **"Claude Code, Cursor e Copilot no fluxo de um dev sênior: o que muda (e o que
   não muda)"** — versão específica e defensável do rascunho genérico sobre IA.
   Fala do seu uso real desses três (você lista os três em `about-technologies.tsx`),
   onde cada um ajuda, onde atrapalha, e o que continua sendo trabalho humano
   (arquitetura, revisão, julgamento).

6. **"Server Components e Server Actions: o que realmente mudou no jeito de pensar
   React"** — substitui o rascunho de changelog do Next.js 15 por algo atemporal:
   a mudança de mental model (não a lista de features de uma versão específica).

---

## 2. Serviços

Do FAQ de `/about`: você atende três frentes (sites institucionais/landing pages,
web apps mais complexas, consultoria técnica em arquitetura e performance), em
paralelo ao cargo full-time na Codurance. Esses posts têm intenção de busca mais
comercial — são os que mais ajudam alguém a decidir te contratar.

1. **"Site institucional, landing page ou web app? Como decidir o que seu projeto
   realmente precisa"** — mapeia diretamente as 3 frentes de serviço do FAQ (a5) em
   um guia de autodiagnóstico para o visitante. Bom conteúdo de topo de funil.

2. **"Como funciona um projeto de consultoria técnica comigo: da auditoria de
   arquitetura ao plano de ação"** — explica o processo (o que você entrega, prazos
   típicos, o que o cliente precisa preparar). Reduz fricção de quem está avaliando
   contratar consultoria mas não sabe como seria o formato.

3. **"Quanto custa (e quanto tempo leva) construir uma landing page profissional"**
   — conteúdo de definição de expectativa. É exatamente o tipo de pergunta que
   quem está pesquisando "contratar freelancer" faz no Google — forte para SEO/AEO
   (você já mapeou isso no `docs/AEO_GEO_AUDIT.md`).

4. **"Sinais de que sua aplicação web precisa de uma revisão de performance"** —
   checklist de diagnóstico (tempo de carregamento, Core Web Vitals, queixas de
   usuário) que termina naturalmente em "isso é o que eu faço numa consultoria de
   performance". Conteúdo educativo que vende sem parecer venda.

5. **"Freelance e tempo integral ao mesmo tempo: como estruturo minha
   disponibilidade para projetos paralelos"** — resposta expandida da FAQ a2.
   Transparência sobre como você concilia Codurance com projetos freelance gera
   confiança em quem está avaliando contratar (evita a pergunta não-feita "ele vai
   ter tempo pro meu projeto?").

6. **"Antes de contratar um freelancer de desenvolvimento: perguntas que eu mesmo
   responderia"** — formato FAQ estendido, no seu tom (você já faz isso bem em
   `about-faq.tsx`). Fortalece autoridade e é naturalmente linkável.

---

## 3. Carreira

Sua trajetória tem uma progressão pouco comum: certificação de processo (MPS.br)
no início, migração de stack completa (.NET → Angular → React), 160+ pessoas
treinadas, promoção a Tech Lead, e a escolha recente e deliberada de trocar um
cargo sênior estabelecido por uma consultoria em craftsmanship em Lisboa. Isso é
material de carreira genuíno, não meta-conselho genérico.

1. **"O que aprendi ensinando React e Angular para mais de 160 pessoas"** — a
   experiência de instrutor técnico na Venturus. Ângulo: ensinar expõe lacunas no
   seu próprio entendimento antes de qualquer code review conseguir.

2. **"De Software Engineer a Tech Lead: a mudança de mentalidade que ninguém te
   avisa"** — a transição na Dextra/CI&T liderando um time de 9 pessoas. O que
   muda no dia a dia que nenhum título de cargo descreve.

3. **"Craftsmanship como carreira: por que troquei uma posição sênior estabelecida
   por uma consultoria"** — a decisão de ir para a Codurance em 2025. Post de
   posicionamento pessoal forte — explica *por que* craftsmanship é o eixo atual
   da sua carreira, não só uma palavra no cargo.

4. **"Trabalhar remoto para empresas de Lisboa e dos EUA morando no Brasil: o que
   funciona de verdade"** — logística real de fuso horário (você está em UTC-3,
   FAQ a4), comunicação assíncrona, o que ninguém conta sobre remoto internacional
   além do "dá pra trabalhar de qualquer lugar".

5. **"De C# a React: o que 15 anos migrando de stack me ensinaram sobre aprender
   tecnologia rápido"** — a jornada .NET (2009) → Angular/C# (Venturus) → React
   (Avenue Code/Codurance). Ângulo: o que transfere entre stacks e o que precisa
   ser reaprendido do zero toda vez.

6. **"Certificação MPS.br no início de carreira: o que ela me ensinou sobre
   processo antes de eu saber o que era Agile"** — reflexão de início de carreira
   (Sedna, 2009-2015). Nicho, mas autêntico e diferenciado — pouca gente no
   ecossistema React fala de MPS.br.

---

## Priorização sugerida

1. **Curto prazo:** fechar a série SOLID (já tem expectativa criada) e escrever
   o post de "landing page vs web app vs consultoria" (serviço #1) — é o de menor
   esforço de pesquisa (você já tem o conteúdo pronto na FAQ) e maior potencial
   de conversão.
2. **Médio prazo:** os dois case studies técnicos (Dextra e Avenue Code) — exigem
   mais trabalho de reconstrução de contexto, mas são o conteúdo mais diferenciado
   que você tem (poucas pessoas conseguem escrever isso além de você).
3. **Contínuo:** intercalar 1 post de carreira a cada 2-3 posts técnicos, para
   manter as três categorias de tag (`react`/`arquitetura`, serviço, carreira)
   crescendo em paralelo no filtro de tags do `/blog`.
