import { Module } from '@nestjs/common';
import { CreditsController } from './infrastructure/adapters/inbound/CreditsController';
import { BuyCreditsService } from './application/usecases/BuyCreditsService';
import { BuyCreditsUseCaseToken } from './application/ports/in/BuyCreditsUseCase';
import { MockCreditTransactionRepository } from './infrastructure/adapters/outbound/MockCreditTransactionRepository';
import { CreditTransactionRepositoryPortToken } from './application/ports/out/CreditTransactionRepositoryPort';
import { MockPaymentGateway } from './infrastructure/adapters/outbound/MockPaymentGateway';
import { PaymentGatewayPortToken } from './application/ports/out/PaymentGatewayPort';
import { MockEmailService } from './infrastructure/adapters/outbound/MockEmailService';
import { EmailServicePortToken } from './application/ports/out/EmailServicePort';
import { CreditEmailListener } from './infrastructure/adapters/inbound/events/CreditEmailListener';

@Module({
  controllers: [CreditsController],
  providers: [
    { provide: BuyCreditsUseCaseToken, useClass: BuyCreditsService },
    { provide: CreditTransactionRepositoryPortToken, useClass: MockCreditTransactionRepository },
    { provide: PaymentGatewayPortToken, useClass: MockPaymentGateway },
    { provide: EmailServicePortToken, useClass: MockEmailService },
    CreditEmailListener,
  ],
})
export class CreditsModule {}