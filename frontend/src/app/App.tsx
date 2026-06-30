import { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { CadastroScreen } from './components/CadastroScreen';
import { ComprarCreditosScreen } from './components/ComprarCreditosScreen';
import { IniciarRegistroScreen } from './components/IniciarRegistroScreen';
import { CapturaScreen } from './components/CapturaScreen';
import { ListagemScreen } from './components/ListagemScreen';
import { DetalhesRegistroScreen } from './components/DetalhesRegistroScreen';
import { ResetPasswordScreen } from './components/ResetPasswordScreen';

type Screen = 'login' | 'cadastro' | 'comprar-creditos' | 'iniciar-registro' | 'captura' | 'listagem' | 'detalhes' | 'reset-password';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [resetToken, setResetToken] = useState('');
  const [resetEmail, setResetEmail] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const email = params.get('email');
    
    if (window.location.pathname === '/reset-password' || token) {
      if (token) setResetToken(token);
      if (email) setResetEmail(email);
      setCurrentScreen('reset-password');
      // Clean up the URL for a better user experience, without reloading
      window.history.replaceState({}, '', '/reset-password');
    }
  }, []);

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
    if (screen === 'login') {
      window.history.replaceState({}, '', '/');
    }
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
      {currentScreen === 'reset-password' && <ResetPasswordScreen onNavigate={handleNavigate} token={resetToken} email={resetEmail} />}
    </div>
  );
}
