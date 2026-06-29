import { Injectable } from '@nestjs/common';
import { SharedEmailService } from '../../../../../shared/infrastructure/email/SharedEmailService';
import { EmailServicePort } from '../../../application/ports/out/EmailServicePort';

@Injectable()
export class EmailServiceAdapter implements EmailServicePort {
  constructor(private readonly emailService: SharedEmailService) {}

  async sendPurchaseConfirmation(emailDestino: string, pacote: string): Promise<void> {
    const nomeUsuario = emailDestino.split('@')[0];
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color: #2c3e50; text-align: center;">Confirmação de Pedido - Veridit</h2>
        <p style="color: #34495e; font-size: 16px;">Olá <strong>${nomeUsuario}</strong>,</p>
        <p style="color: #34495e; font-size: 16px; line-height: 1.5;">O seu pedido do <strong>${pacote}</strong> foi gerado com sucesso!</p>
        <p style="color: #34495e; font-size: 16px; line-height: 1.5;">Aguardamos a confirmação do pagamento para liberar os seus créditos.</p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
        <p style="color: #7f8c8d; font-size: 12px; text-align: center;">Equipe Veridit.</p>
      </div>
    `;
    
    await this.emailService.sendMail({
      to: emailDestino,
      subject: 'Confirmação de Pedido - Veridit',
      html: emailHtml,
    });
  }
}
