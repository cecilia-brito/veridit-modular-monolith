import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { BuyCreditsUseCase, BuyCreditsCommand } from '../ports/in/BuyCreditsUseCase';
import { CreditTransactionRepositoryPort, CreditTransactionRepositoryPortToken } from '../ports/out/CreditTransactionRepositoryPort';
import { PaymentGatewayPort, PaymentGatewayPortToken } from '../ports/out/PaymentGatewayPort';
import { EmailServicePort, EmailServicePortToken } from '../ports/out/EmailServicePort';
import { CreditTransaction } from '../../domain/entities/CreditTransaction';

@Injectable()
export class BuyCreditsService implements BuyCreditsUseCase {
  private readonly PRECOS = {
    'Básico': 49.90,
    'Médio': 99.90,
    'Premium': 199.90,
  };

  constructor(
    @Inject(CreditTransactionRepositoryPortToken) private readonly repo: CreditTransactionRepositoryPort,
    @Inject(PaymentGatewayPortToken) private readonly paymentGateway: PaymentGatewayPort,
    @Inject(EmailServicePortToken) private readonly emailService: EmailServicePort,
  ) {}

  async execute(command: BuyCreditsCommand) {
    const valor = this.PRECOS[command.pacote as keyof typeof this.PRECOS];
    if (!valor) {
      throw new BadRequestException('Pacote selecionado é inválido.');
    }

    // 1. Cria a entidade de domínio e persiste (REQ 05)
    const transaction = CreditTransaction.create({
  userId: command.userId,
  pacoteNome: command.pacote,
  valorTotal: valor,
  metodoPagamento: command.metodoPagamento
});
    await this.repo.save(transaction);

    // 2. Comunica com o Gateway para gerar o payload de pagamento (REQ 06)
    const paymentPayload = await this.paymentGateway.generatePaymentDetails(
      transaction.id,
      valor,
      command.metodoPagamento
    );

    // 3. JOB ASSÍNCRONO (Fire and Forget) (REQ 07)
    // Não usamos 'await' aqui. O HTTP responde rápido ao React e o e-mail processa em background!
    this.emailService.sendPurchaseConfirmation(command.userEmail, command.pacote)
      .catch((err) => console.error('[ASYNC JOB ERROR] Falha ao processar e-mail em background:', err));

    return {
      transactionId: transaction.id,
      paymentPayload,
    };
  }
}