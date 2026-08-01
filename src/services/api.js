// Função assíncrona que busca os produtos da DummyJSON API
export async function buscarProdutos() {
  const resposta = await fetch('https://dummyjson.com/products?limit=20');
  
  if (!resposta.ok) {
    throw new Error('Erro ao carregar os produtos do servidor.');
  }
  
  const dados = await resposta.json();
  return dados.products; // Retorna o array de 20 produtos
}