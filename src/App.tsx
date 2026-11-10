import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AudioProvider, useSound } from './context/AudioContext';
import { SiteHeader } from './components/layout/SiteHeader';
import { HomePage } from './pages/HomePage';
import { ProtectionPage } from './pages/ProtectionPage';
import { CryoPage } from './pages/CryoPage';
import { ResultPage } from './pages/ResultPage';

function Router() {
  const { pathname } = useLocation();
  const sound = useSound();
  useEffect(() => { window.scrollTo(0, 0); if (pathname !== '/resultado') sound.stop(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps
  return <><SiteHeader/><Routes><Route path="/" element={<HomePage/>}/><Route path="/protecao" element={<ProtectionPage/>}/><Route path="/descongelamento" element={<CryoPage/>}/><Route path="/resultado" element={<ResultPage/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></>;
}
export function App() { return <AudioProvider><Router/></AudioProvider>; }
