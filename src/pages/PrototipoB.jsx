import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { buscarProdutos } from '../services/api';
import { useCarrinho } from '../store/useCarrinho';
import { useAuth } from '../store/useAuth';
import CardProdutoB from '../components/CardProdutoB';
import LoginB from '../components/LoginB';
import { ShoppingCart, Search, X, Plus, Minus, Trash2, Check, Sun, Moon, LogOut } from 'lucide-react';

export default function PrototipoB() {
  const [busca, setBusca] = useState('');
  const [categoriaFiltrada, setCategoriaFiltrada] = useState('Todos');
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [produtoModal, setProdutoModal] = useState(null);
  const [clicadoId, setClicadoId] = useState(null);

  // NOVO: Estado para alternador de Tema visual reativo
  const [darkMode, setDarkMode] = useState(true);

  const { usuario, logout } = useAuth();

  const { data: produtos, isLoading, error } = useQuery({
    queryKey: ['produtos'],
    queryFn: buscarProdutos,
  });

  const { itens, adicionarProduto, removerProduto, atualizarQuantidade, limparCarrinho } = useCarrinho();

  // Bloqueio de Login Emocional
  if (!usuario) {
    return <LoginB aoLogar={() => console.log('Usuário autenticado no Canal B.')} darkTheme={darkMode} />;
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
      <div className={`min-h-screen p-8 transition-colors duration-500 ${darkMode ? 'bg-slate-950' : 'bg-slate-100'}`}>
        <div className="max-w-7xl mx-auto space-y-8 animate-pulse">
          <div className={`h-8 w-64 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />
          <div className="flex flex-col md:flex-row gap-8">
            <div className={`w-48 h-48 rounded-xl ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-80 rounded-2xl border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-slate-950 text-red-400' : 'bg-slate-50 text-red-600'}`}>
        <p className="text-xl font-bold">Erro ao carregar catálogo: {error.message}</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans ${
      darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* HEADER DINÂMICO INTERATIVO */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-500 ${
        darkMode ? 'bg-slate-900/80 border-slate-800/60' : 'bg-white/80 border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-black bg-linear-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent tracking-wider">
              TECHSTORE (B)
            </h1>
            <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
              darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-200 text-slate-600'
            }`}>
              {usuario.nome}
            </span>
          </div>
          
          {/* BUSCA ADAPTATIVA */}
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500 group-focus-within:text-emerald-500 transition-colors" />
            <input
              type="text"
              placeholder="Encontre novos produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className={`w-full pl-9 pr-4 py-1.5 rounded-xl text-xs transition-all duration-300 focus:outline-none border ${
                darkMode 
                  ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-emerald-500'
                  : 'bg-slate-100 border-slate-200 text-slate-900 focus:border-emerald-500 focus:bg-white'
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            {/* MICROINTERAÇÃO: SWITCH LIGHT/DARK MODE */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-xl border cursor-pointer ${
                darkMode ? 'bg-slate-800 border-slate-700 text-amber-400' : 'bg-slate-100 border-slate-200 text-indigo-600'
              }`}
              title="Alternar Conforto Visual"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.button>

            {/* BOTÃO CARRINHO ANIMAÇÃO DE ESCALA */}
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCarrinhoAberto(true)}
              className={`relative p-2 rounded-xl border flex items-center gap-2 cursor-pointer transition-colors text-emerald-500 ${
                darkMode ? 'bg-slate-800 border-slate-700 hover:bg-slate-750' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
              }`}
            >
              <ShoppingCart className="h-4 w-4" />
              <AnimatePresence mode="popLayout">
                <motion.span 
                  key={totalItens}
                  initial={{ scale: 0.3, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.3, opacity: 0 }}
                  className="absolute -top-1.5 -right-1.5 text-[9px] font-black bg-emerald-500 text-slate-950 px-1.5 py-0.5 rounded-full min-w-4"
                >
                  {totalItens}
                </motion.span>
              </AnimatePresence>
            </motion.button>

            {/* BOTÃO SAIR COM MICROINTERAÇÃO DE ROTAÇÃO SUBTIL */}
            <motion.button
              whileHover={{ scale: 1.05, color: '#f87171' }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                limparCarrinho();
                logout();
              }}
              className={`p-2 rounded-xl border cursor-pointer ${
                darkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-500'
              }`}
              title="Sair do Perfil"
            >
              <LogOut className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
      </header>

      {/* CONTEÚDO PRINCIPAL */}
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* FILTROS LATERAIS SUAVES */}
        <aside className="w-full md:w-44 shrink-0">
          <h2 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-3">Filtro de Categoria</h2>
          <div className="flex flex-wrap md:flex-col gap-1.5">
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaFiltrada(cat)}
                className={`text-left px-3 py-2 text-xs rounded-xl capitalize cursor-pointer w-full transition-all duration-300 ${
                  categoriaFiltrada === cat 
                    ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-slate-950 font-black' 
                    : darkMode 
                      ? 'bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                      : 'bg-white text-slate-600 hover:bg-slate-200 shadow-sm'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        {/* GRID DE PRODUTOS INTERATIVO */}
        <section className="flex-1">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {produtosFiltrados?.map((produto) => (
              <CardProdutoB 
                key={produto.id} 
                produto={produto} 
                isDark={darkMode}
                isClicado={clicadoId === produto.id}
                onAdicionar={dispararAdicionar} 
                onVisualizar={setProdutoModal}
              />
            ))}
          </motion.div>
        </section>
      </main>

      {/* DRAWER ANIMAÇÃO DESLIZANTE */}
      <AnimatePresence>
        {carrinhoAberto && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCarrinhoAberto(false)}
              className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className={`fixed right-0 top-0 bottom-0 w-full max-w-sm border-l z-50 flex flex-col shadow-2xl ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <div className="p-4 border-b flex items-center justify-between text-slate-200">
                <h2 className={`font-bold text-sm flex items-center gap-2 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                  <ShoppingCart className="h-4 w-4 text-emerald-500" /> Itens no Pedido
                </h2>
                <motion.button 
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setCarrinhoAberto(false)} 
                  className="p-1.5 rounded-xl cursor-pointer text-slate-400 hover:text-slate-500"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {itens.length === 0 ? (
                  <p className="text-center text-slate-400 mt-8 text-xs">O carrinho está limpo.</p>
                ) : (
                  <AnimatePresence mode="popLayout">
                    {itens.map((item) => (
                      <motion.div 
                        layout
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ x: 40, opacity: 0 }}
                        key={item.id} 
                        className={`flex gap-3 p-3 border rounded-xl ${
                          darkMode ? 'bg-slate-955 border-slate-850' : 'bg-slate-50 border-slate-150'
                        }`}
                      >
                        <img src={item.thumbnail} alt={item.title} className={`w-14 h-14 object-contain p-1 border rounded-lg ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-250'}`} />
                        <div className="flex-1 min-w-0">
                          <h4 className={`font-bold text-xs truncate ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{item.title}</h4>
                          <p className="text-xs font-semibold text-emerald-500 mt-0.5">${item.price.toFixed(2)}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            <motion.button 
                              whileTap={{ scale: 0.8 }}
                              onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                              className={`p-1 rounded-lg border text-slate-400 cursor-pointer ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                            >
                              <Minus className="h-2.5 w-2.5" />
                            </motion.button>
                            <span className={`text-xs font-bold w-4 text-center ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>{item.quantidade}</span>
                            <motion.button 
                              whileTap={{ scale: 0.8 }}
                              onClick={() => adicionarProduto(item)}
                              className={`p-1 rounded-lg border text-slate-400 cursor-pointer ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}
                            >
                              <Plus className="h-2.5 w-2.5" />
                            </motion.button>
                          </div>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.1, color: "#f87171" }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => removerProduto(item.id)}
                          className="text-slate-500 p-2 self-start rounded-lg cursor-pointer"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              <div className={`p-4 border-t space-y-3 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Subtotal Geral:</span>
                  <span className={darkMode ? 'text-slate-200' : 'text-slate-700'}>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold">
                  <span className={darkMode ? 'text-slate-100' : 'text-slate-900'}>Total Final:</span>
                  <span className="text-emerald-500 font-black text-base">${subtotal.toFixed(2)}</span>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => alert('Fluxo finalizado no Protótipo B')}
                  className="w-full bg-linear-to-r from-emerald-500 to-teal-500 text-slate-950 font-black py-2.5 rounded-xl text-xs tracking-wider cursor-pointer shadow-lg shadow-emerald-500/10"
                  disabled={itens.length === 0}
                >
                  Concluir Transação
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MODAL QUICK VIEW POP UP MOLAS */}
      <AnimatePresence>
        {produtoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setProdutoModal(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.88, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 380, damping: 26 }}
              className={`max-w-xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col md:flex-row z-10 border ${
                darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
              }`}
            >
              <motion.button 
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setProdutoModal(null)}
                className={`absolute top-3 right-3 p-1.5 rounded-full z-10 cursor-pointer ${darkMode ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-500'}`}
              >
                <X className="h-4 w-4" />
              </motion.button>
              
              <div className={`md:w-5/12 p-4 flex items-center justify-center border-b md:border-b-0 md:border-r ${darkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-100 border-slate-150'}`}>
                <img src={produtoModal.thumbnail} alt={produtoModal.title} className="max-h-48 object-contain" />
              </div>
              
              <div className="md:w-7/12 p-5 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-wider bg-emerald-500/10 px-2.5 py-0.5 rounded-full">{produtoModal.category}</span>
                  <h2 className={`text-base font-black mt-3 ${darkMode ? 'text-slate-100' : 'text-slate-900'}`}>{produtoModal.title}</h2>
                  <p className="text-[10px] text-amber-500 font-semibold mt-1">⭐ Classificação: {produtoModal.rating} / 5</p>
                  <p className={`text-xs mt-3 leading-relaxed ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>{produtoModal.description}</p>
                </div>
                
                <div className={`mt-5 border-t pt-3 flex items-center justify-between ${darkMode ? 'border-slate-850' : 'border-slate-150'}`}>
                 {/* Remova a palavra "bondage" para ficar assim: */}
                  <span className={`text-xl font-black ${darkMode ? 'text-slate-50' : 'text-slate-950'}`}>${produtoModal.price.toFixed(2)}</span>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      dispararAdicionar(produtoModal);
                      setProdutoModal(null);
                    }}
                    className="bg-linear-to-r from-emerald-500 to-teal-500 text-slate-950 font-black py-2 px-4 rounded-xl text-xs cursor-pointer shadow-md"
                  >
                    Colocar no Carrinho
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}