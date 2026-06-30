import { Inject, Injectable } from '@nestjs/common';
import { ProcessPaymentNotificationUseCase } from '../ports/in/ProcessPaymentNotificationUseCase';
import { CreditTransactionRepositoryPort, CreditTransactionRepositoryPortToken } from '../ports/out/CreditTransactionRepositoryPort';
import { MercadoPagoOrderToken } from '../../infrastructure/adapters/outbound/MercadoPagoPaymentPix';
import { Order } from 'mercadopago';

@Injectable()
export class ProcessPaymentNotificationService implements ProcessPaymentNotificationUseCase {
  constructor(
    @Inject(MercadoPagoOrderToken) private readonly order: Order,
    @Inject(CreditTransactionRepositoryPortToken) private readonly repo: CreditTransactionRepositoryPort,
  ) {}

  async execute(notification: { orderId: string }): Promise<void> {
    const orderResponse = await this.order.get({ id: notification.orderId });

    const externalRef = orderResponse.external_reference;
    if (!externalRef) return;

    const transaction = await this.repo.findById(externalRef);
    if (!transaction) return;

    const payment = orderResponse.transactions?.payments?.[0];
    if (!payment) return;

    const isApproved =
      payment.status === 'processed' ||
      payment.status_detail === 'accredited';

    const isRejected =
      payment.status === 'cancelled' ||
      payment.status_detail === 'rejected' ||
      payment.status_detail === 'refunded';

    if (isApproved) {
      transaction.confirmarPagamento();
    } else if (isRejected) {
      transaction.recusarTransacao();
    } else {
      return;
    }

    await this.repo.save(transaction);
  }
}
