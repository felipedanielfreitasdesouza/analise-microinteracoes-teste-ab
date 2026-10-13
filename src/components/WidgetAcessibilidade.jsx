import { useState } from 'react';
import { Eye, Ear, Brain, MousePointer2, Settings, X } from 'lucide-react';
import { useAcessibilidade } from '../store/useAcessibilidade';

export default function WidgetAcessibilidade() {
  const [aberto, setAberto] = useState(false);
  const st = useAcessibilidade();

  if (!aberto) {
    return (
      <button 
        onClick={() => setAberto(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 flex items-center gap-2 cursor-pointer"
      >
        <Settings className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-2xl border border-slate-200 text-slate-800 p-5 flex flex-col gap-6 animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600"/> Ajustes Inclusivos
        </h3>
        <button onClick={() => setAberto(false)} className="p-1 hover:bg-slate-100 rounded-lg cursor-pointer">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Categoria 1: Foco e Cognição */}
      <section>
        <h4 className="text-sm font-semibold text-slate-500 flex items-center gap-2 mb-3">
          <Brain className="w-4 h-4"/> Foco e TDAH/Autismo
        </h4>
        <div className="space-y-2">
          <Toggle label="Máscara de Leitura" ativo={st.mascaraLeitura} onClick={st.toggleMascaraLeitura} />
          <Toggle label="Ocultar Imagens (Menos Estímulos)" ativo={st.ocultarImagens} onClick={st.toggleOcultarImagens} />
          <Toggle label="Parar Animações" ativo={st.reduzirAnimacoes} onClick={st.toggleReduzirAnimacoes} />
        </div>
      </section>

      {/* Categoria 2: Visual */}
      <section>
        <h4 className="text-sm font-semibold text-slate-500 flex items-center gap-2 mb-3">
          <Eye className="w-4 h-4"/> Adaptações Visuais
        </h4>
        <div className="space-y-2">
          <Toggle label="Cursor Ampliado" ativo={st.cursorAmpliado} onClick={st.toggleCursorAmpliado} />
          <Toggle label="Destacar Elementos Clicáveis" ativo={st.destacarBotoes} onClick={st.toggleDestacarBotoes} />
          
          <div className="pt-2">
            <label className="text-xs font-bold text-slate-700">Filtros de Daltonismo:</label>
            <select 
              value={st.filtroDaltonismo}
              onChange={(e) => st.setFiltroDaltonismo(e.target.value)}
              className="mt-1 w-full p-2 text-sm border rounded-lg bg-slate-50 cursor-pointer"
            >
              <option value="nenhum">Nenhum</option>
              <option value="protanopia">Protanopia (Sem Vermelho)</option>
              <option value="deuteranopia">Deuteranopia (Sem Verde)</option>
              <option value="tritanopia">Tritanopia (Sem Azul)</option>
            </select>
          </div>
        </div>
      </section>

      {/* Categoria 3: Leitura / Dislexia */}
      <section>
        <h4 className="text-sm font-semibold text-slate-500 flex items-center gap-2 mb-3">
          <Ear className="w-4 h-4"/> Leitura e Compreensão
        </h4>
        <div className="space-y-2">
          <Toggle label="Modo Dislexia (Fonte Especial)" ativo={st.fonteDislexia} onClick={st.toggleFonteDislexia} />
          <Toggle label="Leitura em Voz Alta (Hover)" ativo={st.leituraVoz} onClick={st.toggleLeituraVoz} />
        </div>
      </section>

      {/* Categoria 4: Motor */}
      <section>
        <h4 className="text-sm font-semibold text-slate-500 flex items-center gap-2 mb-3">
          <MousePointer2 className="w-4 h-4"/> Adaptações Motoras
        </h4>
        <div className="space-y-2">
          <Toggle label="Ampliar Áreas de Clique" ativo={st.areasCliqueAmpliadas} onClick={st.toggleAreasCliqueAmpliadas} />
        </div>
      </section>
    </div>
  );
}

// Subcomponente de Botão Liga/Desliga simples
function Toggle({ label, ativo, onClick }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">{label}</span>
      <div className={`w-10 h-5 rounded-full relative transition-colors ${ativo ? 'bg-blue-600' : 'bg-slate-300'}`}>
        <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${ativo ? 'left-6' : 'left-1'}`} />
      </div>
      <input type="checkbox" checked={ativo} onChange={onClick} className="sr-only" />
    </label>
  );
}