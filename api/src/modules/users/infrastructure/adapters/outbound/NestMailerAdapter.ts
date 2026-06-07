import { Injectable } from '@nestjs/common';
import { MailerPort } from '../../../application/ports/out/MailerPort';

@Injectable()
export class NestMailerAdapter implements MailerPort {
  public async sendEmail(to: string, subject: string, body: string): Promise<void> {
    // Implementação mockada de envio de email.
    // Em produção, integraria com nodemailer, SES, SendGrid, etc.
    console.log('----------------------------------------------------');
    console.log(`[E-MAIL SIMULADOR] Enviando e-mail para: ${to}`);
    console.log(`[E-MAIL SIMULADOR] Assunto: ${subject}`);
    console.log(`[E-MAIL SIMULADOR] Mensagem: ${body}`);
    console.log('----------------------------------------------------');
  }
}
