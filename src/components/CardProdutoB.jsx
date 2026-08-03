import { motion } from 'framer-motion';
import { Eye, Check } from 'lucide-react';

export default function CardProdutoB({ produto, isDark, isClicado, onAdicionar, onVisualizar }) {
  return (
    <motion.div 
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`border rounded-2xl flex flex-col overflow-hidden transition-colors duration-500 ${
        isDark 
          ? 'bg-slate-900 border-slate-800/80 shadow-xl shadow-black/20' 
          : 'bg-white border-slate-200 shadow-md shadow-slate-200/40'
      }`}
    >
      {/* Container da Imagem com fundo adaptativo */}
      <div className={`relative h-48 flex items-center justify-center p-4 border-b transition-colors duration-500 ${
        isDark ? 'bg-slate-950/40 border-slate-800/80' : 'bg-slate-50 border-slate-100'
      }`}>
        <motion.img 
          whileHover={{ scale: 1.05 }}
          src={produto.thumbnail} 
          alt={produto.title} 
          className="max-h-full object-contain" 
        />
        
        {/* Botão de espiar detalhes */}
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onVisualizar(produto)}
          className={`absolute top-3 right-3 p-2 rounded-xl border transition-all cursor-pointer ${
            isDark 
              ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-400' 
              : 'bg-white border-slate-200 text-slate-500 hover:text-emerald-500 shadow-sm'
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
        </motion.button>
      </div>

      {/* Conteúdo do Card textual */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
          {produto.category}
        </span>
        
        <h3 className={`font-black text-sm mt-1 line-clamp-1 transition-colors duration-500 ${
          isDark ? 'text-slate-100' : 'text-slate-900'
        }`}>
          {produto.title}
        </h3>
        
        <p className={`text-xs mt-1.5 flex-1 line-clamp-2 transition-colors duration-500 ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          {produto.description}
        </p>
        
        {/* Rodapé do preço e compra */}
        <div className="mt-5 pt-3 border-t border-slate-500/10 flex items-center justify-between">
          <span className={`text-base font-black transition-colors duration-500 ${
            isDark ? 'text-emerald-400' : 'text-slate-950'
          }`}>
            ${produto.price.toFixed(2)}
          </span>
          
          <motion.button 
            layout
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onAdicionar(produto)}
            className={`text-xs font-black py-2 px-4 rounded-xl cursor-pointer flex items-center gap-1.5 transition-all duration-300 ${
              isClicado 
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20' 
                : isDark
                  ? 'bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-750'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'
            }`}
          >
            {isClicado ? (
              <>
                <Check className="h-3.5 w-3.5 stroke-3" /> Adicionado
              </>
            ) : (
              'Adicionar'
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}