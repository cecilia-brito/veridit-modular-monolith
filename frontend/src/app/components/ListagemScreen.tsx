import { useState, useEffect } from "react";
import { Shield, Plus, Download, FileText, Package } from "lucide-react";
import { api } from "../../services/api";
import moment from 'moment';
interface ListagemScreenProps {
  onNavigate: (screen: string) => void;
}

export interface Registro {
  id: string;
  titulo: string;
  dataInicio: string;
  dataFim: string;
  status: "Concluído" | "Em Andamento" | "Pausado";
}

export function ListagemScreen({ onNavigate }: ListagemScreenProps) {
  const [registros, setRegistros] = useState<Registro[]>([]);
  const [error, setError] = useState(""); // Estado de erro para a listagem

  useEffect(() => {
    const fetchRegistros = async () => {
      try {
        setError("");
        const token = localStorage.getItem("@Veridit:token");
        const id = localStorage.getItem("@Veridit:id");
        if (!token) {
          onNavigate("login");
          return;
        }

        const response = await api.get(`/audit/records/${id}`);

        setRegistros(
          response.data.map((resData: any) => ({
            id: resData.id,
            titulo: resData.title,
            siteUrl: resData.siteUrl,
            status: resData.status,
            dataInicio: moment(resData.startTime).format("DD/MM/YYYY H:m:s"),
            dataFim: moment(resData.endTime).format("DD/MM/YYYY H:m:s"),
            imageCount: resData.imageCount,
            videoCount: resData.videoCount,
            detalhes: resData.details,
          })),
        );
      } catch (err: any) {
        setError(
          "Não foi possível carregar o histórico de sincronização ou sua sessão expirou.",
        );
        console.error(err);
      }
    };

    fetchRegistros();
  }, [onNavigate]);

  const handleLogout = () => {
    localStorage.removeItem("@Veridit:token");
    onNavigate("login");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "bg-success/10 text-success border-success/20";
      case "FAILED":
        return "bg-warning/10 text-warning border-warning/20";
      case "PENDING":
        return "bg-muted text-muted-foreground border-border";
      default:
        return "bg-muted text-muted-foreground border-border";
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
                <p className="text-muted-foreground">
                  Sistema de Captura de Provas Digitais
                </p>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <button
                onClick={() => onNavigate("comprar-creditos")}
                className="text-foreground hover:text-primary transition-colors"
              >
                Comprar Créditos
              </button>
              <button
                onClick={handleLogout}
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
            onClick={() => onNavigate("iniciar-registro")}
            className="flex items-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:opacity-90 transition-all"
          >
            <Plus className="w-5 h-5" />
            Novo Registro
          </button>
        </div>

        {/* Caixa de erro renderizada no topo do corpo principal */}
        {error && (
          <div className="mb-6 p-4 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
            {error}
          </div>
        )}

        <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary border-b border-border">
                  <th className="px-6 py-4 text-left text-foreground">
                    Título
                  </th>
                  <th className="px-6 py-4 text-left text-foreground">
                    Data Início
                  </th>
                  <th className="px-6 py-4 text-left text-foreground">
                    Data Fim
                  </th>
                  <th className="px-6 py-4 text-left text-foreground">
                    Status
                  </th>
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
                      <span className="text-muted-foreground">
                        {registro.dataInicio}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-muted-foreground">
                        {registro.dataFim}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full border ${getStatusColor(
                          registro.status,
                        )}`}
                      >
                        {registro.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            localStorage.setItem(
                              "@Veridit:record_id",
                              registro.id,
                            );
                            onNavigate("detalhes");
                          }}
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Ver Detalhes"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                        <button
                          className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all"
                          title="Baixar Relatório (PDF)"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
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

          {registros.length === 0 && !error && (
            <div className="text-center py-12">
              <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-4">
                Você ainda não possui registros
              </p>
              <button
                onClick={() => onNavigate("iniciar-registro")}
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
