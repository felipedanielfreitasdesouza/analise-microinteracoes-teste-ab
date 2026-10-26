import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { buscarProdutos } from '../services/api';
import { useCarrinho } from '../store/useCarrinho';
import { useAuth } from '../store/useAuth';
import { ShoppingCart, Search, X, Plus, Minus, Trash2, LogOut } from 'lucide-react';
import CardProdutoB from '../components/CardProdutoB';
import LoginB from '../components/LoginB';
import { trackExperimentEvent, trackTaskCompleted, trackTaskStarted } from '../services/analytics';

export default function PrototipoB() {
  const [busca, setBusca] = useState('');
  const [categoriaFiltrada, setCategoriaFiltrada] = useState('Todos');
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [produtoModal, setProdutoModal] = useState(null);
  const [clicadoId, setClicadoId] = useState(null);

  const { usuario, logout } = useAuth();

  const { data: produtos, isLoading, error } = useQuery({
    queryKey: ['produtos'],
    queryFn: buscarProdutos,
  });

  const { itens, adicionarProduto, removerProduto, atualizarQuantidade, limparCarrinho } = useCarrinho();

  useEffect(() => {
    if (usuario && produtos?.length) {
      trackTaskStarted('add_product', 'B');
    }
  }, [usuario, produtos]);

  const registrarProdutoAdicionado = (produto) => {
    trackTaskCompleted('add_product', 'B', {
      product_id: produto.id,
      category: produto.category,
    });
    trackTaskStarted('checkout', 'B', { product_id: produto.id });
    dispararAdicionar(produto);
  };

  if (!usuario) {
    return <LoginB aoLogar={() => console.log('Usuário autenticado no Canal B.')} />;
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

  const dispararAdicionar = (produto) => {
    adicionarProduto(produto);
    setClicadoId(produto.id);
    setTimeout(() => setClicadoId(null), 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-200 font-mono">
        <div className="w-full max-w-7xl px-4 space-y-6 animate-pulse">
          <div className="h-14 bg-slate-300 border border-slate-400" />
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-44 h-32 bg-slate-300 border border-slate-400" />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-80 bg-slate-100 border border-slate-300" />
              ))}
            </div>
          </div>
        </div>
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
    <MotionConfig>
      <div className="min-h-screen bg-slate-200 text-slate-800 antialiased font-sans">
        <header className="bg-slate-800 border-b-2 border-slate-900 text-white sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <h1 className="text-base font-black tracking-normal text-slate-100">SISTEMA CATÁLOGO</h1>
              <span className="text-[11px] font-mono bg-slate-700 px-2 py-0.5 text-slate-300">
                User: {usuario.nome}
              </span>
            </div>

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
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  trackExperimentEvent('cart_opened', 'B');
                  setCarrinhoAberto(true);
                }}
                className="bg-slate-700 text-white px-4 py-2 rounded-none border border-slate-600 flex items-center gap-2 cursor-pointer text-xs font-bold hover:bg-slate-600"
              >
                <ShoppingCart className="h-4 w-4" />
                <span>Itens: </span>
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.span
                    key={totalItens}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                  >
                    {totalItens}
                  </motion.span>
                </AnimatePresence>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, color: '#f87171' }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  trackExperimentEvent('logout', 'B');
                  limparCarrinho();
                  logout();
                }}
                className="bg-red-800 hover:bg-red-900 text-white p-2 rounded-none border border-red-900 cursor-pointer"
                title="Encerrar Sessão"
              >
                <LogOut className="h-4 w-4" />
              </motion.button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
          <aside className="w-full md:w-44 shrink-0">
            <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 font-mono">
              Índice Categorias
            </h2>
            <div className="flex flex-wrap md:flex-col gap-0.5">
              {categorias.map((cat) => (
                <motion.button
                  key={cat}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    trackExperimentEvent('category_filter_applied', 'B', { category: cat });
                    setCategoriaFiltrada(cat);
                  }}
                  className={`text-left px-3 py-2 text-xs rounded-none border border-slate-300 capitalize cursor-pointer w-full transition-none ${
                    categoriaFiltrada === cat
                      ? 'bg-blue-800 text-white font-bold border-blue-900'
                      : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </aside>

          <section className="flex-1">
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {produtosFiltrados?.map((produto) => (
                <CardProdutoB
                  key={produto.id}
                  produto={produto}
                  isClicado={clicadoId === produto.id}
                  onAdicionar={registrarProdutoAdicionado}
                  onVisualizar={setProdutoModal}
                />
              ))}
            </motion.div>
          </section>
        </main>

        <AnimatePresence>
          {carrinhoAberto && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setCarrinhoAberto(false)}
                className="fixed inset-0 bg-black/40 z-50"
              />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 320, damping: 32 }}
                className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white border-l-2 border-slate-400 h-full flex flex-col z-50"
              >
                <div className="p-3 border-b border-slate-300 flex items-center justify-between bg-slate-100">
                  <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                    <ShoppingCart className="h-4 w-4" /> Detalhamento do Pedido
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setCarrinhoAberto(false)}
                    className="p-1 hover:bg-slate-200 border border-transparent hover:border-slate-300 rounded-none cursor-pointer"
                  >
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {itens.length === 0 ? (
                    <p className="text-center text-xs text-slate-500 mt-8 font-mono">Nenhum registro encontrado.</p>
                  ) : (
                    <AnimatePresence mode="popLayout">
                      {itens.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, x: 12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 12 }}
                          className="flex gap-2 bg-white p-2 border border-slate-300 rounded-none"
                        >
                          <img src={item.thumbnail} alt={item.title} className="w-12 h-12 object-contain bg-slate-50 border border-slate-200 p-1" />
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-xs text-slate-900 truncate">{item.title}</h4>
                            <p className="text-[11px] font-bold text-slate-700 mt-0.5">${item.price.toFixed(2)}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                                className="bg-slate-100 border border-slate-300 p-0.5 rounded-none hover:bg-slate-200 cursor-pointer text-slate-600"
                              >
                                <Minus className="h-2.5 w-2.5" />
                              </motion.button>
                              <span className="text-xs font-bold px-1 min-w-4 text-center">{item.quantidade}</span>
                              <motion.button
                                whileTap={{ scale: 0.8 }}
                                onClick={() => adicionarProduto(item)}
                                className="bg-slate-100 border border-slate-300 p-0.5 rounded-none hover:bg-slate-200 cursor-pointer text-slate-600"
                              >
                                <Plus className="h-2.5 w-2.5" />
                              </motion.button>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1, color: '#dc2626' }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removerProduto(item.id)}
                            className="text-red-700 p-1 border border-transparent hover:border-slate-300 hover:bg-slate-50 self-start rounded-none cursor-pointer"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </motion.button>
                        </motion.div>
                      ))}
                    </AnimatePresence>
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
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      trackExperimentEvent('checkout_attempted', 'B', { cart_items: itens.length });
                      trackExperimentEvent('checkout_completed', 'B', { cart_items: itens.length });
                      trackTaskCompleted('checkout', 'B', { cart_items: itens.length });
                      alert('Fluxo concluído.');
                    }}
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 rounded-none text-xs cursor-pointer"
                    disabled={itens.length === 0}
                  >
                    Emitir Pedido de Compra
                  </motion.button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {produtoModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setProdutoModal(null)}
                className="fixed inset-0 bg-black/50"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 12 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
                className="bg-white max-w-xl w-full rounded-none border-2 border-slate-500 relative flex flex-col md:flex-row z-10"
              >
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setProdutoModal(null)}
                  className="absolute top-2 right-2 bg-slate-100 border border-slate-300 p-1 rounded-none text-slate-700 hover:bg-slate-200 z-10 cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </motion.button>

                <div className="md:w-5/12 bg-slate-50 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
                  <img src={produtoModal.thumbnail} alt={produtoModal.title} className="max-h-48 object-contain" />
                </div>

                <div className="md:w-7/12 p-5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] text-blue-800 font-bold uppercase border border-blue-800 px-2 py-0.5">
                      {produtoModal.category}
                    </span>
                    <h2 className="text-base font-bold text-slate-950 mt-3">{produtoModal.title}</h2>
                    <p className="text-[11px] text-slate-500 font-semibold mt-1">Metrificação Comercial: {produtoModal.rating} / 5</p>
                    <p className="text-xs text-slate-600 mt-3 leading-normal">{produtoModal.description}</p>
                  </div>

                  <div className="mt-5 border-t border-slate-200 pt-3 flex items-center justify-between">
                    <span className="text-xl font-black text-slate-950">${produtoModal.price.toFixed(2)}</span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        trackExperimentEvent('product_added_to_cart', 'B', {
                          product_id: produtoModal.id,
                          category: produtoModal.category,
                        });
                        registrarProdutoAdicionado(produtoModal);
                        setProdutoModal(null);
                      }}
                      className="bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-none text-xs cursor-pointer"
                    >
                      Registrar no Pedido
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
