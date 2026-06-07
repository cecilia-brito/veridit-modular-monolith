export interface MailerPort {
  sendEmail(to: string, subject: string, body: string): Promise<void>;
}

export const MailerPortToken = Symbol('MailerPort');
