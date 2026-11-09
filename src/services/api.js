// O mesmo catálogo é carregado pelos protótipos A e B.
// Manter o limite explícito ajuda a documentar e reproduzir o cenário do teste.
const LIMITE_CATALOGO = 194;

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

// Dicionário de tradução dos 194 produtos exibidos no protótipo.
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
  },
  61: {
    title: 'Mixer de Mão',
    description: 'O mixer de mão é um eletrodoméstico versátil para bater, triturar e misturar. Seu design compacto e motor potente facilitam diferentes receitas.'
  },
  62: {
    title: 'Forma para Gelo',
    description: 'A forma para gelo é um acessório prático para produzir cubos em diferentes formatos. É perfeita para manter bebidas geladas e acrescentar um toque divertido.'
  },
  63: {
    title: 'Peneira de Cozinha',
    description: 'A peneira de cozinha é versátil para peneirar e coar ingredientes secos ou líquidos. Sua malha fina contribui para resultados mais uniformes.'
  },
  64: {
    title: 'Faca',
    description: 'A faca é um utensílio essencial para cortar, fatiar e picar. Sua lâmina afiada e cabo ergonômico oferecem segurança no preparo dos alimentos.'
  },
  65: {
    title: 'Marmita',
    description: 'A marmita é um recipiente prático e portátil para transportar refeições. Com divisórias para diferentes alimentos, é ideal para comer fora de casa.'
  },
  66: {
    title: 'Forno de Micro-ondas',
    description: 'O forno de micro-ondas é um eletrodoméstico versátil para cozinhar, aquecer e descongelar com rapidez. Seu tamanho compacto se adapta a diferentes cozinhas.'
  },
  67: {
    title: 'Suporte para Canecas',
    description: 'O suporte para canecas é uma solução elegante e compacta para organizar as canecas. Mantém as peças favoritas acessíveis e bem dispostas na cozinha.'
  },
  68: {
    title: 'Frigideira',
    description: 'A frigideira é um utensílio versátil e essencial para fritar, refogar e preparar diferentes pratos. O revestimento antiaderente facilita o preparo e a limpeza.'
  },
  69: {
    title: 'Prato',
    description: 'O prato é uma peça clássica e essencial para servir refeições. Seu design resistente e elegante é adequado para o uso diário ou ocasiões especiais.'
  },
  70: {
    title: 'Pegador Vermelho',
    description: 'O pegador vermelho é versátil para cozinhar e servir diferentes alimentos. Sua cor vibrante acrescenta destaque aos utensílios da cozinha.'
  },
  71: {
    title: 'Panela Prateada com Tampa de Vidro',
    description: 'A panela prateada com tampa de vidro é elegante e funcional para ferver, cozinhar em fogo baixo e preparar refeições. A tampa permite acompanhar o cozimento.'
  },
  72: {
    title: 'Espátula Vazada',
    description: 'A espátula vazada é um utensílio de cozinha projetado para virar alimentos. As aberturas permitem escorrer o excesso de líquido, ideal para frituras e refogados.'
  },
  73: {
    title: 'Organizador de Temperos',
    description: 'O organizador de temperos mantém condimentos acessíveis e bem arrumados. É uma solução prática e elegante para organizar itens essenciais da cozinha.'
  },
  74: {
    title: 'Colher',
    description: 'A colher é um utensílio versátil para mexer, servir e experimentar alimentos. Seu design ergonômico e construção resistente fazem dela um item essencial.'
  },
  75: {
    title: 'Bandeja',
    description: 'A bandeja é um item funcional e decorativo para servir lanches, aperitivos ou bebidas. Seu design elegante também é útil para receber convidados.'
  },
  76: {
    title: 'Rolo de Massa de Madeira',
    description: 'O rolo de massa de madeira é um utensílio clássico para abrir massas. Sua superfície lisa e cabos firmes ajudam a obter uma espessura uniforme.'
  },
  77: {
    title: 'Descascador Amarelo',
    description: 'O descascador amarelo facilita o preparo de frutas e legumes. Sua cor vibrante acrescenta um toque alegre aos utensílios da cozinha.'
  },
  78: {
    title: 'Apple MacBook Pro de 14 Polegadas Cinza-Espacial',
    description: 'O MacBook Pro de 14 polegadas cinza-espacial é um notebook potente e elegante, com chip M1 Pro da Apple, alto desempenho e tela Retina impressionante.'
  },
  79: {
    title: 'Notebook Asus Zenbook Pro com Duas Telas',
    description: 'O notebook Asus Zenbook Pro com duas telas é um dispositivo de alto desempenho que oferece produtividade e versatilidade para profissionais criativos.'
  },
  80: {
    title: 'Huawei MateBook X Pro',
    description: 'O Huawei MateBook X Pro é um notebook fino e elegante com tela sensível ao toque de alta resolução, oferecendo uma experiência premium para quem está em movimento.'
  },
  81: {
    title: 'Lenovo Yoga 920',
    description: 'O Lenovo Yoga 920 é um notebook conversível 2 em 1 com dobradiça flexível, permitindo usá-lo como notebook ou tablet com versatilidade e portabilidade.'
  },
  82: {
    title: 'Novo Notebook DELL XPS 13 9300',
    description: 'O novo notebook DELL XPS 13 9300 é compacto e potente, com tela InfinityEdge praticamente sem bordas e desempenho elevado para diversas tarefas.'
  },
  83: {
    title: 'Camisa Xadrez Azul e Preta',
    description: 'A camisa xadrez azul e preta é uma peça masculina confortável e estilosa, adequada para ocasiões casuais e semiformais.'
  },
  84: {
    title: 'Camiseta Masculina Gigabyte Aorus',
    description: 'A camiseta masculina Gigabyte Aorus é uma peça casual para fãs de jogos. Com o logotipo Aorus e design moderno, expressa o estilo gamer.'
  },
  85: {
    title: 'Camisa Masculina Xadrez',
    description: 'A camisa masculina xadrez é uma peça atemporal e versátil. Seu caimento confortável e estilo casual fazem dela um item essencial do guarda-roupa.'
  },
  86: {
    title: 'Camisa Masculina de Manga Curta',
    description: 'A camisa masculina de manga curta é uma opção leve e estilosa para dias quentes. O caimento confortável combina com um visual descontraído e arrumado.'
  },
  87: {
    title: 'Camisa Masculina Quadriculada',
    description: 'A camisa masculina quadriculada é clássica e versátil. Adequada para diferentes ocasiões, acrescenta um toque elegante e arrumado ao visual.'
  },
  88: {
    title: 'Nike Air Jordan 1 Vermelho e Preto',
    description: 'O Nike Air Jordan 1 vermelho e preto é um tênis icônico de basquete, conhecido pelo design marcante e pelo desempenho. É uma escolha popular entre atletas e colecionadores.'
  },
  89: {
    title: 'Chuteiras de Beisebol Nike',
    description: 'As chuteiras de beisebol Nike foram projetadas para oferecer tração e desempenho no campo. Proporcionam estabilidade e suporte durante jogos e treinos.'
  },
  90: {
    title: 'Tênis Puma Future Rider',
    description: 'O tênis Puma Future Rider combina estilo retrô e conforto moderno. É uma opção confortável e elegante para o uso cotidiano.'
  },
  91: {
    title: 'Tênis Esportivo Off-White e Vermelho',
    description: 'O tênis esportivo off-white e vermelho combina estilo e funcionalidade. A combinação de cores acrescenta um toque marcante e energético ao visual.'
  },
  92: {
    title: 'Tênis Esportivo Off-White e Vermelho Modelo 2',
    description: 'Outra versão do tênis esportivo off-white e vermelho, com design próprio. O modelo oferece estilo e conforto para ocasiões casuais.'
  },
  93: {
    title: 'Relógio com Pulseira de Couro Marrom',
    description: 'O relógio com pulseira de couro marrom tem design clássico e elegante. A pulseira de couro legítimo e o mostrador discreto acrescentam sofisticação ao visual.'
  },
  94: {
    title: 'Longines Master Collection',
    description: 'A Longines Master Collection é uma linha elegante e refinada, reconhecida pela precisão e pelo acabamento. Seu design atemporal representa luxo e sofisticação.'
  },
  95: {
    title: 'Rolex Cellini Date com Mostrador Preto',
    description: 'O Rolex Cellini Date com mostrador preto é um relógio clássico e prestigiado. O mostrador escuro e a indicação de data reforçam sua sofisticação.'
  },
  96: {
    title: 'Rolex Cellini Fases da Lua',
    description: 'O Rolex Cellini Fases da Lua é uma peça de alta relojoaria com indicação das fases da lua e design refinado. Reúne precisão e elegância.'
  },
  97: {
    title: 'Rolex Datejust',
    description: 'O Rolex Datejust é um relógio icônico e versátil com janela de data. Seu design atemporal e sua confiabilidade representam a excelência relojoeira da Rolex.'
  },
  98: {
    title: 'Relógio Rolex Submariner',
    description: 'O Rolex Submariner é um lendário relógio de mergulho, conhecido pela durabilidade e resistência à água. É um símbolo de aventura e exploração.'
  },
  99: {
    title: 'Amazon Echo Plus',
    description: 'O Amazon Echo Plus é uma caixa de som inteligente com controle de voz integrado pela Alexa. Oferece som de qualidade e funciona como central para dispositivos domésticos.'
  },
  100: {
    title: 'Apple AirPods',
    description: 'Os Apple AirPods oferecem uma experiência de áudio sem fio prática. Com pareamento simples, som de qualidade e integração com a Siri, são ideais para ouvir música em movimento.'
  },
  101: {
    title: 'Apple AirPods Max Prateado',
    description: 'Os Apple AirPods Max prateados são fones de ouvido premium com áudio de alta fidelidade, equalização adaptativa e cancelamento ativo de ruído.'
  },
  102: {
    title: 'Carregador Sem Fio Apple AirPower',
    description: 'O carregador sem fio Apple AirPower oferece uma forma prática de carregar dispositivos Apple compatíveis. Basta posicioná-los sobre a base de carregamento.'
  },
  103: {
    title: 'Apple HomePod Mini Cinza-Espacial',
    description: 'O Apple HomePod Mini cinza-espacial é uma caixa de som inteligente compacta que oferece áudio surpreendente e integração com o ecossistema Apple.'
  },
  104: {
    title: 'Carregador Apple para iPhone',
    description: 'O carregador Apple para iPhone foi desenvolvido para carregar o aparelho com rapidez e eficiência, mantendo-o pronto para o uso.'
  },
  105: {
    title: 'Bateria Externa Apple MagSafe',
    description: 'A bateria externa Apple MagSafe acrescenta autonomia ao iPhone compatível. Ela se conecta magneticamente para oferecer um encaixe seguro e prático.'
  },
  106: {
    title: 'Apple Watch Series 4 Dourado',
    description: 'O Apple Watch Series 4 dourado é um smartwatch elegante com monitoramento cardíaco, acompanhamento de atividades físicas e tela Retina.'
  },
  107: {
    title: 'Fones de Ouvido Sem Fio Beats Flex',
    description: 'Os fones de ouvido sem fio Beats Flex oferecem uma experiência confortável e versátil. Os fones magnéticos e a bateria de até 12 horas são ideais para o uso diário.'
  },
  108: {
    title: 'Capa de Silicone MagSafe Roxa para iPhone 12',
    description: 'A capa de silicone MagSafe roxa protege o iPhone 12 com estilo. A tecnologia MagSafe facilita a conexão de acessórios compatíveis.'
  },
  109: {
    title: 'Monopé',
    description: 'O monopé é um acessório versátil para fotografar com estabilidade e ajuste de altura. É ideal para selfies, fotos em grupo e vídeos.'
  },
  110: {
    title: 'Luz para Selfie com iPhone',
    description: 'A luz para selfie com iPhone é uma iluminação LED portátil e ajustável para melhorar selfies e chamadas de vídeo. Ela se prende ao aparelho para iluminar as fotos.'
  },
  111: {
    title: 'Bastão de Selfie com Monopé',
    description: 'O bastão de selfie com monopé é extensível e dobrável para capturar selfies e fotos em grupo. É compatível com smartphones e câmeras.'
  },
  112: {
    title: 'Pedestal para Câmera de Estúdio de TV',
    description: 'O pedestal para câmera de estúdio de TV é um sistema profissional de suporte para movimentos suaves e precisos em estúdios de transmissão e produção.'
  },
  113: {
    title: 'Motocicleta Genérica',
    description: 'A motocicleta genérica é versátil e confiável para diferentes estilos de condução. Seu design equilibrado oferece uma experiência confortável e eficiente.'
  },
  114: {
    title: 'Kawasaki Z800',
    description: 'A Kawasaki Z800 é uma motocicleta esportiva potente e ágil, conhecida pelo design marcante e pelo desempenho. Possui recursos avançados para quem gosta de motos.'
  },
  115: {
    title: 'MotoGP CI.H1',
    description: 'A MotoGP CI.H1 é uma motocicleta de alto desempenho inspirada na tecnologia das corridas de MotoGP. Oferece recursos avançados e engenharia precisa.'
  },
  116: {
    title: 'Scooter',
    description: 'A scooter é uma motocicleta prática e econômica, ideal para deslocamentos urbanos. Seu design aberto e controles simples facilitam a condução.'
  },
  117: {
    title: 'Motocicleta Esportiva',
    description: 'A motocicleta esportiva foi projetada para velocidade e agilidade, com perfil elegante e aerodinâmico. É indicada para uma condução dinâmica e emocionante.'
  },
  118: {
    title: 'Sabonete Líquido para Mãos Attitude Super Leaves',
    description: 'O sabonete líquido para mãos Attitude Super Leaves é natural e nutritivo, enriquecido com extratos vegetais. Limpa e hidrata as mãos, deixando uma sensação fresca e macia.'
  },
  119: {
    title: 'Sabonete Líquido Corporal Olay Ultra Moisture com Manteiga de Karité',
    description: 'O sabonete líquido corporal Olay Ultra Moisture hidrata e nutre a pele com o poder da manteiga de karité. A espuma cremosa deixa a pele macia e sedosa.'
  },
  120: {
    title: 'Loção Corporal e Facial Vaseline Men',
    description: 'A loção corporal e facial Vaseline Men foi formulada para oferecer hidratação prolongada à pele masculina. É absorvida rapidamente e ajuda a manter a pele saudável.'
  },
  121: {
    title: 'iPhone 5s',
    description: 'O iPhone 5s é um smartphone clássico, conhecido pelo design compacto e pelos recursos avançados de sua época. Mesmo antigo, oferece uma experiência confiável.'
  },
  122: {
    title: 'iPhone 6',
    description: 'O iPhone 6 é um smartphone elegante e capaz, com tela maior e desempenho aprimorado. O modelo trouxe novos recursos e elementos de design para sua época.'
  },
  123: {
    title: 'iPhone 13 Pro',
    description: 'O iPhone 13 Pro é um smartphone avançado com sistema de câmeras potente, chip de alto desempenho e tela impressionante para quem busca tecnologia de ponta.'
  },
  124: {
    title: 'iPhone X',
    description: 'O iPhone X é um smartphone premium com tela OLED sem bordas, reconhecimento facial Face ID e desempenho elevado. Representa um marco no design do iPhone.'
  },
  125: {
    title: 'Oppo A57',
    description: 'O Oppo A57 é um smartphone intermediário de design elegante e recursos capazes. Oferece equilíbrio entre desempenho e preço acessível.'
  },
  126: {
    title: 'Oppo F19 Pro Plus',
    description: 'O Oppo F19 Pro Plus é um smartphone completo com foco em recursos de câmera. Oferece fotografia avançada e desempenho potente para uma experiência premium.'
  },
  127: {
    title: 'Oppo K1',
    description: 'A linha Oppo K1 oferece smartphones com diferentes recursos e especificações. É conhecida pelo design elegante e desempenho confiável para diferentes necessidades.'
  },
  128: {
    title: 'Realme C35',
    description: 'O Realme C35 é um smartphone econômico focado nos recursos essenciais para o uso diário. Oferece desempenho confiável e experiência simples de usar.'
  },
  129: {
    title: 'Realme X',
    description: 'O Realme X é um smartphone intermediário de design elegante e tela impressionante. Oferece equilíbrio entre desempenho e recursos de câmera.'
  },
  130: {
    title: 'Realme XT',
    description: 'O Realme XT é um smartphone completo com foco em tecnologia de câmera. Seus sensores avançados produzem fotos e vídeos de alta qualidade.'
  },
  131: {
    title: 'Samsung Galaxy S7',
    description: 'O Samsung Galaxy S7 é um smartphone premium de design elegante e recursos avançados. Possui tela de alta resolução, câmera potente e desempenho consistente.'
  },
  132: {
    title: 'Samsung Galaxy S8',
    description: 'O Samsung Galaxy S8 é um smartphone premium com tela Infinity, oferecendo uma experiência visual impressionante. Também possui câmera avançada e tecnologia moderna.'
  },
  133: {
    title: 'Samsung Galaxy S10',
    description: 'O Samsung Galaxy S10 é um smartphone premium com tela AMOLED dinâmica, sistema de câmeras versátil e desempenho potente. Representa inovação na tecnologia móvel.'
  },
  134: {
    title: 'Vivo S1',
    description: 'O Vivo S1 é um smartphone intermediário que combina design e desempenho. Possui tela vibrante, sistema de câmeras capaz e funcionamento confiável.'
  },
  135: {
    title: 'Vivo V9',
    description: 'O Vivo V9 é um smartphone de design elegante focado em selfies de alta qualidade. Possui tela com entalhe, câmera dupla e aparência moderna.'
  },
  136: {
    title: 'Vivo X21',
    description: 'O Vivo X21 é um smartphone premium focado em tecnologia avançada. Possui leitor de digitais integrado à tela, display de alta resolução e câmeras avançadas.'
  },
  137: {
    title: 'Bola de Futebol Americano',
    description: 'A bola de futebol americano é usada em partidas do esporte. Foi projetada para ser lançada e recebida, sendo um equipamento essencial.'
  },
  138: {
    title: 'Bola de Beisebol',
    description: 'A bola de beisebol é padrão para partidas do esporte. Possui cobertura de couro resistente e foi projetada para arremessos, rebatidas e defesas.'
  },
  139: {
    title: 'Luva de Beisebol',
    description: 'A luva de beisebol é usada pelos jogadores para agarrar e defender a bola. Oferece conforto e controle durante as partidas.'
  },
  140: {
    title: 'Bola de Basquete',
    description: 'A bola de basquete é usada em partidas do esporte. Foi projetada para quicar, arremessar e passar, tanto em ambientes internos quanto externos.'
  },
  141: {
    title: 'Aro de Basquete',
    description: 'O aro de basquete é um conjunto resistente de aro e rede instalado na tabela. Ele serve como alvo para arremessos e marcação de pontos.'
  },
  142: {
    title: 'Bola de Críquete',
    description: 'A bola de críquete é uma bola de couro rígido usada no esporte. É lançada e rebatida durante o jogo, e sua costura influencia a dinâmica da partida.'
  },
  143: {
    title: 'Taco de Críquete',
    description: 'O taco de críquete é um equipamento essencial usado pelos rebatedores para acertar a bola. É feito de madeira e está disponível em diferentes tamanhos e designs.'
  },
  144: {
    title: 'Capacete de Críquete',
    description: 'O capacete de críquete protege a cabeça dos jogadores, especialmente rebatedores e defensores. Ajuda a proteger contra lançamentos rápidos.'
  },
  145: {
    title: 'Trave de Críquete',
    description: 'A trave de críquete é formada por três estacas e duas peças superiores. Os rebatedores protegem a trave enquanto marcam corridas.'
  },
  146: {
    title: 'Peteca com Penas',
    description: 'A peteca com penas é usada no badminton. Possui penas naturais e foi projetada para partidas rápidas, oferecendo estabilidade e precisão.'
  },
  147: {
    title: 'Bola de Futebol',
    description: 'A bola de futebol é o modelo padrão usado no esporte. Foi projetada para ser chutada e passada durante as partidas.'
  },
  148: {
    title: 'Bola de Golfe',
    description: 'A bola de golfe é pequena e possui cavidades na superfície para melhorar a aerodinâmica, o alcance e a elevação ao ser golpeada.'
  },
  149: {
    title: 'Taco de Golfe de Ferro',
    description: 'O taco de golfe de ferro é usado para diferentes jogadas. Possui cabeça metálica sólida e serve para aproximações, chipping e outras técnicas.'
  },
  150: {
    title: 'Taco de Beisebol de Metal',
    description: 'O taco de beisebol de metal é resistente e leve, produzido com ligas metálicas. É usado em partidas e treinos de rebatida.'
  },
  151: {
    title: 'Bola de Tênis',
    description: 'A bola de tênis é padrão para o esporte. Foi projetada para quicar e ser rebatida com raquetes durante partidas ou treinos.'
  },
  152: {
    title: 'Raquete de Tênis',
    description: 'A raquete de tênis é um equipamento essencial do esporte. Possui armação com cordas e empunhadura para rebater a bola.'
  },
  153: {
    title: 'Bola de Vôlei',
    description: 'A bola de vôlei é padrão para o esporte. Foi projetada para passes, levantamentos e cortadas sobre a rede durante as partidas.'
  },
  154: {
    title: 'Óculos de Sol Pretos',
    description: 'Os óculos de sol pretos são uma escolha clássica e elegante, com armação preta e lentes escuras. Oferecem proteção contra raios UV e estilo.'
  },
  155: {
    title: 'Óculos de Sol Clássicos',
    description: 'Os óculos de sol clássicos têm design atemporal, armação neutra e lentes com proteção UV. São versáteis para diferentes ocasiões.'
  },
  156: {
    title: 'Óculos Verdes e Pretos',
    description: 'Os óculos verdes e pretos combinam cores marcantes e acrescentam vivacidade à coleção de acessórios. São elegantes e chamam atenção.'
  },
  157: {
    title: 'Óculos para Festa',
    description: 'Os óculos para festa foram pensados para dar destaque ao visual. Com formatos diferentes ou armações coloridas, acrescentam um toque divertido.'
  },
  158: {
    title: 'Óculos de Sol',
    description: 'Os óculos de sol têm design clássico e simples, com foco na funcionalidade. Oferecem proteção UV essencial sem perder o estilo atemporal.'
  },
  159: {
    title: 'iPad Mini 2021 Estelar',
    description: 'O iPad Mini 2021 estelar é um tablet compacto e potente da Apple. Com tela Retina, chip da série A e design elegante, oferece uma experiência premium.'
  },
  160: {
    title: 'Samsung Galaxy Tab S8 Plus Cinza',
    description: 'O Samsung Galaxy Tab S8 Plus cinza é um tablet Android de alto desempenho, com tela AMOLED grande, processador potente e suporte à S Pen.'
  },
  161: {
    title: 'Samsung Galaxy Tab Branco',
    description: 'O Samsung Galaxy Tab branco é um tablet Android elegante e versátil. Possui tela vibrante, bateria duradoura e recursos para diferentes tarefas.'
  },
  162: {
    title: 'Vestido Azul',
    description: 'O vestido azul é charmoso e elegante para diferentes ocasiões. Sua cor vibrante e design confortável acrescentam estilo ao guarda-roupa.'
  },
  163: {
    title: 'Vestido de Verão Infantil',
    description: 'O vestido infantil de verão é leve e confortável para dias quentes. Com estampas alegres e tecido leve, mantém o visual fresco e estiloso.'
  },
  164: {
    title: 'Vestido Cinza',
    description: 'O vestido cinza é uma opção versátil e elegante para diferentes ocasiões. A cor neutra permite combinar a peça com vários estilos.'
  },
  165: {
    title: 'Vestido Curto',
    description: 'O vestido curto é moderno e descontraído. Ideal para passeios casuais ou ocasiões especiais, combina estilo e conforto.'
  },
  166: {
    title: 'Vestido Tartan',
    description: 'O vestido tartan apresenta uma estampa clássica e sofisticada. É perfeito para o outono e o inverno, com um toque tradicional ao visual.'
  },
  167: {
    title: 'Chrysler 300 Touring',
    description: 'O 300 Touring é um sedã elegante e confortável, conhecido pelos recursos luxuosos e pelo desempenho suave.'
  },
  168: {
    title: 'Charger SXT com Tração Traseira',
    description: 'O Charger SXT com tração traseira é um sedã potente e esportivo que combina desempenho e praticidade.'
  },
  169: {
    title: 'Dodge Hornet GT Plus',
    description: 'O Dodge Hornet GT Plus é um veículo compacto e ágil, ideal para a cidade com um toque esportivo.'
  },
  170: {
    title: 'Durango SXT com Tração Traseira',
    description: 'O Durango SXT com tração traseira é um SUV espaçoso e versátil, conhecido pelo desempenho forte e pelos recursos para a família.'
  },
  171: {
    title: 'Pacifica Touring',
    description: 'A Pacifica Touring é uma minivan elegante e bem equipada, oferecendo conforto e praticidade para viagens em família.'
  },
  172: {
    title: 'Bolsa Feminina Azul',
    description: 'A bolsa feminina azul é um acessório elegante e espaçoso para o uso diário. Com cor vibrante e vários compartimentos, combina moda e funcionalidade.'
  },
  173: {
    title: 'Bolsa Feminina de Couro Heshe',
    description: 'A bolsa feminina de couro Heshe é luxuosa e resistente, com design atemporal para mulheres sofisticadas. É um acessório versátil para diferentes ocasiões.'
  },
  174: {
    title: 'Bolsa Feminina Prada',
    description: 'A bolsa feminina Prada é um acessório de grife que transmite elegância e luxo. Produzida com precisão e logotipo Prada, destaca o visual.'
  },
  175: {
    title: 'Mochila Branca de Couro Sintético',
    description: 'A mochila branca de couro sintético é moderna e prática. Com design elegante e espaço amplo, combina com estilos casuais e do dia a dia.'
  },
  176: {
    title: 'Bolsa Feminina Preta',
    description: 'A bolsa feminina preta é um acessório clássico e versátil que combina com diferentes roupas. Sua cor atemporal e design funcional fazem dela um item essencial.'
  },
  177: {
    title: 'Vestido de Festa Preto',
    description: 'O vestido de festa preto é elegante e atemporal. Com design sofisticado, é ideal para eventos formais e ocasiões especiais.'
  },
  178: {
    title: 'Conjunto de Couro com Saia',
    description: 'O conjunto de couro com saia combina um corset elegante e uma saia coordenada. É uma opção marcante para pessoas que gostam de moda ousada.'
  },
  179: {
    title: 'Corset com Saia Preta',
    description: 'O corset com saia preta é uma composição elegante e versátil. Combina uma peça moderna com uma saia clássica para criar um visual coordenado.'
  },
  180: {
    title: 'Vestido Poá',
    description: 'O vestido poá é confortável e estiloso, com estampa divertida. É uma boa escolha para passeios casuais e para o uso cotidiano.'
  },
  181: {
    title: 'Conjunto Marni Vermelho e Preto',
    description: 'O conjunto Marni vermelho e preto é sofisticado e moderno. A combinação de tons fortes cria um visual atual, marcante e confiante.'
  },
  182: {
    title: 'Brinco de Cristal Verde',
    description: 'O brinco de cristal verde é um acessório brilhante com uma pedra de cor vibrante. Seu design clássico acrescenta elegância a ocasiões formais ou especiais.'
  },
  183: {
    title: 'Brinco Oval Verde',
    description: 'O brinco oval verde é um acessório elegante e versátil. Seu formato diferenciado, cor vibrante e design contemporâneo destacam o visual.'
  },
  184: {
    title: 'Brinco Tropical',
    description: 'O brinco tropical é um acessório divertido inspirado em elementos tropicais. Suas cores vibrantes acrescentam um toque de verão ao visual.'
  },
  185: {
    title: 'Chinelo Preto e Marrom',
    description: 'O chinelo preto e marrom combina conforto e estilo para momentos casuais. A mistura de cores acrescenta sofisticação ao visual de descanso.'
  },
  186: {
    title: 'Sapato de Salto Calvin Klein',
    description: 'Os sapatos de salto Calvin Klein são elegantes e sofisticados, desenvolvidos para ocasiões formais. O design clássico combina com produções refinadas.'
  },
  187: {
    title: 'Sapato Feminino Dourado',
    description: 'Os sapatos femininos dourados são uma escolha glamorosa para ocasiões especiais. A cor dourada e o design elegante acrescentam luxo ao visual.'
  },
  188: {
    title: 'Sapatos Pampi',
    description: 'Os sapatos Pampi combinam conforto e estilo para o uso diário. O design versátil é adequado para ocasiões casuais e cria um visual moderno e descontraído.'
  },
  189: {
    title: 'Sapatos Vermelhos',
    description: 'Os sapatos vermelhos destacam o visual com sua cor vibrante. São ideais para festas ou passeios casuais e acrescentam estilo ao guarda-roupa.'
  },
  190: {
    title: 'IWC Ingenieur Automático de Aço',
    description: 'O relógio IWC Ingenieur Automático de Aço é resistente e sofisticado. Com caixa de aço inoxidável e movimento automático, combina precisão e estilo.'
  },
  191: {
    title: 'Rolex Cellini Fases da Lua',
    description: 'O relógio Rolex Cellini Fases da Lua é uma obra da alta relojoaria. A complicação de fases da lua evidencia o acabamento e a elegância da Rolex.'
  },
  192: {
    title: 'Rolex Datejust Feminino',
    description: 'O Rolex Datejust feminino é um relógio icônico desenvolvido para mulheres. Seu design atemporal e indicação de data combinam elegância e funcionalidade.'
  },
  193: {
    title: 'Relógio Dourado Feminino',
    description: 'O relógio dourado feminino é um acessório elegante que combina luxo e estilo. A caixa dourada e o design refinado acrescentam glamour ao visual.'
  },
  194: {
    title: 'Relógio de Pulso Feminino',
    description: 'O relógio de pulso feminino é versátil e elegante para o uso diário. A pulseira confortável e o design simples combinam com diferentes estilos.'
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
