import { useState } from 'react';
import { Shield, ArrowLeft, CreditCard } from 'lucide-react';

interface ComprarCreditosScreenProps {
  onNavigate: (screen: string) => void;
}

export function ComprarCreditosScreen({ onNavigate }: ComprarCreditosScreenProps) {
  const [pacote, setPacote] = useState('Básico');
  const [metodoPagamento, setMetodoPagamento] = useState('Pix');
  const [telefone, setTelefone] = useState('');
  const [cep, setCep] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');

  const pacotes = {
    'Básico': 49.90,
    'Médio': 99.90,
    'Premium': 199.90
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('QR Code gerado com sucesso!');
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('listagem')}
          className="flex items-center gap-2 text-primary hover:opacity-80 mb-6 transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-xl mb-4">
            <CreditCard className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-foreground mb-2">Comprar Créditos</h1>
          <p className="text-muted-foreground">Selecione um pacote e finalize sua compra</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {Object.entries(pacotes).map(([nome, valor]) => (
            <div
              key={nome}
              onClick={() => setPacote(nome)}
              className={`bg-card border-2 rounded-lg p-6 cursor-pointer transition-all ${
                pacote === nome
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <h3 className="text-foreground mb-2">{nome}</h3>
              <p className="text-foreground mb-4">
                <span className="text-3xl">R$ {valor.toFixed(2)}</span>
              </p>
              <p className="text-muted-foreground">
                {nome === 'Básico' && '10 registros'}
                {nome === 'Médio' && '25 registros'}
                {nome === 'Premium' && '100 registros'}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-lg shadow-sm border border-border p-8">
          <h2 className="text-foreground mb-6">Dados de Faturamento</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-foreground mb-2">Telefone</label>
                <input
                  type="tel"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(00) 00000-0000"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">CEP</label>
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  placeholder="00000-000"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Cidade</label>
                <input
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  placeholder="Sua cidade"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Estado</label>
                <input
                  type="text"
                  value={estado}
                  onChange={(e) => setEstado(e.target.value)}
                  placeholder="UF"
                  maxLength={2}
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-foreground mb-2">Endereço</label>
                <input
                  type="text"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  placeholder="Rua, Avenida..."
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Número</label>
                <input
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">Complemento</label>
                <input
                  type="text"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  placeholder="Apto, Sala..."
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-foreground mb-2">Bairro</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                placeholder="Seu bairro"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="border-t border-border pt-6">
              <h3 className="text-foreground mb-4">Método de Pagamento</h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="pagamento"
                    value="Pix"
                    checked={metodoPagamento === 'Pix'}
                    onChange={(e) => setMetodoPagamento(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">Pix</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="pagamento"
                    value="Mercado Pago"
                    checked={metodoPagamento === 'Mercado Pago'}
                    onChange={(e) => setMetodoPagamento(e.target.value)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-foreground">Mercado Pago</span>
                </label>
              </div>
            </div>

            <div className="bg-secondary rounded-lg p-6">
              <h3 className="text-foreground mb-2">Resumo do Pedido</h3>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Pacote {pacote}</span>
                <span className="text-foreground">R$ {pacotes[pacote as keyof typeof pacotes].toFixed(2)}</span>
              </div>
              <div className="border-t border-border mt-3 pt-3 flex justify-between items-center">
                <span className="text-foreground">Total a pagar</span>
                <span className="text-foreground">R$ {pacotes[pacote as keyof typeof pacotes].toFixed(2)}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:opacity-90 transition-all"
            >
              Confirmar Pagamento e Gerar QR Code
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
