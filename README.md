```markdown
# 📊 Protótipo de Teste A/B — Impacto das Microinterações na UX (TCC)

Este repositório contém a implementação prática de um ambiente de testes controlado para o Trabalho de Conclusão de Curso (TCC) desenvolvido por mim e pelo Lucas. O objetivo central da pesquisa é analisar, monitorar e mensurar o impacto cognitivo, psicológico e comportamental das **microinterações** na experiência do usuário (UX) em ecossistemas de E-commerce.

---

## 🚀 O Cenário de Teste
Para garantir dados comportamentais profundos e relatórios analíticos de alta fidelidade, construímos uma plataforma de E-commerce completa dividida em dois ambientes independentes (Teste A/B):

*   **Protótipo A (Grupo Controle - Rota `/a`):** Uma interface intencionalmente rígida. A busca, os filtros, o carrinho lateral (Drawer), a autenticação e o modal de detalhes funcionam de forma instantânea, porém seca e assíncrona tradicional. Apresenta cantos retos (sem arredondamento), ausência completa de sombras, sem animações de transição e feedbacks visuais corporativos estéreis, simulando sistemas legados ou sem otimização de UX.
*   **Protótipo B (Grupo Experimental - Rota `/b`):** A mesma interface sob a perspectiva do *Motion Design* e do Design Emocional. Enriquecida com microinterações dinâmicas baseadas em física elástica, feedbacks visuais instantâneos de sucesso no estado dos botões, skeleton loaders fluidos durante o carregamento de rede, mensagens de erro suavizadas, um interruptor global de conforto visual (**Light/Dark Mode**) com transições de cor calculadas e animações coreografadas para guiar a atenção do usuário.

---

## 🛠️ Stack Tecnológica & Arquitetura Avançada
O projeto foi estruturado seguindo os padrões rigorosos de componentização e separação de conceitos da indústria:

*   **Frontend & Build:** React.js + Vite (ambiente ágil, modular e de altíssima performance)
*   **Estilização:** Tailwind CSS v4 (estilização utilitária moderna com suporte nativo a variáveis CSS e otimizações em tempo de compilação)
*   **Gerenciamento de Estado Global:** Zustand (controle reativo, minimalista e centralizado do Carrinho de Compras e do Fluxo de Autenticação)
*   **Consumo de Dados & Cache:** TanStack Query / React Query (gerenciamento assíncrono avançado de requisições de rede, tratamento de estados de erro/carregamento e cache inteligente)
*   **Física de Animações:** Framer Motion (criação de microinterações com transições fluidas, estados elásticos e animações complexas de layout)
*   **Métricas e Analytics:** Umami API (rastreamento de eventos quantitativos) e Hotjar (análise qualitativa de mapas de calor e gravações de sessão)
*   **Fonte de Dados:** DummyJSON API (integração com REST API real para simular latência de rede e consumo de catálogo complexo)

---

## 📁 Estrutura do Projeto
```text
src/
├── components/   # Componentes modulares isolados (CardProdutoA, CardProdutoB, LoginA, LoginB, etc.)
├── data/         # Arquivos de configurações estáticas
├── pages/        # Telas principais que orquestram os ambientes A e B
├── services/     # Camada de comunicação assíncrona com a API (fetch/axios)
├── store/        # Estados globais controlados pelo Zustand (useCarrinho, useAuth)
└── App.jsx       # Roteamento e provedores globais (QueryClientProvider)

```

---

## ⚙️ Pré-requisitos do Ambiente

Antes de iniciar a instalação do projeto, o seu computador precisa ter duas ferramentas fundamentais configuradas para desenvolvimento web moderno:

**1. Node.js (Ambiente de Execução)**
O Node.js é o motor que permite rodar JavaScript diretamente no seu sistema operacional e gerenciar os pacotes de código externos.

* **Como instalar:** Acesse o site oficial do [Node.js](https://nodejs.org/) e baixe a versão **LTS** (Long Term Support - recomendada para estabilidade). Siga o instalador padrão para o seu sistema (Windows, macOS ou Linux).
* **Verificação:** Abra o seu terminal (Prompt de Comando, PowerShell ou Terminal do VS Code) e digite o comando abaixo para garantir que a instalação ocorreu com sucesso:
```bash
node -v

```


*(Deve retornar uma versão igual ou superior à v18).*

**2. React.js e Vite (Compreensão do ecossistema)**
Você **não precisa** baixar o React de forma isolada na sua máquina. O React funciona como uma biblioteca de código que é puxada automaticamente pelo gerenciador de pacotes do Node (`npm`) para dentro da pasta do projeto durante a fase de instalação. O ambiente utiliza o **Vite** como ferramenta de *build* ultraveloz para compilar e atualizar a interface no navegador em tempo real enquanto o código é editado.

---

## 📥 Como Baixar e Rodar o Projeto (Passo a Passo)

Siga os comandos sequenciais abaixo no seu terminal para clonar o repositório, baixar as dependências exatas mapeadas e rodar os servidores locais de teste.

**1. Clonar o Repositório Git**
Transfira uma cópia completa de todo o histórico de desenvolvimento e código fonte diretamente do GitHub para a sua máquina local:

```bash
git clone [https://github.com/felipedanielfreitasdesouza/analise-microinteracoes-teste-ab.git](https://github.com/felipedanielfreitasdesouza/analise-microinteracoes-teste-ab.git)

```

**2. Acessar a Pasta Raiz do Projeto**
Navegue pelo terminal para dentro do diretório recém-criado pela clonagem:

```bash
cd analise-microinteracoes-teste-ab

```

**3. Instalar Todas as Dependências Necessárias**
Este comando lê o arquivo `package.json` do projeto e baixa de uma única vez todas as bibliotecas fundamentais que estruturam nossa aplicação (incluindo o React, Tailwind CSS v4, Framer Motion, Zustand, React Query e Lucide Icons):

```bash
npm install

```

**4. Inicializar o Servidor de Desenvolvimento Local**
Com o ecossistema pronto, ligue o compilador dinâmico do Vite para gerar o endereço local da aplicação:

```bash
npm run dev

```

Após a inicialização, o terminal exibirá uma URL semelhante a esta: `http://localhost:5173/`. Copie o endereço, cole no seu navegador web de preferência e os protótipos estarão prontos para a interação.

---

## 📝 Guia de Utilização e Credenciais de Teste

Para que o usuário ou a banca examinadora consiga vivenciar os fluxos idênticos de conversão e atrito projetados para a coleta de dados, a plataforma intercepta o usuário solicitando credenciais de acesso locais:

* **E-mail de Acesso Padrão:** `tcc@teste.com`
* **Senha de Acesso Padrão:** `123456`

### Rotas de Avaliação

* **Ambiente A (Controle Rígido):** Acesse a rota `http://localhost:5173/a` para interagir com o sistema sem respostas fluidas de animação.
* **Ambiente B (Experimental Dinâmico):** Acesse a rota `http://localhost:5173/b` para testar os estados complexos de microinterações e o alternador de temas visuais no cabeçalho superior.

```

```