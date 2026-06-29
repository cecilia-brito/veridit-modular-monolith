import { Injectable } from '@nestjs/common';
import { SharedEmailService } from '../../../../../shared/infrastructure/email/SharedEmailService';
import { MailerPort } from '../../../application/ports/out/MailerPort';

@Injectable()
export class NestMailerAdapter implements MailerPort {
  constructor(private readonly emailService: SharedEmailService) {}

  public async sendEmail(to: string, subject: string, body: string): Promise<void> {
    await this.emailService.sendMail({
      to,
      subject,
      html: body,
    });
  }
}
