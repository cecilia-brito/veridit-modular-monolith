import { useState } from 'react';
import { Shield } from 'lucide-react';
import { api } from '../../services/api'; 

interface ResetPasswordScreenProps {
  onNavigate: (screen: string) => void;
  token: string;
  email: string;
}

export function ResetPasswordScreen({ onNavigate, token, email }: ResetPasswordScreenProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    
    try {
      const response = await api.post('/users/reset-password', {
        email,
        token,
        newPassword: password,
      });

      setSuccess('Senha alterada com sucesso! Você já pode entrar com a nova senha.');
      
      // Navigate to login after 3 seconds
      setTimeout(() => {
        onNavigate('login');
      }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Token inválido ou erro ao redefinir a senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-foreground mb-2">Redefinir Senha</h1>
          <p className="text-muted-foreground">Crie uma nova senha para sua conta</p>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
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
                disabled
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg opacity-70 cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-foreground mb-2">
                Nova Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua nova senha segura"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
                minLength={8}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !!success}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
            >
              {loading ? 'Redefinindo...' : 'Salvar nova senha'}
            </button>
          </form>

          <div className="mt-6 space-y-3 text-center">
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-primary hover:underline block w-full"
            >
              Voltar ao login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
