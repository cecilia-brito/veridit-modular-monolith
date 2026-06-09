export const EmailServicePortToken = Symbol('EmailServicePort');

export interface EmailServicePort {
  sendPurchaseConfirmation(emailDestino: string, pacote: string): Promise<void>;
}