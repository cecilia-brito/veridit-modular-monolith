import { useState } from 'react';
import { Shield } from 'lucide-react';

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigate('listagem');
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-foreground mb-2">Veridit</h1>
          <p className="text-muted-foreground">Sistema de Captura de Provas Digitais</p>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
          <h2 className="text-foreground mb-6">Acesse sua conta</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-foreground mb-2">
                E-mail
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail corporativo"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-foreground mb-2">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha segura"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:opacity-90 transition-all"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 space-y-3 text-center">
            <button
              onClick={() => {}}
              className="text-primary hover:underline block w-full"
            >
              Esqueci minha senha
            </button>
            <button
              onClick={() => onNavigate('cadastro')}
              className="text-muted-foreground hover:text-foreground transition-colors block w-full"
            >
              Não tem uma conta? <span className="text-primary">Cadastre-se</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
