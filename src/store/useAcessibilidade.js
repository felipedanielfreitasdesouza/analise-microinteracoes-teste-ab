import { create } from 'zustand';

export const useAcessibilidade = create((set) => ({
  // Básico
  reduzirAnimacoes: false,
  toggleReduzirAnimacoes: () => set((state) => ({ reduzirAnimacoes: !state.reduzirAnimacoes })),
  
  // 1. Cognição e Foco
  mascaraLeitura: false,
  ocultarImagens: false,
  toggleMascaraLeitura: () => set((state) => ({ mascaraLeitura: !state.mascaraLeitura })),
  toggleOcultarImagens: () => set((state) => ({ ocultarImagens: !state.ocultarImagens })),

  // 2. Visual
  filtroDaltonismo: 'nenhum', // 'nenhum', 'protanopia', 'deuteranopia', 'tritanopia'
  destacarBotoes: false,
  cursorAmpliado: false,
  setFiltroDaltonismo: (filtro) => set({ filtroDaltonismo: filtro }),
  toggleDestacarBotoes: () => set((state) => ({ destacarBotoes: !state.destacarBotoes })),
  toggleCursorAmpliado: () => set((state) => ({ cursorAmpliado: !state.cursorAmpliado })),

  // 3. Motora
  areasCliqueAmpliadas: false,
  toggleAreasCliqueAmpliadas: () => set((state) => ({ areasCliqueAmpliadas: !state.areasCliqueAmpliadas })),

  // 4. Leitura
  fonteDislexia: false,
  leituraVoz: false,
  toggleFonteDislexia: () => set((state) => ({ fonteDislexia: !state.fonteDislexia })),
  toggleLeituraVoz: () => set((state) => ({ leituraVoz: !state.leituraVoz })),
}));