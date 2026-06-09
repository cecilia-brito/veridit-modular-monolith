import { useState } from 'react';
import { Shield } from 'lucide-react';
import { api } from '../../services/api'; // <-- MUDANÇA 1: Usando o nosso carteiro oficial

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
}

export function LoginScreen({ onNavigate }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false); // Adicionado para bloquear múltiplos cliques

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      // MUDANÇA 2: Usando api.post e apenas a rota relativa
      const response = await api.post('/users/login', {
        email,
        password,
      });

      // MUDANÇA 3: Garantindo o nome correto do token retornado pelo backend (access_token)
      localStorage.setItem('@Veridit:token', response.data.access_token);
      
      // Se o seu backend também retorna o ID, descomente a linha abaixo:
      // localStorage.setItem('@Veridit:id', response.data.userId); 
      
      onNavigate('listagem');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Credenciais inválidas. Verifique seu e-mail e senha.');
    } finally {
      setLoading(false);
    }
  };

  const handleRecoverPassword = async () => {
    setError('');
    setSuccess('');
    
    if (!email) {
      setError('Por favor, preencha o campo de e-mail acima para recuperar a senha.');
      return;
    }
    
    try {
      // MUDANÇA 4: Usando api.post e apenas a rota relativa
      const response = await api.post('/users/recover-password', { email });
      setSuccess(response.data.message || 'Instruções de recuperação enviadas com sucesso.');
    } catch (err: any) {
      setError('Erro ao tentar processar a recuperação de senha.');
    }
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

          {error && (
            <div className="mb-5 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-5 p-4 text-sm text-success bg-success/10 border border-success/20 rounded-lg">
              {success}
            </div>
          )}

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
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 space-y-3 text-center">
            <button
              type="button"
              onClick={handleRecoverPassword}
              className="text-primary hover:underline block w-full"
            >
              Esqueci minha senha
            </button>
            <button
              type="button"
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