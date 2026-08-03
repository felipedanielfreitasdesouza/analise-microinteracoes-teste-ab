import { Eye } from 'lucide-react';

export default function CardProdutoA({ produto, onAdicionar, onVisualizar }) {
  return (
    <div className="bg-white border border-slate-300 rounded-none flex flex-col shadow-none">
      {/* Container da imagem plano */}
      <div className="relative bg-slate-50 h-48 flex items-center justify-center p-4 border-b border-slate-200">
        <img src={produto.thumbnail} alt={produto.title} className="max-h-full object-contain" />
        <button 
          onClick={() => onVisualizar(produto)}
          className="absolute top-2 right-2 bg-white p-1.5 border border-slate-300 rounded-none text-slate-700 hover:bg-slate-100 cursor-pointer shadow-none"
          title="Visualizar Detalhes"
        >
          <Eye className="h-4 w-4" />
        </button>
      </div>

      {/* Conteúdo do Card totalmente quadrado */}
      <div className="p-4 flex flex-col flex-1">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{produto.category}</span>
        <h3 className="font-bold text-sm text-slate-900 mt-1 line-clamp-1">{produto.title}</h3>
        <p className="text-xs text-slate-600 mt-1 flex-1 line-clamp-2">{produto.description}</p>
        
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-base font-bold text-slate-950">${produto.price.toFixed(2)}</span>
          <button 
            onClick={() => onAdicionar(produto)}
            className="bg-slate-700 hover:bg-slate-800 text-white font-medium text-xs py-2 px-4 rounded-none cursor-pointer transition-none"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );
}