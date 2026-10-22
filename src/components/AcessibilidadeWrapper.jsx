import { useEffect, useState } from 'react';
import { useAcessibilidade } from '../store/useAcessibilidade';

export default function AcessibilidadeWrapper({ children }) {
  const { 
    mascaraLeitura, 
    ocultarImagens, 
    filtroDaltonismo, 
    destacarBotoes, 
    cursorAmpliado, 
    areasCliqueAmpliadas, 
    fonteDislexia, 
    leituraVoz 
  } = useAcessibilidade();

  // Lógica da Máscara de Leitura (Foco)
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    if (!mascaraLeitura) return;
    const atualizarMouseY = (e) => setMouseY(e.clientY);
    window.addEventListener('mousemove', atualizarMouseY);
    return () => window.removeEventListener('mousemove', atualizarMouseY);
  }, [mascaraLeitura]);

  // Lógica do Text-to-Speech (Leitura em Voz Alta)
  useEffect(() => {
    if (!leituraVoz) {
      window.speechSynthesis.cancel();
      return;
    }
    const falarTexto = (e) => {
      const texto = e.target.innerText || e.target.getAttribute('aria-label');
      if (texto && texto.length < 150) {
        window.speechSynthesis.cancel();
        const msg = new SpeechSynthesisUtterance(texto);
        msg.lang = 'pt-BR';
        msg.rate = 1.2;
        window.speechSynthesis.speak(msg);
      }
    };
    window.addEventListener('mouseover', falarTexto);
    return () => {
      window.removeEventListener('mouseover', falarTexto);
      window.speechSynthesis.cancel();
    };
  }, [leituraVoz]);

  // Construção dinâmica de Classes CSS
  const getClasses = () => {
    let classes = 'transition-all duration-300 min-h-screen w-full ';
    
    // Leitura
    if (fonteDislexia) classes += 'font-comic-sans tracking-widest leading-loose ';
    
    // Visual
    if (ocultarImagens) classes += '[&_img]:opacity-0 [&_img]:bg-slate-300 ';
    
    // Motora
    if (areasCliqueAmpliadas) classes += '[&_button]:p-6 [&_a]:p-6 ';

    // Cursor e Filtros de Daltonismo foram removidos daqui para não quebrar o CSS!
    return classes;
  };

  return (
    <div className={getClasses()}>
      
      {/* 1. Estilos Globais Injetados (Botões e Cursor Consertado) */}
      <style>{`
        ${destacarBotoes ? `
          button, a, input {
            border: 4px solid #fbbf24 !important;
            background-color: #fef3c7 !important;
            color: #000 !important;
            text-decoration: underline !important;
          }
        ` : ''}
        
        ${cursorAmpliado ? `
          * {
            cursor: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M0,0 L0,32 L9,23 L18,32 L23,29 L14,20 L24,20 Z" fill="black" stroke="white" stroke-width="2"/></svg>'), auto !important;
          }
        ` : ''}
      `}</style>

      {/* 2. Película de Daltonismo (Sem quebrar os botões fixos) */}
      {filtroDaltonismo !== 'nenhum' && (
        <div 
          className="fixed inset-0 pointer-events-none z-9998"
          style={{
            backdropFilter: 
              filtroDaltonismo === 'protanopia' ? 'hue-rotate(15deg) contrast(1.25) sepia(0.2)' :
              filtroDaltonismo === 'deuteranopia' ? 'hue-rotate(-15deg) contrast(1.25) sepia(0.2)' :
              filtroDaltonismo === 'tritanopia' ? 'hue-rotate(180deg) contrast(1.1)' : 'none'
          }}
        />
      )}

      {/* 3. Camadas da Máscara de Leitura */}
      {mascaraLeitura && (
        <>
          <div 
            className="fixed left-0 right-0 top-0 bg-black/80 z-9999 pointer-events-none transition-all duration-75"
            style={{ height: `${Math.max(0, mouseY - 50)}px` }}
          />
          <div 
            className="fixed left-0 right-0 bottom-0 bg-black/80 z-9999 pointer-events-none transition-all duration-75"
            style={{ top: `${mouseY + 50}px` }}
          />
        </>
      )}

      {children}
    </div>
  );
}