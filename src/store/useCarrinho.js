import { create } from 'zustand';

export const useCarrinho = create((set) => ({
  itens: [],
  
  // Função para adicionar um produto ao carrinho
  adicionarProduto: (produto) => set((state) => {
    const produtoExiste = state.itens.find(item => item.id === produto.id);
    
    if (produtoExiste) {
      // Se o produto já está no carrinho, só aumenta a quantidade
      return {
        itens: state.itens.map(item => 
          item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
        )
      };
    }
    
    // Se é um produto novo, adiciona com quantidade 1
    return { itens: [...state.itens, { ...produto, quantidade: 1 }] };
  }),

  // Função para remover um produto completamente
  removerProduto: (produtoId) => set((state) => ({
    itens: state.itens.filter(item => item.id !== produtoId)
  })),

  // Função para atualizar a quantidade diretamente (+ ou -)
  atualizarQuantidade: (produtoId, quantidade) => set((state) => ({
    itens: state.itens.map(item => 
      item.id === produtoId ? { ...item, quantidade: Math.max(1, quantidade) } : item
    )
  })),

  // Limpar todo o carrinho (útil para simular finalização de compra)
  limparCarrinho: () => set({ itens: [] }),
}));