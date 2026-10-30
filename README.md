# Protótipos A/B — Microinterações visuais e usabilidade web

Este repositório contém os protótipos funcionais desenvolvidos para o Trabalho de Conclusão de Curso de Felipe Daniel Freitas de Souza e Lucas. O estudo compara duas interfaces de catálogo equivalentes para investigar a relação entre microinterações visuais e usabilidade.

O experimento considera os seguintes indicadores: tempo de execução, conclusão de tarefas, erros, abandono e usabilidade percebida pela escala System Usability Scale (SUS). O Umami é usado para os dados quantitativos; o Microsoft Clarity é uma fonte complementar para gravações e outros registros comportamentais. O estudo não mede diretamente carga cognitiva, aspectos psicológicos ou engajamento.

## Cenário de teste

Os dois protótipos possuem o mesmo conteúdo, telas, funcionalidades, organização visual e tarefas. A diferença planejada está nos recursos de microinteração visual investigados.

- **Protótipo A — controle, rota \`/a\`:** apresenta as respostas funcionais básicas do sistema, sem os recursos de microinteração definidos para a investigação.
- **Protótipo B — experimental, rota \`/b\`:** apresenta os mesmos fluxos do Protótipo A com os recursos de microinteração investigados, como transições de estado, estados ativos, confirmação visual de ações e animações de carregamento.

A comparação deve ser feita na ordem definida para cada participante: A → B ou B → A. A alternância reduz, mas não elimina, possíveis efeitos de aprendizagem.

## Stack tecnológica

- **Frontend e build:** React.js e Vite
- **Estilização:** Tailwind CSS v4
- **Estado:** Zustand
- **Dados assíncronos e cache:** TanStack Query
- **Animações:** Framer Motion
- **Ícones:** Lucide React
- **Catálogo:** DummyJSON API
- **Analytics quantitativo:** Umami
- **Registros comportamentais:** Microsoft Clarity

## Estrutura do projeto

\`\`\`text
src/
├── assets/       # Imagens e arquivos estáticos
├── components/   # Componentes reutilizáveis das interfaces
├── pages/        # Protótipos A e B
├── services/     # Integração com a API e analytics
├── store/        # Estados globais de autenticação, carrinho e acessibilidade
├── App.jsx       # Rotas e provedores globais
├── main.jsx      # Inicialização da aplicação
└── index.css     # Estilos globais e Tailwind
\`\`\`

## Pré-requisitos

É necessário ter o [Node.js](https://nodejs.org/) na versão LTS instalado. O React, o Vite e as demais dependências são instalados pelo \`npm\` a partir do \`package.json\`.

## Instalação e execução local

\`\`\`bash
git clone https://github.com/felipedanielfreitasdesouza/analise-microinteracoes-teste-ab.git
cd analise-microinteracoes-teste-ab
npm install
npm run dev
\`\`\`

O Vite exibirá uma URL semelhante a \`http://localhost:5173/\`.

Rotas locais:

- \`http://localhost:5173/a\` — Protótipo A
- \`http://localhost:5173/b\` — Protótipo B

Credenciais de teste locais:

- **E-mail:** \`tcc@teste.com\`
- **Senha:** \`123456\`

## Links publicados

O deploy de produção é publicado pela Vercel a partir da branch \`main\`:

- [Protótipo A](https://analise-microinteracoes-teste-ab.vercel.app/a)
- [Protótipo B](https://analise-microinteracoes-teste-ab.vercel.app/b)

## Identificação dos participantes e sessões

Os links de coleta devem ser preparados pelo pesquisador. O participante não precisa informar nem conhecer seu código.

Para o participante P01, por exemplo, use o mesmo identificador de sessão nas duas interfaces:

\`\`\`text
https://analise-microinteracoes-teste-ab.vercel.app/a?participant=P01&session=P01-S01
https://analise-microinteracoes-teste-ab.vercel.app/b?participant=P01&session=P01-S01
\`\`\`

Na coleta do TCC, serão utilizados os participantes \`P01\` a \`P06\`. A implementação aceita identificadores de \`P01\` a \`P08\` para permitir testes adicionais. O parâmetro \`session\` deve ser igual para A e B do mesmo participante e diferente entre participantes ou sessões.

Os dados não devem ser apagados entre participantes. A separação é feita pelos campos \`participant_id\`, \`session_id\`, \`prototype\`, tarefa e período de coleta.

## Eventos registrados

O Umami recebe eventos de navegação e interação, incluindo:

- \`prototype_view\`
- \`login_submitted\`, \`login_succeeded\` e \`login_failed\`
- \`category_filter_applied\`
- \`product_details_opened\`
- \`product_added_to_cart\`
- \`cart_opened\`
- \`checkout_attempted\` e \`checkout_completed\`
- \`logout\`
- \`task_started\`, \`task_completed\`, \`task_error\` e \`task_abandoned\`

Os eventos de tarefa carregam, quando disponíveis, o protótipo, o participante, a sessão, a tarefa, os horários e a duração. Isso permite comparar A e B sem misturar os registros.

## Configuração do Umami e do Microsoft Clarity

1. Copie \`.env.example\` para \`.env\`.
2. No Umami, copie o \`Website ID\` do website do experimento e confirme a URL do script.
3. No Microsoft Clarity, copie o \`Project ID\` em \`Settings > Setup\`.
4. Preencha o arquivo \`.env\`:

\`\`\`env
VITE_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
VITE_UMAMI_WEBSITE_ID=seu-website-id
VITE_CLARITY_PROJECT_ID=seu-clarity-project-id
\`\`\`

5. Reinicie o Vite depois de alterar o \`.env\`:

\`\`\`bash
npm run dev
\`\`\`

Esses identificadores são públicos e servem para carregar as ferramentas no frontend; não são chaves secretas. Nunca coloque senhas, tokens privados ou dados pessoais em variáveis \`VITE_*\`.

O código envia a variante (\`A\` ou \`B\`) e os identificadores anônimos de participante e sessão ao Umami. No Clarity, esses valores são registrados como tags. As credenciais digitadas no login não são enviadas, e os campos de autenticação usam \`data-clarity-mask\`.

O Clarity depende de processamento e amostragem da plataforma. Por isso, suas gravações são usadas para contextualizar comportamentos, hesitações e dificuldades, e não como fonte principal para calcular tempo, erros ou conclusão de tarefas.

Referências oficiais: [eventos no Umami](https://docs.umami.is/docs/track-events), [Umami em aplicações React/Vite](https://docs.umami.is/docs/guides/track-single-page-apps), [instalação do Microsoft Clarity](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup), [tags personalizadas do Clarity](https://learn.microsoft.com/en-us/clarity/filters/custom-tags) e [mascaramento de dados](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking).
