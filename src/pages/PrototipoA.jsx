import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { buscarProdutos } from '../services/api';
import { useCarrinho } from '../store/useCarrinho';
import { useAuth } from '../store/useAuth';
import CardProdutoA from '../components/CardProdutoA';
import LoginA from '../components/LoginA';
import { ShoppingCart, Search, X, Plus, Minus, Trash2, LogOut } from 'lucide-react';

export default function PrototipoA() {
  const [busca, setBusca] = useState('');
  const [categoriaFiltrada, setCategoriaFiltrada] = useState('Todos');
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [produtoModal, setProdutoModal] = useState(null);

  // Estados e funções globais de Autenticação
  const { usuario, logout } = useAuth();

  const { data: produtos, isLoading, error } = useQuery({
    queryKey: ['produtos'],
    queryFn: buscarProdutos,
  });

  const { itens, adicionarProduto, removerProduto, atualizarQuantidade, limparCarrinho } = useCarrinho();

  // Bloqueio de segurança: Se não estiver logado, renderiza apenas a tela de Login estática
  if (!usuario) {
    return <LoginA aoLogar={() => console.log('Usuário autenticado no Canal A.')} />;
  }

  const categorias = produtos 
    ? ['Todos', ...new Set(produtos.map((p) => p.category))] 
    : ['Todos'];

  const produtosFiltrados = produtos?.filter((produto) => {
    const bateBusca = produto.title.toLowerCase().includes(busca.toLowerCase());
    const bateCategoria = categoriaFiltrada === 'Todos' || produto.category === categoriaFiltrada;
    return bateBusca && bateCategoria;
  });

  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);
  const subtotal = itens.reduce((acc, item) => acc + (item.price * item.quantidade), 0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-200 font-mono">
        <p className="text-sm font-bold text-slate-700">Aguardando resposta do servidor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-200 font-mono">
        <p className="text-sm font-bold text-red-600">Falha crítica no carregamento: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 text-slate-800 antialiased font-sans">
      
      {/* HEADER CORPORATIVO PLANO */}
      <header className="bg-slate-800 border-b-2 border-slate-900 text-white sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-base font-black tracking-normal text-slate-100">SISTEMA CATÁLOGO (A)</h1>
            <span className="text-[11px] font-mono bg-slate-700 px-2 py-0.5 text-slate-300">
              User: {usuario.nome}
            </span>
          </div>
          
          {/* BUSCA RÍGIDA */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filtro de busca por texto..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-white border border-slate-400 rounded-none text-xs text-slate-900 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* BOTAO CARRINHO SEM ANIMAÇÃO */}
            <button 
              onClick={() => setCarrinhoAberto(true)}
              className="bg-slate-700 text-white px-4 py-2 rounded-none border border-slate-600 flex items-center gap-2 cursor-pointer text-xs font-bold hover:bg-slate-600"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Itens: {totalItens}</span>
            </button>

            {/* BOTÃO LOGOUT RÍGIDO */}
            <button 
              onClick={() => {
                limparCarrinho();
                logout();
              }}
              className="bg-red-800 hover:bg-red-900 text-white p-2 rounded-none border border-red-900 cursor-pointer"
              title="Encerrar Sessão"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
        
        {/* FILTROS LATERAIS QUADRADOS */}
        <aside className="w-full md:w-44 shrink-0">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">Índice Categorias</h2>
          <div className="flex flex-wrap md:flex-col gap-0.5">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltrada(cat)}
                className={`text-left px-3 py-2 text-xs rounded-none border border-slate-300 capitalize cursor-pointer w-full transition-none ${
                  categoriaFiltrada === cat 
                    ? 'bg-blue-800 text-white font-bold border-blue-900' 
                    : 'bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* GRID DE PRODUTOS */}
        <section className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {produtosFiltrados?.map((produto) => (
              <CardProdutoA 
                key={produto.id} 
                produto={produto} 
                onAdicionar={adicionarProduto} 
                onVisualizar={setProdutoModal} 
              />
            ))}
          </div>
        </section>
      </main>

      {/* DRAWER DO CARRINHO */}
      {carrinhoAberto && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div className="w-full max-w-sm bg-white border-l-2 border-slate-400 h-full flex flex-col">
            <div className="p-3 border-b border-slate-300 flex items-center justify-between bg-slate-100">
              <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" /> Detalhamento do Pedido
              </h2>
              <button onClick={() => setCarrinhoAberto(false)} className="p-1 hover:bg-slate-200 border border-transparent hover:border-slate-300 rounded-none cursor-pointer">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {itens.length === 0 ? (
                <p className="text-center text-xs text-slate-500 mt-8 font-mono">Nenhum registro encontrado.</p>
              ) : (
                itens.map((item) => (
                  <div key={item.id} className="flex gap-2 bg-white p-2 border border-slate-300 rounded-none">
                    <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-contain bg-slate-50 border border-slate-200 p-1" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 truncate">{item.title}</h4>
                      <p className="text-[11px] font-bold text-slate-700 mt-0.5">${item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <button 
                          onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                          className="bg-slate-100 border border-slate-300 p-0.5 rounded-none hover:bg-slate-200 cursor-pointer text-slate-600"
                        >
                          <Minus className="h-2.5 w-2.5" />
                        </button>
                        <span className="text-xs font-bold px-1 min-w-4 text-center">{item.quantidade}</span>
                        <button 
                          onClick={() => adicionarProduto(item)}
                          className="bg-slate-100 border border-slate-300 p-0.5 rounded-none hover:bg-slate-200 cursor-pointer text-slate-600"
                        >
                          <Plus className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removerProduto(item.id)}
                      className="text-red-700 p-1 border border-transparent hover:border-slate-300 hover:bg-slate-50 self-start rounded-none cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-3 border-t border-slate-300 bg-slate-100 space-y-2">
              <div className="flex justify-between text-xs text-slate-700">
                <span>Valor Bruto:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-slate-950 border-t border-slate-300 pt-2">
                <span>VALOR LIQUIDO:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => alert('Fluxo concluído no módulo A.')}
                className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 rounded-none text-xs cursor-pointer"
                disabled={itens.length === 0}
              >
                Emitir Pedido de Compra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL QUICK VIEW */}
      {produtoModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-xl w-full rounded-none border-2 border-slate-500 relative flex flex-col md:flex-row">
            <button 
              onClick={() => setProdutoModal(null)}
              className="absolute top-2 right-2 bg-slate-100 border border-slate-300 p-1 rounded-none text-slate-700 hover:bg-slate-200 z-10 cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="md:w-5/12 bg-slate-50 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
              <img src={produtoModal.thumbnail} alt={produtoModal.title} className="max-h-48 object-contain" />
            </div>
            
            <div className="md:w-7/12 p-5 flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-blue-800 font-bold uppercase border border-blue-800 px-2 py-0.5">{produtoModal.category}</span>
                <h2 className="text-base font-bold text-slate-950 mt-3">{produtoModal.title}</h2>
                <p className="text-[11px] text-slate-500 font-semibold mt-1">Metrificação Comercial: {produtoModal.rating} / 5</p>
                <p className="text-xs text-slate-600 mt-3 leading-normal">{produtoModal.description}</p>
              </div>
              
              <div className="mt-5 border-t border-slate-200 pt-3 flex items-center justify-between">
                <span className="text-xl font-black text-slate-950">${produtoModal.price.toFixed(2)}</span>
                <button 
                  onClick={() => {
                    adicionarProduto(produtoModal);
                    setProdutoModal(null);
                  }}
                  className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-none text-xs cursor-pointer"
                >
                  Registrar no Pedido
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}