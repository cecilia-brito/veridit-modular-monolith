type IconProps = { className?: string };

function Shield({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </svg>
  );
}

function Plus({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function Download({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function FileText({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8M8 9h1" />
    </svg>
  );
}

function Package({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16.5 9.4 7.5 4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
      <path d="M3.3 7 12 12l8.7-5" />
      <path d="M12 22V12" />
    </svg>
  );
}

interface ListagemScreenProps {
  onNavigate: (screen: string) => void;
}

interface Registro {
  id: number;
  titulo: string;
  dataInicio: string;
  dataFim: string;
  status: 'Concluído' | 'Em Andamento' | 'Pausado';
}

export function ListagemScreen({ onNavigate }: ListagemScreenProps) {
  const registros: Registro[] = [
    {
      id: 1,
      titulo: 'Fraude site XYZ',
      dataInicio: '07/05/2026 10:30',
      dataFim: '07/05/2026 10:45',
      status: 'Concluído',
    },
    {
      id: 2,
      titulo: 'Análise Portal ABC',
      dataInicio: '06/05/2026 14:20',
      dataFim: '06/05/2026 14:35',
      status: 'Concluído',
    },
    {
      id: 3,
      titulo: 'Auditoria E-commerce',
      dataInicio: '05/05/2026 09:15',
      dataFim: '05/05/2026 09:28',
      status: 'Concluído',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluído':
        return 'bg-success/10 text-success border-success/20';
      case 'Em Andamento':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Pausado':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-foreground">Veridit</h1>
                <p className="text-muted-foreground">Sistema de Captura de Provas Digitais</p>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <button
                onClick={() => onNavigate('comprar-creditos')}
                className="text-foreground hover:text-primary transition-colors"
              >
                Comprar Créditos
              </button>
              <button
                onClick={() => onNavigate('login')}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sair
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-foreground mb-2">Meus Registros</h2>
            <p className="text-muted-foreground">
              Gerencie todas as suas capturas de prova digital
            </p>
          </div>

          <button
            onClick={() => onNavigate('iniciar-registro')}
            className="flex items-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:opacity-90 transition-all"
          >
            <Plus className="w-5 h-5" />
            Novo Registro
          </button>
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="px-6 py-4 text-left text-foreground">Título</th>
                  <th className="px-6 py-4 text-left text-foreground">Data Início</th>
                  <th className="px-6 py-4 text-left text-foreground">Data Fim</th>
                  <th className="px-6 py-4 text-left text-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-foreground">Ações</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro) => (
                  <tr
                    key={registro.id}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-foreground">{registro.titulo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground">{registro.dataInicio}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground">{registro.dataFim}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full border ${getStatusColor(
                          registro.status
                        )}`}
                      >
                        {registro.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onNavigate('detalhes')}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Ver Detalhes"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert('Baixando relatório PDF...')}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Baixar Relatório (PDF)"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => alert('Baixando arquivos ZIP...')}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Baixar Arquivos (ZIP)"
                        >
                          <Package className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {registros.length === 0 && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Você ainda não possui registros
              </p>
              <button
                onClick={() => onNavigate('iniciar-registro')}
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground py-2 px-4 rounded-lg hover:opacity-90 transition-all"
              >
                <Plus className="w-4 h-4" />
                Criar Primeiro Registro
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
