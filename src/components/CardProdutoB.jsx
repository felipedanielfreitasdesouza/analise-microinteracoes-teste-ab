import { motion } from 'framer-motion';
import { Eye, Check } from 'lucide-react';
import { trackExperimentEvent } from '../services/analytics';

export default function CardProdutoB({ produto, isClicado, onAdicionar, onVisualizar }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white border border-slate-300 rounded-none flex flex-col shadow-none"
    >
      <div className="relative bg-slate-50 h-48 flex items-center justify-center p-4 border-b border-slate-200">
        <motion.img
          whileHover={{ scale: 1.05 }}
          src={produto.thumbnail}
          alt={produto.title}
          className="max-h-full object-contain"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            trackExperimentEvent('product_details_opened', 'B', {
              product_id: produto.id,
              category: produto.category,
            });
            onVisualizar(produto);
          }}
          className="absolute top-2 right-2 bg-white p-1.5 border border-slate-300 rounded-none text-slate-700 hover:bg-slate-100 cursor-pointer shadow-none"
          title="Visualizar Detalhes"
        >
          <Eye className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {produto.category}
        </span>
        <h3 className="font-bold text-sm text-slate-900 mt-1 line-clamp-1">
          {produto.title}
        </h3>
        <p className="text-xs text-slate-600 mt-1 flex-1 line-clamp-2">
          {produto.description}
        </p>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-base font-bold text-slate-950">
            ${produto.price.toFixed(2)}
          </span>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              trackExperimentEvent('product_added_to_cart', 'B', {
                product_id: produto.id,
                category: produto.category,
              });
              onAdicionar(produto);
            }}
            className={`font-medium text-xs py-2 px-4 rounded-none cursor-pointer flex items-center gap-1.5 transition-colors ${
              isClicado
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 hover:bg-slate-800 text-white'
            }`}
          >
            {isClicado ? (
              <>
                <Check className="h-3.5 w-3.5" /> Adicionado
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
