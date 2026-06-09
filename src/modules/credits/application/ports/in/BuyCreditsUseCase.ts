export interface BuyCreditsCommand {
  userId: string;
  userEmail: string;
  pacote: string;
  metodoPagamento: 'Pix' | 'Mercado Pago';
  telefone: string;
  cep: string;
  cidade: string;
  estado: string;
  endereco: string;
  numero: string;
  complemento?: string;
  bairro: string;
}

export const BuyCreditsUseCaseToken = Symbol('BuyCreditsUseCase');

export interface BuyCreditsUseCase {
  execute(command: BuyCreditsCommand): Promise<{ transactionId: string; paymentPayload: string }>;
}