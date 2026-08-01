import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrototipoA from './pages/PrototipoA';
import PrototipoB from './pages/PrototipoB';

// Cria o cliente que vai gerenciar o cache das nossas requisições
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita recarregar a API toda vez que você troca de aba
      staleTime: 1000 * 60 * 5, // Mantém os produtos em cache por 5 minutos
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/a" element={<PrototipoA />} />
          <Route path="/b" element={<PrototipoB />} />
          <Route path="*" element={<Navigate to="/a" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}