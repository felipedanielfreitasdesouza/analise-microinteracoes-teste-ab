# 📊 Protótipo de Teste A/B — Impacto das Microinterações na UX (TCC)

Este repositório contém a implementação prática de um ambiente de testes controlado para o Trabalho de Conclusão de Curso (TCC) desenvolvido por mim e pelo Lucas. O objetivo central da pesquisa é analisar, monitorar e mensurar o impacto cognitivo, psicológico e comportamental das **microinterações** na experiência do usuário (UX) em ecossistemas de E-commerce.

---

## 🚀 O Cenário de Teste
Para garantir dados comportamentais profundos e relatórios analíticos de alta fidelidade, construímos uma plataforma de E-commerce completa dividida em dois ambientes independentes (Teste A/B):

*   **Protótipo A (Grupo Controle - Rota `/a`):** Uma interface intencionalmente rígida. A busca, os filtros, o carrinho lateral (Drawer) e o modal de detalhes funcionam instantaneamente, porém de forma "seca" e assíncrona tradicional, simulando sistemas antigos ou sem otimização de UX.
*   **Protótipo B (Grupo Experimental - Rota `/b`):** A mesma interface sob a perspectiva do *Motion Design*. Enriquecida com microinterações dinâmicas baseadas em física elástica, feedbacks visuais instantâneos de sucesso no estado dos botões, skeleton loaders fluidos durante o carregamento de rede e animações coreografadas para guiar a atenção do usuário.

---

## 🛠️ Stack Tecnológica & Arquitetura Avançada
O projeto foi estruturado seguindo os padrões rigorosos de componentização e separação de conceitos da indústria:

*   **Frontend & Build:** React.js + Vite (ambiente ágil e modular)
*   **Estilização:** Tailwind CSS v4 (estilização baseada em utilitários de alta performance)
*   **Gerenciamento de Estado Global:** Zustand (controle reativo e centralizado do Carrinho de Compras)
*   **Consumo de Dados & Cache:** TanStack Query / React Query (gerenciamento assíncrono de requisições de rede, tratamento de estados de erro/carregamento e cache inteligente)
*   **Física de Animações:** Framer Motion (criação de microinterações com transições fluidas, estados elásticos e animações de layout)
*   **Métricas e Analytics:** Umami API (rastreamento de eventos quantitativos) e Hotjar (análise qualitativa de mapas de calor e gravações de sessão)
*   **Fonte de Dados:** DummyJSON API (integração com REST API real para simular latência de rede e consumo de catálogo complexo)

---

## 📁 Estrutura do Projeto
```text
src/
├── components/   # Componentes modulares isolados (CardProdutoA, CardProdutoB, etc.)
├── data/         # Arquivos de configurações estáticas
├── pages/        # Telas principais que orquestram os ambientes A e B
├── services/     # Camada de comunicação assíncrona com a API (fetch/axios)
├── store/        # Estados globais controlados pelo Zustand (useCarrinho)
└── App.jsx       # Roteamento e provedores globais (QueryClientProvider)