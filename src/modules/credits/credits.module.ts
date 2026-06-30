import { Module } from '@nestjs/common';
import { CreditsController } from './infrastructure/adapters/inbound/CreditsController';
import { WebhookController } from './infrastructure/adapters/inbound/WebhookController';
import { BuyCreditsService } from './application/usecases/BuyCreditsService';
import { ProcessPaymentNotificationService } from './application/usecases/ProcessPaymentNotificationService';
import { BuyCreditsUseCaseToken } from './application/ports/in/BuyCreditsUseCase';
import { ProcessPaymentNotificationUseCaseToken } from './application/ports/in/ProcessPaymentNotificationUseCase';
import { MockCreditTransactionRepository } from './infrastructure/adapters/outbound/MockCreditTransactionRepository';
import { CreditTransactionRepositoryPortToken } from './application/ports/out/CreditTransactionRepositoryPort';
import { MercadoPagoPaymentPix, MercadoPagoOrderToken } from './infrastructure/adapters/outbound/MercadoPagoPaymentPix';
import { PaymentGatewayPortToken } from './application/ports/out/PaymentGatewayPort';
import { MockEmailService } from './infrastructure/adapters/outbound/MockEmailService';
import { EmailServicePortToken } from './application/ports/out/EmailServicePort';
import MercadoPagoConfig, { Order } from 'mercadopago';

@Module({
  controllers: [CreditsController, WebhookController],
  providers: [
    { provide: BuyCreditsUseCaseToken, useClass: BuyCreditsService },
    { provide: ProcessPaymentNotificationUseCaseToken, useClass: ProcessPaymentNotificationService },
    { provide: CreditTransactionRepositoryPortToken, useClass: MockCreditTransactionRepository },
    {
      provide: MercadoPagoOrderToken,
      useFactory: () => {
        const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
        if (!accessToken) {
          throw new Error('MERCADO_PAGO_ACCESS_TOKEN environment variable is not defined.');
        }
        return new Order(new MercadoPagoConfig({ accessToken }));
      },
    },
    { provide: PaymentGatewayPortToken, useClass: MercadoPagoPaymentPix },
    { provide: EmailServicePortToken, useClass: MockEmailService },
  ],
})
export class CreditsModule {}