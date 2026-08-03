import { useState } from 'react';
import { useAuth } from '../store/useAuth';

export default function LoginA({ aoLogar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login, estaCarregando, erro } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await login(email, senha);
    if (sucesso) aoLogar();
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 font-sans">
      <div className="bg-white border-2 border-slate-400 p-8 w-full max-w-md rounded-none shadow-none">
        <h2 className="text-xl font-black text-slate-900 border-b-2 border-slate-900 pb-2 mb-6 uppercase tracking-tight">
          Autenticação do Sistema (A)
        </h2>

        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 text-xs font-bold p-3 rounded-none mb-4">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Endereço de E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: tcc@teste.com"
              className="w-full p-2 bg-white border border-slate-400 rounded-none text-sm focus:outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Senha de Acesso</label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••"
              className="w-full p-2 bg-white border border-slate-400 rounded-none text-sm focus:outline-none focus:border-slate-900"
            />
          </div>

          <button
            type="submit"
            disabled={estaCarregando}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-none text-xs uppercase tracking-wider cursor-pointer disabled:bg-slate-400"
          >
            {estaCarregando ? 'Aguardando Resposta...' : 'Entrar no Sistema'}
          </button>
        </form>

        <p className="text-[11px] text-slate-500 mt-6 text-center font-mono">
          Dica de teste: tcc@teste.com | 123456
        </p>
      </div>
    </div>
  );
}