import { useState } from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import { api } from '../../services/api';

interface IniciarRegistroScreenProps {
  onNavigate: (screen: string) => void;
}

export function IniciarRegistroScreen({ onNavigate }: IniciarRegistroScreenProps) {
  const [url, setUrl] = useState('');
  const [titulo, setTitulo] = useState('');
  const [tipoCaptura, setTipoCaptura] = useState('Captura de Tela (Imagem)');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/captures/start', {
        titulo,
        siteUrl: url,
      });
      onNavigate('captura');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Falha ao iniciar a captura.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => onNavigate('listagem')}
          className="flex items-center gap-2 text-primary hover:opacity-80 mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-foreground mb-2">Iniciar Novo Registro</h1>
          <p className="text-muted-foreground">Configure os parâmetros da captura</p>
        </div>

        {error && (
          <div className="mb-6 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg text-center">
            {error}
          </div>
        )}

        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="url" className="block text-foreground mb-2">
                URL do site a ser auditado
              </label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
              <p className="text-muted-foreground mt-2">
                Insira a URL completa do website que deseja documentar
              </p>
            </div>

            <div>
              <label htmlFor="titulo" className="block text-foreground mb-2">
                Título do Registro
              </label>
              <input
                id="titulo"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Ex: Fraude site XYZ"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
              <p className="text-muted-foreground mt-2">
                Dê um nome descritivo para identificar este registro
              </p>
            </div>

            <div>
              <label className="block text-foreground mb-3">Tipo de Captura</label>
              <div className="space-y-3">
                <label className="flex items-start gap-3 cursor-pointer p-4 bg-input-background border border-border rounded-lg hover:border-primary transition-all">
                  <input
                    type="radio"
                    name="tipo"
                    value="Captura de Tela (Imagem)"
                    checked={tipoCaptura === 'Captura de Tela (Imagem)'}
                    onChange={(e) => setTipoCaptura(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary mt-1"
                  />
                  <div>
                    <span className="text-foreground block">Captura de Tela (Imagem)</span>
                    <span className="text-muted-foreground">
                      Gera uma imagem estática do site no momento da captura
                    </span>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer p-4 bg-input-background border border-border rounded-lg hover:border-primary transition-all">
                  <input
                    type="radio"
                    name="tipo"
                    value="Gravação de Navegação (Vídeo)"
                    checked={tipoCaptura === 'Gravação de Navegação (Vídeo)'}
                    onChange={(e) => setTipoCaptura(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary mt-1"
                  />
                  <div>
                    <span className="text-foreground block">Gravação de Navegação (Vídeo)</span>
                    <span className="text-muted-foreground">
                      Registra em vídeo toda a interação com o site
                    </span>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => onNavigate('listagem')}
                className="flex-1 bg-secondary text-foreground border border-border py-3 px-4 rounded-lg hover:bg-accent transition-all"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50"
              >
                {loading ? 'Iniciando...' : 'Iniciar Captura'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
