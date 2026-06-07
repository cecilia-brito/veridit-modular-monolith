import { MailerPort } from '../../../application/ports/out/MailerPort';
export declare class NestMailerAdapter implements MailerPort {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}
