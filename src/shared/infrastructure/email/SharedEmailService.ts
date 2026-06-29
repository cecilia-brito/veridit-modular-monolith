import { Injectable, Logger } from '@nestjs/common';
import { MailtrapClient } from 'mailtrap';

export interface SendMailParams {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class SharedEmailService {
  private readonly logger = new Logger(SharedEmailService.name);
  private client: MailtrapClient;

  constructor() {
    const token = process.env.MAILTRAP_TOKEN;
    if (token) {
      this.client = new MailtrapClient({ token });
    } else {
      this.logger.warn('MAILTRAP_TOKEN não configurado. O envio de e-mails falhará.');
    }
  }

  async sendMail(params: SendMailParams): Promise<void> {
    if (!this.client) {
      this.logger.error('Mailtrap client não inicializado.');
      return;
    }

    try {
      const response = await this.client.send({
        from: { email: 'hello@demomailtrap.co', name: 'Equipe Veridit' },
        to: [{ email: params.to }],
        subject: params.subject,
        html: params.html,
        category: 'Veridit App',
      });
      this.logger.log(`E-mail enviado com sucesso para ${params.to}. MessageIds: ${response.message_ids?.join(', ')}`);
    } catch (error) {
      this.logger.error(`Falha ao enviar e-mail para ${params.to}: ${error}`);
      throw error;
    }
  }
}
