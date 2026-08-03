import { create } from 'zustand';

export const useAuth = create((set) => ({
  usuario: null,
  estaCarregando: false,
  erro: null,

  // Simulação de Login com delay de rede
  login: async (email, senha) => {
    set({ estaCarregando: true, erro: null });
    
    // Simula a espera do servidor por 1.5 segundos
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (email === 'tcc@teste.com' && senha === '123456') {
      set({ usuario: { email, nome: 'Pesquisador UX' }, estaCarregando: false });
      return true;
    } else {
      set({ erro: 'Credenciais inválidas. Use tcc@teste.com e 123456.', estaCarregando: false });
      return false;
    }
  },

  // Simulação de Cadastro
  cadastrar: async (nome, email, senha) => {
    set({ estaCarregando: true, erro: null });
    await new Promise((resolve) => setTimeout(resolve, 1550));
    
    set({ usuario: { email, nome }, estaCarregando: false });
    return true;
  },

  logout: () => set({ usuario: null, erro: null }),
}));