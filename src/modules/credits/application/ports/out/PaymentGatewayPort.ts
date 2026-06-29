import { CreditTransaction } from "src/modules/credits/domain/entities/CreditTransaction";

export const PaymentGatewayPortToken = Symbol('PaymentGatewayPort');

export type PaymentGatewayResponse = {
  paymentPayload: string;
  paymentQrCodeBase64?: string;
};

export interface PaymentGatewayPort {
  generatePaymentDetails(transaction: CreditTransaction, valor: number, metodo: string, userEmail: string): Promise<PaymentGatewayResponse>;
}