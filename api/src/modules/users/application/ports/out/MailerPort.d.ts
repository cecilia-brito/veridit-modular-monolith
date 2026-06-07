export interface MailerPort {
    sendEmail(to: string, subject: string, body: string): Promise<void>;
}
export declare const MailerPortToken: unique symbol;
