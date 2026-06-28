import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { BuyCreditsUseCase, BuyCreditsCommand } from '../ports/in/BuyCreditsUseCase';
import { CreditTransactionRepositoryPort, CreditTransactionRepositoryPortToken } from '../ports/out/CreditTransactionRepositoryPort';
import { PaymentGatewayPort, PaymentGatewayPortToken } from '../ports/out/PaymentGatewayPort';
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
    private readonly eventEmitter: EventEmitter2,
  ) { }

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
    // Desacoplado via Event Emitter conforme ADR-012
    this.eventEmitter.emit('credit.purchased', {
      userEmail: command.userEmail,
      pacote: command.pacote
    });

    return {
      transactionId: transaction.id,
      paymentPayload,
    };
  }
}