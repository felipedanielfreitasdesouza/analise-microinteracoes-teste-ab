import { produtos } from '../data/mock';

export default function PrototipoA() {
  return (
    <div className="p-8 bg-slate-100 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Loja Tech (Controle)</h1>
        <p className="text-slate-600">Interface estática e interações tradicionais.</p>
      </header>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white p-6 rounded-lg border border-slate-200">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {produto.categoria}
            </span>
            <h2 className="text-xl font-bold text-slate-800 mt-2">
              {produto.nome}
            </h2>
            <p className="text-slate-600 mt-2 text-sm">
              {produto.descricao}
            </p>
            <div className="mt-6 font-bold text-lg text-slate-900">
              {produto.preco}
            </div>
            
            {/* Botão de Ação Estático */}
            <button className="w-full mt-4 bg-blue-600 text-white font-semibold py-2 px-4 rounded">
              Adicionar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}