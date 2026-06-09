import { useState } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { CadastroScreen } from './components/CadastroScreen';
import { ComprarCreditosScreen } from './components/ComprarCreditosScreen';
import { IniciarRegistroScreen } from './components/IniciarRegistroScreen';
import { CapturaScreen } from './components/CapturaScreen';
import { ListagemScreen } from './components/ListagemScreen';
import { DetalhesRegistroScreen } from './components/DetalhesRegistroScreen';

type Screen = 'login' | 'cadastro' | 'comprar-creditos' | 'iniciar-registro' | 'captura' | 'listagem' | 'detalhes';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  return (
    <div className="size-full">
      {currentScreen === 'login' && <LoginScreen onNavigate={handleNavigate} />}
      {currentScreen === 'cadastro' && <CadastroScreen onNavigate={handleNavigate} />}
      {currentScreen === 'comprar-creditos' && <ComprarCreditosScreen onNavigate={handleNavigate} />}
      {currentScreen === 'iniciar-registro' && <IniciarRegistroScreen onNavigate={handleNavigate} />}
      {currentScreen === 'captura' && <CapturaScreen onNavigate={handleNavigate} />}
      {currentScreen === 'listagem' && <ListagemScreen onNavigate={handleNavigate} />}
      {currentScreen === 'detalhes' && <DetalhesRegistroScreen onNavigate={handleNavigate} />}
    </div>
  );
}
