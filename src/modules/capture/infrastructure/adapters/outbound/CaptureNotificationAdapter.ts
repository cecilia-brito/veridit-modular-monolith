import { Injectable } from '@nestjs/common';
import { SharedEmailService } from '../../../../../shared/infrastructure/email/SharedEmailService';
import { CaptureNotificationPort } from '../../../application/ports/out/CaptureNotificationPort';

@Injectable()
export class CaptureNotificationAdapter implements CaptureNotificationPort {
  constructor(private readonly emailService: SharedEmailService) {}

  async sendCaptureFinishedConfirmation(emailDestino: string, captureId: string): Promise<void> {
    const nomeUsuario = emailDestino.split('@')[0];
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
        <h2 style="color: #2c3e50; text-align: center;">Captura Concluída - Veridit</h2>
        <p style="color: #34495e; font-size: 16px;">Olá <strong>${nomeUsuario}</strong>,</p>
        <p style="color: #34495e; font-size: 16px; line-height: 1.5;">O processo de captura do site <strong>#${captureId.split('-')[0]}</strong> foi concluído com sucesso!</p>
        <p style="color: #34495e; font-size: 16px; line-height: 1.5;">Acesse sua conta na plataforma Veridit para visualizar os resultados detalhados.</p>
        <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
        <p style="color: #7f8c8d; font-size: 12px; text-align: center;">Equipe Veridit.</p>
      </div>
    `;
    
    await this.emailService.sendMail({
      to: emailDestino,
      subject: 'Sua Captura Foi Concluída! ✅',
      html: emailHtml,
    });
  }
}
