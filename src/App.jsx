import { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PrototipoA from './pages/PrototipoA';
import PrototipoB from './pages/PrototipoB';
import { trackClarityTag, trackExperimentEvent } from './services/analytics';

// Cria o cliente que vai gerenciar o cache das nossas requisições
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita recarregar a API toda vez que você troca de aba
      staleTime: 1000 * 60 * 5, // Mantém os produtos em cache por 5 minutos
    },
  },
});

function AnalyticsRouteTracker() {
  const location = useLocation();
  const lastTrackedPath = useRef(null);

  useEffect(() => {
    const prototype = location.pathname === '/b' ? 'B' : location.pathname === '/a' ? 'A' : 'unknown';
    const previousPath = lastTrackedPath.current;

    // O StrictMode pode executar efeitos duas vezes em desenvolvimento.
    // Evita duplicar o evento quando a rota ainda não mudou.
    if (previousPath === location.pathname) {
      return;
    }

    trackExperimentEvent('prototype_view', prototype, { path: location.pathname });
    trackClarityTag('prototype', prototype);

    lastTrackedPath.current = location.pathname;
  }, [location.pathname]);

  return null;
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AnalyticsRouteTracker />
        <Routes>
          <Route path="*" element={<Navigate to="/a" replace />} />
          <Route path="/a" element={<PrototipoA />} />
          <Route path="/b" element={<PrototipoB />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
