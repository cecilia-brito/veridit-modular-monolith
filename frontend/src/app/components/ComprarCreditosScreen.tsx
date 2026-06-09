import { useState } from 'react';
import { ArrowLeft, CreditCard, Copy, Check } from 'lucide-react';
import { api } from '../../services/api'; // O nosso serviço Axios configurado com o interceptador JWT

interface ComprarCreditosScreenProps {
  onNavigate: (screen: string) => void;
}

export function ComprarCreditosScreen({ onNavigate }: ComprarCreditosScreenProps) {
  const [pacote, setPacote] = useState('Básico');
  const [metodoPagamento, setMetodoPagamento] = useState('Pix');
  const [telefone, setTelefone] = useState('');
  const [cep, setCEP] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const [endereco, setEndereco] = useState('');
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');

  // ESTADOS DE INTEGRAÇÃO DE API
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [paymentResult, setPaymentResult] = useState<{ transactionId: string; payload: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const pacotes = {
    'Básico': 49.90,
    'Médio': 99.90,
    'Premium': 199.90
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setPaymentResult(null);

    try {
      // Dispara os dados recolhidos para a rota protegida do Backend
      const response = await api.post('/credits/buy', {
        pacote,
        metodoPagamento,
        telefone,
        cep,
        cidade,
        estado,
        endereco,
        numero,
        complemento,
        bairro
      });

      // Guarda o resultado (ID da transação e o payload/link de pagamento)
      setPaymentResult({
        transactionId: response.data.transactionId,
        payload: response.data.paymentPayload
      });

    } catch (err: any) {
      console.error(err);
      setErro('Falha ao processar o pedido. Por favor, verifica os dados de faturamento.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToken = () => {
    if (paymentResult) {
      navigator.clipboard.writeText(paymentResult.payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => onNavigate('listagem')}
          className="flex items-center gap-2 text-primary hover:opacity-80 mb-6 transition-all"
          disabled={loading}
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

        {erro && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-lg mb-6">
            {erro}
          </div>
        )}

        {/* FEEDBACK VISUAL DE SUCESSO: EXIBIÇÃO DO PAGAMENTO GERADO */}
        {paymentResult && (
          <div className="bg-card border-2 border-success rounded-lg p-6 mb-8 shadow-sm">
            <h3 className="text-success flex items-center gap-2 mb-2 font-semibold">
              ✓ Pedido # {paymentResult.transactionId.substring(0, 8)} Gerado com Sucesso!
            </h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Um e-mail de confirmação foi enviado para a sua conta através de um processo em background.
            </p>
            
            {metodoPagamento === 'Pix' ? (
              <div>
                <label className="block text-foreground mb-2 text-sm font-medium">Copia e Cola do PIX:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    readOnly
                    value={paymentResult.payload}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-sm font-mono text-muted-foreground"
                  />
                  <button
                    onClick={handleCopyToken}
                    type="button"
                    className="bg-primary text-primary-foreground p-2 rounded-lg hover:opacity-90 flex items-center justify-center min-w-10"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p className="text-foreground mb-3 text-sm">Clique no botão abaixo para concluir o pagamento no Mercado Pago:</p>
                <a
                  href={paymentResult.payload}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:opacity-90 text-sm"
                >
                  Ir para o Checkout do Mercado Pago
                </a>
              </div>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {Object.entries(pacotes).map(([nome, valor]) => (
            <div
              key={nome}
              onClick={() => !loading && setPacote(nome)}
              className={`bg-card border-2 rounded-lg p-6 cursor-pointer transition-all ${
                pacote === nome
                  ? 'border-primary shadow-md'
                  : 'border-border hover:border-primary/50'
              } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
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
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-foreground mb-2">CEP</label>
                <input
                  type="text"
                  value={cep}
                  onChange={(e) => setCEP(e.target.value)}
                  placeholder="00000-000"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
                  required
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                  disabled={loading}
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
                disabled={loading}
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
                    disabled={loading}
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
                    disabled={loading}
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
              disabled={loading}
              className="w-full bg-primary text-primary-foreground py-3 px-4 rounded-lg hover:opacity-90 transition-all disabled:opacity-50 font-medium"
            >
              {loading ? 'A processar pedido...' : 'Confirmar Pagamento e Gerar Código'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}