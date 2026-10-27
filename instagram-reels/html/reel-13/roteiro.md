# reel-13 — Tour pelo imóvel: você compraria esta casa?

> Pauta pf323fa · Educação para o cliente · Criatividade: Ousado

**Conceito:** um corretor fictício (SVG: terno, gravata vermelha, piscadinha, dente de ouro) apresenta um site como
se fosse um imóvel. Cada "vantagem" que ele vende é um problema do site; o narrador traduz, seco. O cliente vai pro
vizinho. Virada para a identidade da marca: a casa que eu construo, com a chave no nome do cliente.

**Vozes:** ElevenLabs `eleven_v3`, duas vozes (`voices` em `voz/falas.json`): corretor Harry (ansioso, acelerado,
stability 0 em `role_settings`) e narrador Brian (seco, grave). O build encurta pausas longas e acelera o corretor
em 12% e o narrador em 5%, e junta as duas falas em `voz/cena-NN.mp3`. Em cada cena a fala do corretor entra com o balão e a do narrador com o carimbo.
Gerar de novo: `node scripts/generate-voice.mjs reel-13`; remontar: `node scripts/build-reel-13.mjs`.
Sem legenda queimada: o balão e o carimbo já acompanham a fala.

## Narração

| Cena | Corretor (balão) | Narrador (carimbo) |
|---|---|---|
| 1 | Oportunidade única! Casa à venda... quer dizer, site à venda! | |
| 2 | Endereço fácil de lembrar! | Ninguém decora esse endereço. |
| 3 | A porta? Fica ali atrás... é só procurar! | O botão do WhatsApp, escondido. |
| 4 | Fechadura? Quem precisa? | Sem cadeado, o navegador avisa: não seguro. |
| 5 | Ela abre... uma hora, abre. | Site lento. E o cliente não espera. |
| 6 | Decoração clássica! | Promoção de Natal... de 2019. |
| 7 | E é bem discreta. Nem o Google acha. | Se ninguém te encontra, ninguém te contrata. |
| 8 | Ué... cadê o cliente? | Foi pro vizinho. |
| 9 | | Agora... a casa que eu construo. |
| 10 | | Endereço claro. Porta na frente. Cadeado. Abre na hora. Aparece no mapa. E funciona no celular. |
| 11 | | E a chave fica no seu nome. Seu site, sua casa. Bora construir? Me chama no direct. |

Publicar com o selo "Informações de IA" (voz gerada por IA).
