import { useState, useEffect } from 'react';
import { Shield, Pause, CheckCircle } from 'lucide-react';

interface CapturaScreenProps {
  onNavigate: (screen: string) => void;
}

export function CapturaScreen({ onNavigate }: CapturaScreenProps) {
  const [segundos, setSegundos] = useState(0);
  const [pausado, setPausado] = useState(false);

  useEffect(() => {
    if (!pausado) {
      const interval = setInterval(() => {
        setSegundos((s) => s + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [pausado]);

  const formatarTempo = (s: number) => {
    const horas = Math.floor(s / 3600);
    const minutos = Math.floor((s % 3600) / 60);
    const segs = s % 60;
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
  };

  const handleConcluir = () => {
    if (confirm('Deseja concluir e salvar a captura?')) {
      onNavigate('listagem');
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-foreground">Captura em Andamento</h1>
              <p className="text-muted-foreground">Fraude site XYZ</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-destructive text-destructive-foreground px-4 py-2 rounded-lg">
            <div className="w-3 h-3 bg-destructive-foreground rounded-full animate-pulse"></div>
            <span>Gravando... {formatarTempo(segundos)}</span>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden mb-6">
          <div className="aspect-video bg-muted flex items-center justify-center">
            <div className="text-center">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                Área de espelhamento do site alvo
              </p>
              <p className="text-muted-foreground mt-2">
                URL: https://exemplo.com.br
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-6">
          <div className="flex gap-4">
            <button
              onClick={() => setPausado(!pausado)}
              className="flex-1 flex items-center justify-center gap-2 bg-secondary text-foreground border border-border py-3 px-4 rounded-lg hover:bg-accent transition-all"
            >
              <Pause className="w-5 h-5" />
              {pausado ? 'Retomar Gravação' : 'Pausar Gravação'}
            </button>
            <button
              onClick={handleConcluir}
              className="flex-1 flex items-center justify-center gap-2 bg-success text-success-foreground py-3 px-4 rounded-lg hover:opacity-90 transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              Concluir e Salvar
            </button>
          </div>

          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h3 className="text-foreground mb-3">Informações da Captura</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Data Início:</span>
                <span className="text-foreground ml-2">{new Date().toLocaleString('pt-BR')}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Duração:</span>
                <span className="text-foreground ml-2">{formatarTempo(segundos)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Status:</span>
                <span className="text-foreground ml-2">{pausado ? 'Pausado' : 'Gravando'}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Tipo:</span>
                <span className="text-foreground ml-2">Vídeo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
