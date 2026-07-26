import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PrototipoA from './pages/PrototipoA'
import PrototipoB from './pages/PrototipoB'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para o Protótipo A (Controle) */}
        <Route path="/a" element={<PrototipoA />} />
        
        {/* Rota para o Protótipo B (Experimental) */}
        <Route path="/b" element={<PrototipoB />} />
        
        {/* Fallback: Qualquer link diferente redireciona automaticamente para o Protótipo A */}
        <Route path="*" element={<Navigate to="/a" replace />} />
      </Routes>
    </BrowserRouter>
  )
}