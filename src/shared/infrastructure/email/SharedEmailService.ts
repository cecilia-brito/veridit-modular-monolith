import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

export interface SendMailParams {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class SharedEmailService {
  private readonly logger = new Logger(SharedEmailService.name);
  private transporter: nodemailer.Transporter;
  private readonly defaultFrom: string;

  constructor() {
    this.defaultFrom = process.env.SMTP_FROM || '"Private Person" <hello@demomailtrap.co>';
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (user && pass) {
      this.transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'live.smtp.mailtrap.io',
        port: parseInt(process.env.SMTP_PORT || '587', 10),
        auth: {
          user: user,
          pass: pass,
        },
      });
    } else {
      this.logger.warn('SMTP_USER ou SMTP_PASS não configurados. O envio de e-mails falhará.');
    }
  }

  async sendMail(params: SendMailParams): Promise<void> {
    if (!this.transporter) {
      this.logger.error('Nodemailer transporter não inicializado.');
      return;
    }

    const toAddress = process.env.SMTP_TO_OVERRIDE || params.to;

    try {
      const info = await this.transporter.sendMail({
        from: this.defaultFrom,
        to: toAddress,
        subject: params.subject,
        html: params.html,
      });
      this.logger.log(`E-mail enviado com sucesso para ${params.to}. MessageId: ${info.messageId}`);
    } catch (error) {
      this.logger.error(`Falha ao enviar e-mail para ${params.to}: ${error}`);
      throw error;
    }
  }
}
