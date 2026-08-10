// Dicionário de tradução de categorias
const traducaoCategorias = {
  'beauty': 'Beleza',
  'fragrances': 'Perfumes',
  'furniture': 'Móveis',
  'groceries': 'Mercearia'
};

// Dicionário de tradução dos 20 produtos da DummyJSON API
const traducaoProdutos = {
  1: {
    title: 'Máscara de Cílios Lash Princess',
    description: 'A máscara Essence Lash Princess é popular por volumizar e alongar os cílios com efeito marcante.'
  },
  2: {
    title: 'Paleta de Sombras com Espelho',
    description: 'Oferece uma gama versátil de tons de alta pigmentação para criar maquiagens incríveis.'
  },
  3: {
    title: 'Pó Compacto Facial',
    description: 'Pó facial de textura fina projetado para selar a maquiagem e controlar a oleosidade da pele.'
  },
  4: {
    title: 'Batom Vermelho Cremoso',
    description: 'Batom vermelho de alta cobertura com acabamento cremoso e hidratação duradoura.'
  },
  5: {
    title: 'Esmalte Vermelho Intenso',
    description: 'Esmalte de secagem rápida com brilho verniz e cor vibrante para as unhas.'
  },
  6: {
    title: 'Perfume Calvin Klein CK One',
    description: 'Fragrância unissex cítrica e refrescante, perfeita para o uso diário.'
  },
  7: {
    title: 'Perfume Chanel Coco Noir EDP',
    description: 'Fragrância feminina elegante e magnética com notas florais e amadeiradas.'
  },
  8: {
    title: 'Perfume Dior J\'adore',
    description: 'Ícone da perfumaria feminina com um buquê floral sofisticado de jasmim e rosa.'
  },
  9: {
    title: 'Perfume Dolce Shine EDP',
    description: 'Fragrância solar e alegre com notas de manga suculenta e jasmim radiante.'
  },
  10: {
    title: 'Perfume Gucci Bloom EDP',
    description: 'Fragrância floral autêntica enriquecida com notas de tuberosa e jasmim.'
  },
  11: {
    title: 'Cama Casal Annibale Colombo',
    description: 'Cama de luxo artesanal em madeira nobre com acabamento clássico e refinado.'
  },
  12: {
    title: 'Sofá de Couro Annibale Colombo',
    description: 'Sofá sofisticado em couro legítimo com estrutura reforçada e máximo conforto.'
  },
  13: {
    title: 'Mesa de Cabeceira Clássica',
    description: 'Mesa de cabeceira em madeira com gaveta espaçosa para organização ao lado da cama.'
  },
  14: {
    title: 'Cadeira Executiva Knoll Saarinen',
    description: 'Cadeira de conferência ergonômica com design assinado e estofado de alta densidade.'
  },
  15: {
    title: 'Gabinete de Banheiro em Madeira',
    description: 'Armário elegante para banheiro com cuba integrada e compartimentos práticos.'
  },
  16: {
    title: 'Maçãs Red Delicious (Kg)',
    description: 'Maçãs frescas, crocantes e doces, selecionadas especialmente para sua saúde.'
  },
  17: {
    title: 'Bife de Ancho Bovino (Kg)',
    description: 'Corte nobre de carne bovina macia e suculenta, ideal para grelhar ou churrasco.'
  },
  18: {
    title: 'Ração Premium para Gatos',
    description: 'Alimento completo e balanceado rico em proteínas e nutrientes essenciais.'
  },
  19: {
    title: 'Filé de Frango Fresco (Kg)',
    description: 'Cortes selecionados de peito de frango sem osso, frescos e prontos para o preparo.'
  },
  20: {
    title: 'Óleo de Cozinha Vegetal',
    description: 'Óleo vegetal puro para cozinhar e fritar, ideal para todas as suas receitas.'
  }
};

// Função assíncrona que busca os produtos da DummyJSON API e traduz em tempo real
export async function buscarProdutos() {
  const resposta = await fetch('https://dummyjson.com/products?limit=20');
  
  if (!resposta.ok) {
    throw new Error('Erro ao carregar os produtos do servidor.');
  }
  
  const dados = await resposta.json();
  
  // Mapeia e traduz o título, descrição e categoria de cada um dos 20 produtos
  const produtosTraduzidos = dados.products.map((produto) => {
    const traduzido = traducaoProdutos[produto.id];

    return {
      ...produto,
      category: traducaoCategorias[produto.category] || produto.category,
      title: traduzido?.title || produto.title,
      description: traduzido?.description || produto.description,
    };
  });

  return produtosTraduzidos;
}