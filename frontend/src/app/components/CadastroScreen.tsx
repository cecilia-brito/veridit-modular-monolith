import { useState } from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import axios from 'axios';

interface CadastroScreenProps {
  onNavigate: (screen: string) => void;
}

export function CadastroScreen({ onNavigate }: CadastroScreenProps) {
  const [tipoUsuario, setTipoUsuario] = useState('Usuário Comum');
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [numeroOAB, setNumeroOAB] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 
    
    try {
      await axios.post('http://localhost:3000/users/register', {
        fullName: nomeCompleto,
        email: email,
        password: senha,
        cpf: cpf,
        role: tipoUsuario === 'Advogado' ? 'LAWYER' : 'COMMON',
        oabNumber: numeroOAB || undefined,
      });

      onNavigate('login');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erro ao realizar o cadastro. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate('login')}
          className="flex items-center gap-2 text-primary hover:opacity-80 mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para login
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-foreground mb-2">Criar Conta</h1>
          <p className="text-muted-foreground">Preencha os dados para começar</p>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
          {/* Caixa de erro integrada perfeitamente no topo do formulário */}
          {error && (
            <div className="mb-6 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="tipo" className="block text-foreground mb-2">
                Tipo de Usuário
              </label>
              <select
                id="tipo"
                value={tipoUsuario}
                onChange={(e) => setTipoUsuario(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              >
                <option value="Usuário Comum">Usuário Comum</option>
                <option value="Advogado">Advogado</option>
              </select>
            </div>

            <div>
              <label htmlFor="nome" className="block text-foreground mb-2">
                Nome Completo
              </label>
              <input
                id="nome"
                type="text"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="cpf" className="block text-foreground mb-2">
                CPF
              </label>
              <input
                id="cpf"
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                placeholder="000.000.000-00"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="email-cadastro" className="block text-foreground mb-2">
                E-mail
              </label>
              <input
                id="email-cadastro"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu.email@exemplo.com"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <label htmlFor="senha-cadastro" className="block text-foreground mb-2">
                Senha
              </label>
              <input
                id="senha-cadastro"
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Mínimo 8 caracteres"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            {tipoUsuario === 'Advogado' && (
              <div>
                <label htmlFor="oab" className="block text-foreground mb-2">
                  Número da OAB
                </label>
                <input
                  id="oab"
                  type="text"
                  value={numeroOAB}
                  onChange={(e) => setNumeroOAB(e.target.value)}
                  placeholder="Ex: 123456/SP"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required={tipoUsuario === 'Advogado'}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:opacity-90 transition-all mt-6"
            >
              Criar Conta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}