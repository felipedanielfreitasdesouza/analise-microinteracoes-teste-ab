import { produtos } from '../data/mock';

export default function PrototipoB() {
  return (
    <div className="p-8 bg-slate-950 min-h-screen text-slate-100 selection:bg-emerald-500 selection:text-slate-950">
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
          TechStore (Experimental)
        </h1>
        <p className="text-slate-400 mt-1">Interface dinâmica enriquecida com microinterações.</p>
      </header>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <div 
            key={produto.id} 
            className="group bg-slate-900 p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 ease-out hover:-translate-y-1"
          >
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider bg-emerald-500/10 px-2.5 py-1 rounded-full">
              {produto.categoria}
            </span>
            
            <h2 className="text-xl font-bold text-slate-100 mt-4 group-hover:text-emerald-300 transition-colors duration-200">
              {produto.nome}
            </h2>
            
            <p className="text-slate-400 mt-2 text-sm line-clamp-2">
              {produto.descricao}
            </p>
            
            <div className="mt-6 font-bold text-xl text-slate-50">
              {produto.preco}
            </div>
            
            {/* Botão com Microinterações de Hover e Clique Activo */}
            <button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-2.5 px-4 rounded-xl shadow-md hover:shadow-emerald-500/20 active:scale-95 transition-all duration-200 cursor-pointer">
              Adicionar ao Carrinho
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}