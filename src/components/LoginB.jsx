import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../store/useAuth';
import { Loader2 } from 'lucide-react';
import { trackExperimentEvent, trackTaskCompleted, trackTaskError, trackTaskStarted } from '../services/analytics';

export default function LoginB({ aoLogar }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login, estaCarregando, erro } = useAuth();

  useEffect(() => {
    trackTaskStarted('login', 'B');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    trackExperimentEvent('login_submitted', 'B');
    const sucesso = await login(email, senha);

    trackExperimentEvent(sucesso ? 'login_succeeded' : 'login_failed', 'B');
    if (sucesso) {
      trackTaskCompleted('login', 'B');
    } else {
      trackTaskError('login', 'B', { reason: 'invalid_credentials' });
    }

    if (sucesso) {
      aoLogar();
    }
  };

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white border-2 border-slate-400 p-8 w-full max-w-md rounded-none shadow-none"
      >
        <h2 className="text-xl font-black text-slate-900 border-b-2 border-slate-900 pb-2 mb-6 uppercase tracking-tight">
          Autenticação do Sistema
        </h2>

        <AnimatePresence initial={false}>
          {erro && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 text-xs font-bold p-3 rounded-none mb-4 overflow-hidden"
            >
              {erro}
            </motion.div>
          )}
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Endereço de E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ex: tcc@teste.com"
              data-clarity-mask
              className="w-full p-2 bg-white border border-slate-400 rounded-none text-sm focus:outline-none focus:border-slate-900"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">
              Senha de Acesso
            </label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••"
              data-clarity-mask
              className="w-full p-2 bg-white border border-slate-400 rounded-none text-sm focus:outline-none focus:border-slate-900"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={estaCarregando}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2.5 rounded-none text-xs uppercase tracking-wider cursor-pointer disabled:bg-slate-400 flex items-center justify-center gap-2"
          >
            {estaCarregando ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                Aguardando Resposta...
              </>
            ) : (
              'Entrar no Sistema'
            )}
          </motion.button>
        </form>

        <p className="text-[11px] text-slate-500 mt-6 text-center font-mono">
          Dica de teste: tcc@teste.com | 123456
        </p>
      </motion.div>
    </div>
  );
}
