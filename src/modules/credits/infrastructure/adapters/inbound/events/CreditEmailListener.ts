import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailServicePort, EmailServicePortToken } from '../../../../application/ports/out/EmailServicePort';

@Injectable()
export class CreditEmailListener {
  constructor(
    @Inject(EmailServicePortToken)
    private readonly emailService: EmailServicePort
  ) {}

  @OnEvent('credit.purchased', { async: true })
  async handleCreditPurchasedEvent(payload: { userEmail: string; pacote: string }) {
    try {
      await this.emailService.sendPurchaseConfirmation(payload.userEmail, payload.pacote);
      console.log(`[ASYNC JOB SUCCESS] E-mail de compra enviado para ${payload.userEmail}`);
    } catch (err) {
      console.error('[ASYNC JOB ERROR] Falha ao processar e-mail em background:', err);
    }
  }
}
