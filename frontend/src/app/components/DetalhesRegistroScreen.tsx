import {
  Shield,
  FileText,
  Package,
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Link as LinkIcon,
  HardDrive,
  Film,
} from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import moment from "moment/min/moment-with-locales";

interface DetalhesRegistroScreenProps {
  onNavigate: (screen: string) => void;
}

interface Registro {
  id: string;
  titulo: string;
  siteUrl: string;
  status: string;
  dataInicio: string;
  dataFim: string;
  imageCount: number;
  videoCount: number;
  detalhes: string;
}

interface DataField {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

export function DetalhesRegistroScreen({
  onNavigate,
}: DetalhesRegistroScreenProps) {
  const handleDownloadPDF = () => {
    alert("Gerando relatório PDF com certificado de autenticidade...");
  };

  const handleDownloadZIP = () => {
    alert("Preparando arquivo ZIP com todas as evidências...");
  };

  const [registro, setRegistro] = useState<Registro>();
  const [tipoMidias, setTiposMidias] = useState<string>("");
  const [duracao, setDuracao] = useState<moment.Duration>();

  useEffect(() => {}, [registro]);

  useEffect(() => {
    const fetchRegistros = async () => {
      const token = localStorage.getItem("@Veridit:token");
      const id = localStorage.getItem("@Veridit:record_id");
      if (!token) {
        onNavigate("login");
        return;
      }

      api
        .get(`/audit/records/details/${id}`)
        .then((response) => {
          const resData = response.data;

          const momentInicio = moment(resData.startTime);
          const momentFim = moment(resData.endTime);
          setDuracao(
            moment.duration(momentFim.diff(momentInicio), "milliseconds"),
          );

          const midiasCapturadas = [];
          if (resData?.imageCount)
            midiasCapturadas.push(`${resData.imageCount} imagens`);

          if (resData?.videoCount)
            midiasCapturadas.push(`${resData.videoCount} vídeos`);

          setTiposMidias(midiasCapturadas.join("; "));

          setRegistro({
            id: resData.id,
            titulo: resData.title,
            siteUrl: resData.siteUrl,
            status: resData.status,
            dataInicio: momentInicio.format("DD/MM/YYYY H:m:s"),
            dataFim: momentFim.format("DD/MM/YYYY H:m:s"),
            imageCount: resData.imageCount,
            videoCount: resData.videoCount,
            detalhes: resData.details,
          });
        })
        .catch((err: any) => {
          onNavigate("listagem");
          console.error(err);
        });
    };

    fetchRegistros();
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header Principal */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Botão Voltar */}
        <button
          onClick={() => onNavigate("listagem")}
          className="flex items-center gap-2 text-primary hover:opacity-80 mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar para Listagem
        </button>

        {/* Título da Página */}
        <div className="mb-8">
          <h2 className="text-foreground mb-2">Detalhes da Captura</h2>
          <p className="text-muted-foreground">
            Visualize as evidências e exporte os laudos
          </p>
        </div>

        {/* Botões de Ação Principais - Topo */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 bg-primary text-primary-foreground py-3 px-6 rounded-lg hover:opacity-90 transition-all"
          >
            <FileText className="w-5 h-5" />
            Baixar Relatório (PDF)
          </button>
          <button
            onClick={handleDownloadZIP}
            className="flex items-center gap-2 bg-secondary text-foreground border border-border py-3 px-6 rounded-lg hover:bg-accent transition-all"
          >
            <Package className="w-5 h-5" />
            Baixar Arquivos e Mídias (ZIP)
          </button>
        </div>

        {/* Grid de Dados - 2 Colunas */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Informações do Registro */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h3 className="text-foreground mb-6 pb-3 border-b border-border">
              Informações do Registro
            </h3>
            <div className="space-y-5">
              <DataFieldDisplay
                label="ID gerado pelo sistema"
                value={registro?.id ?? ""}
                icon={<Shield className="w-4 h-4 text-primary" />}
              />
              <DataFieldDisplay
                label="Título"
                value={registro?.titulo ?? ""}
                icon={<FileText className="w-4 h-4 text-primary" />}
              />
              <DataFieldDisplay
                label="Data/hora início"
                value={registro?.dataInicio ?? ""}
                icon={<Calendar className="w-4 h-4 text-primary" />}
              />
              <DataFieldDisplay
                label="Data/hora fim"
                value={registro?.dataFim ?? ""}
                icon={<Calendar className="w-4 h-4 text-primary" />}
              />
              <DataFieldDisplay
                label="Duração"
                value={duracao?.locale("pt").humanize() ?? ""}
                icon={<Clock className="w-4 h-4 text-primary" />}
              />
            </div>
          </div>

          {/* Dados do Responsável */}
          <div className="bg-card rounded-lg shadow-sm border border-border p-6">
            <h3 className="text-foreground mb-6 pb-3 border-b border-border">
              Dados do Responsável
            </h3>
            <div className="space-y-5">
              <DataFieldDisplay
                label="Usuário"
                value="João Silva (Advogado)"
                icon={<User className="w-4 h-4 text-primary" />}
              />
              <DataFieldDisplay
                label="CPF"
                value="111.222.333-44"
                icon={<User className="w-4 h-4 text-primary" />}
              />
            </div>
          </div>
        </div>

        {/* Metadados da Evidência - Full Width */}
        <div className="bg-card rounded-lg shadow-sm border border-border p-6 mb-6">
          <h3 className="text-foreground mb-6 pb-3 border-b border-border">
            Metadados da Evidência
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-5">
              <DataFieldDisplay
                label="URL do site navegado"
                value={registro?.siteUrl ?? ""}
                icon={<LinkIcon className="w-4 h-4 text-primary" />}
              />
              <DataFieldDisplay
                label="Tipos de dados registrados"
                value={tipoMidias ?? ""}
                icon={<Film className="w-4 h-4 text-primary" />}
              />
              <DataFieldDisplay
                label="Informações dos dados"
                value={registro?.detalhes ?? ""}
                icon={<Film className="w-4 h-4 text-primary" />}
              />
            </div>
            <div className="space-y-5">
              <DataFieldDisplay
                label="Nome do arquivo gerado"
                value="evidencia_VRD-98273.mp4"
                icon={<FileText className="w-4 h-4 text-primary" />}
              />
              <DataFieldDisplay
                label="Tamanho do arquivo"
                value="145 MB"
                icon={<HardDrive className="w-4 h-4 text-primary" />}
              />
            </div>
          </div>
        </div>

        {/* Badge de Verificação */}
        <div className="bg-success/10 border border-success/20 rounded-lg p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-success rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-success-foreground" />
            </div>
            <div>
              <h4 className="text-foreground mb-2">Evidência Autenticada</h4>
              <p className="text-muted-foreground">
                Este registro foi capturado e armazenado com criptografia de
                ponta a ponta. Todos os metadados foram validados e assinados
                digitalmente com certificado SHA-256.
              </p>
              <div className="mt-4 grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Hash SHA-256:</span>
                  <p className="text-foreground font-mono mt-1">
                    a3f5c9d8e2b1...7f4e8d9c
                  </p>
                </div>
                <div>
                  <span className="text-muted-foreground">
                    Timestamp Blockchain:
                  </span>
                  <p className="text-foreground font-mono mt-1">
                    2026-04-20T14:45:12.000Z
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nota Legal */}
        <div className="bg-secondary border border-border rounded-lg p-6">
          <h4 className="text-foreground mb-3">Validade Jurídica</h4>
          <p className="text-muted-foreground mb-4">
            Este documento possui validade jurídica conforme a Lei nº
            13.709/2018 (LGPD) e pode ser utilizado como prova digital em
            processos judiciais e administrativos. A autenticidade dos dados
            pode ser verificada através do certificado digital incluído no
            relatório PDF.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>REQ 14 e REQ 15 - Requisitos de conformidade atendidos</span>
          </div>
        </div>
      </main>
    </div>
  );
}

interface DataFieldDisplayProps {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

function DataFieldDisplay({ label, value, icon }: DataFieldDisplayProps) {
  return (
    <div className="flex gap-3">
      {icon && <div className="flex-shrink-0 mt-1">{icon}</div>}
      <div className="flex-1 min-w-0">
        <p className="text-muted-foreground mb-1">{label}</p>
        <p className="text-foreground break-words">{value}</p>
      </div>
    </div>
  );
}
