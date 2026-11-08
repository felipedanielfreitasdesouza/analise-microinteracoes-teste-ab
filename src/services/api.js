// O mesmo catálogo é carregado pelos protótipos A e B.
// Manter o limite explícito ajuda a documentar e reproduzir o cenário do teste.
const LIMITE_CATALOGO = 60;

// Dicionário de tradução de categorias
const traducaoCategorias = {
  'beauty': 'Beleza',
  'fragrances': 'Perfumes',
  'furniture': 'Móveis',
  'groceries': 'Mercearia',
  'home-decoration': 'Decoração',
  'kitchen-accessories': 'Acessórios de cozinha',
  'laptops': 'Notebooks',
  'mens-shirts': 'Camisas masculinas',
  'mens-shoes': 'Calçados masculinos',
  'mens-watches': 'Relógios masculinos',
  'mobile-accessories': 'Acessórios para celular',
  'motorcycle': 'Motocicletas',
  'skin-care': 'Cuidados com a pele',
  'smartphones': 'Smartphones',
  'sports-accessories': 'Acessórios esportivos',
  'sunglasses': 'Óculos de sol',
  'tablets': 'Tablets',
  'tops': 'Blusas',
  'vehicle': 'Veículos',
  'womens-bags': 'Bolsas femininas',
  'womens-dresses': 'Vestidos femininos',
  'womens-jewellery': 'Joias femininas',
  'womens-shoes': 'Calçados femininos',
  'womens-watches': 'Relógios femininos'
};

// Dicionário de tradução dos 60 produtos exibidos no protótipo.
// Os IDs, imagens, preços e demais dados técnicos continuam vindo da API.
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
  },
  21: {
    title: 'Pepino',
    description: 'Pepinos crocantes e hidratantes, ideais para saladas, lanches ou como acompanhamento refrescante.'
  },
  22: {
    title: 'Ração para Cães',
    description: 'Ração especialmente formulada para fornecer nutrientes essenciais ao seu companheiro canino.'
  },
  23: {
    title: 'Ovos',
    description: 'Ovos frescos, ingrediente versátil para assar, cozinhar ou preparar o café da manhã.'
  },
  24: {
    title: 'Filé de Peixe',
    description: 'Filé de peixe de qualidade, adequado para grelhar, assar ou preparar na frigideira.'
  },
  25: {
    title: 'Pimentão Verde',
    description: 'Pimentão verde fresco e vibrante, perfeito para acrescentar cor e sabor aos pratos.'
  },
  26: {
    title: 'Pimenta Verde',
    description: 'Pimenta verde picante, ideal para adicionar intensidade às suas receitas favoritas.'
  },
  27: {
    title: 'Pote de Mel',
    description: 'Mel puro e natural em um pote prático, perfeito para adoçar bebidas ou finalizar alimentos.'
  },
  28: {
    title: 'Sorvete',
    description: 'Sorvete cremoso e delicioso, disponível em vários sabores para um momento especial.'
  },
  29: {
    title: 'Suco de Frutas',
    description: 'Suco de frutas refrescante, rico em vitaminas e ótimo para manter a hidratação.'
  },
  30: {
    title: 'Kiwi',
    description: 'Kiwi nutritivo, perfeito para lanches ou para dar um toque tropical aos seus pratos.'
  },
  31: {
    title: 'Limão',
    description: 'Limões cítricos e aromáticos, versáteis para cozinhar, assar ou preparar bebidas refrescantes.'
  },
  32: {
    title: 'Leite',
    description: 'Leite fresco e nutritivo, essencial para diversas receitas e para o consumo diário.'
  },
  33: {
    title: 'Amora',
    description: 'Amoras doces e suculentas, perfeitas para lanches, sobremesas e cereais.'
  },
  34: {
    title: 'Café Nescafé',
    description: 'Café de qualidade da Nescafé, disponível em diferentes blends para uma bebida encorpada e saborosa.'
  },
  35: {
    title: 'Batatas',
    description: 'Batatas versáteis e nutritivas, ótimas assadas, amassadas ou como acompanhamento.'
  },
  36: {
    title: 'Whey Protein',
    description: 'Proteína em pó rica em nutrientes, ideal para complementar a alimentação com proteínas essenciais.'
  },
  37: {
    title: 'Cebolas Roxas',
    description: 'Cebolas roxas aromáticas e saborosas, perfeitas para dar mais profundidade aos pratos salgados.'
  },
  38: {
    title: 'Arroz',
    description: 'Arroz de alta qualidade, base versátil para diferentes culinárias e receitas.'
  },
  39: {
    title: 'Refrigerantes',
    description: 'Refrigerantes de vários sabores, perfeitos para bebidas refrescantes.'
  },
  40: {
    title: 'Morangos',
    description: 'Morangos doces e suculentos, ótimos para lanches, sobremesas ou vitaminas.'
  },
  41: {
    title: 'Caixa de Lenços de Papel',
    description: 'Caixa prática de lenços de papel para o uso diário, com lenços macios e absorventes.'
  },
  42: {
    title: 'Água',
    description: 'Água engarrafada pura e refrescante, essencial para manter a hidratação ao longo do dia.'
  },
  43: {
    title: 'Balanço Decorativo',
    description: 'O balanço decorativo é um complemento charmoso para a decoração da casa. Com detalhes trabalhados, acrescenta elegância e leveza ao ambiente.'
  },
  44: {
    title: 'Porta-retrato Árvore Genealógica',
    description: 'O porta-retrato de árvore genealógica é uma forma afetiva e elegante de exibir memórias da família. Com vários espaços para fotos, conta a história de quem você ama.'
  },
  45: {
    title: 'Planta Decorativa',
    description: 'A planta decorativa artificial traz um toque de natureza para a casa sem exigir manutenção. Ela acrescenta verde e estilo ao ambiente.'
  },
  46: {
    title: 'Vaso para Plantas',
    description: 'O vaso para plantas é um recipiente elegante para suas plantas favoritas. Seu design moderno combina com jardins internos ou externos.'
  },
  47: {
    title: 'Luminária de Mesa',
    description: 'A luminária de mesa é uma solução funcional e decorativa para iluminar seu espaço. Com design moderno, oferece iluminação ambiente e direcionada.'
  },
  48: {
    title: 'Espátula de Bambu',
    description: 'A espátula de bambu é um utensílio versátil e sustentável, ideal para virar, mexer e servir diferentes preparos.'
  },
  49: {
    title: 'Copo de Alumínio Preto',
    description: 'O copo de alumínio preto é elegante e resistente, adequado para bebidas quentes ou frias. Seu acabamento moderno complementa a coleção de utensílios.'
  },
  50: {
    title: 'Batedor Preto',
    description: 'O batedor preto é essencial para misturar e bater ingredientes. Seu cabo ergonômico e design elegante tornam o utensílio prático.'
  },
  51: {
    title: 'Liquidificador Compacto',
    description: 'O liquidificador compacto é potente e ideal para vitaminas, shakes e outros preparos. Seu design prático e suas funções variadas tornam o aparelho versátil.'
  },
  52: {
    title: 'Wok de Aço Carbono',
    description: 'O wok de aço carbono é uma panela versátil para saltear, refogar e fritar por imersão. Sua estrutura resistente distribui o calor de maneira uniforme.'
  },
  53: {
    title: 'Tábua de Corte',
    description: 'A tábua de corte é um acessório essencial para preparar alimentos. Feita com material resistente, oferece uma superfície segura e higiênica para cortar.'
  },
  54: {
    title: 'Espremedor de Cítricos Amarelo',
    description: 'O espremedor de cítricos amarelo facilita a extração de suco de frutas cítricas. Sua cor vibrante acrescenta alegria aos utensílios da cozinha.'
  },
  55: {
    title: 'Fatiador de Ovos',
    description: 'O fatiador de ovos permite cortar ovos cozidos de maneira uniforme. É ideal para saladas, sanduíches e outros pratos.'
  },
  56: {
    title: 'Fogão Elétrico',
    description: 'O fogão elétrico oferece uma solução portátil e eficiente para cozinhar. É ideal para cozinhas pequenas ou como superfície adicional de preparo.'
  },
  57: {
    title: 'Peneira de Malha Fina',
    description: 'A peneira de malha fina é versátil para coar líquidos e peneirar ingredientes secos. Sua malha filtra com eficiência para facilitar o preparo.'
  },
  58: {
    title: 'Garfo',
    description: 'O garfo é um utensílio clássico para refeições e para servir alimentos. Seu design resistente e ergonômico é confiável para o uso diário.'
  },
  59: {
    title: 'Copo de Vidro',
    description: 'O copo de vidro é elegante e versátil, adequado para diferentes bebidas. Seu design transparente permite apreciar as cores e texturas da bebida.'
  },
  60: {
    title: 'Ralador Preto',
    description: 'O ralador preto é um utensílio prático para ralar queijo, legumes e outros alimentos. Seu design elegante e lâminas afiadas agilizam o preparo.'
  }
};

// Função assíncrona que busca os produtos da DummyJSON API e traduz em tempo real.
// O mesmo resultado é consumido por A e B, mantendo a comparação controlada.
export async function buscarProdutos() {
  const resposta = await fetch(`https://dummyjson.com/products?limit=${LIMITE_CATALOGO}`);
  
  if (!resposta.ok) {
    throw new Error('Erro ao carregar os produtos do servidor.');
  }
  
  const dados = await resposta.json();
  
  // Mapeia e traduz o título, descrição e categoria de cada produto retornado
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
