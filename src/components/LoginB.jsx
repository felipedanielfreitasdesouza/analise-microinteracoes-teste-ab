import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/useAuth';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

export default function LoginB({ aoLogar, darkTheme }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login, estaCarregando, erro } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucesso = await login(email, senha);
    if (sucesso) aoLogar();
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
      darkTheme ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`w-full max-w-md p-8 rounded-3xl border shadow-xl transition-colors duration-500 ${
          darkTheme ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black bg-linear-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent tracking-wide">
            Autenticação do Sistema (B)
          </h2>
          {/*
          <p className={`text-xs mt-2 ${darkTheme ? 'text-slate-450' : 'text-slate-500'}`}>
            Experimente a fluidez no preenchimento de dados
          </p>
          */}
        </div>

        <AnimatePresence mode="whiteout">
          {erro && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium p-3 rounded-xl mb-5 flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{erro}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <Mail className={`absolute left-3.5 top-3 h-4 w-4 transition-colors duration-300 ${
              darkTheme ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-500'
            }`} />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Seu endereço de e-mail"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none border ${
                darkTheme 
                  ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 placeholder-slate-600'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="relative group">
            <Lock className={`absolute left-3.5 top-3 h-4 w-4 transition-colors duration-300 ${
              darkTheme ? 'text-slate-500 group-focus-within:text-emerald-400' : 'text-slate-400 group-focus-within:text-emerald-500'
            }`} />
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha de Acesso"
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm transition-all duration-300 focus:outline-none border ${
                darkTheme 
                  ? 'bg-slate-950 border-slate-800 text-slate-200 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/10 placeholder-slate-600'
                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-emerald-500/80 focus:ring-4 focus:ring-emerald-500/5 placeholder-slate-400'
              }`}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={estaCarregando}
            className="w-full bg-linear-to-r from-emerald-500 to-teal-500 text-slate-950 font-black py-3 rounded-xl text-sm tracking-wider cursor-pointer shadow-lg shadow-emerald-500/10 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {estaCarregando ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Processando dados...
              </>
            ) : (
              'Entrar na Plataforma'
            )}
          </motion.button>
        </form>

        <p className={`text-[10px] mt-6 text-center tracking-wide font-mono ${darkTheme ? 'text-slate-600' : 'text-slate-400'}`}>
          Acesso padrão: tcc@teste.com | 123456
        </p>
      </motion.div>
    </div>
  );
}