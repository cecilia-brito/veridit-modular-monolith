export const PaymentGatewayPortToken = Symbol('PaymentGatewayPort');

export interface PaymentGatewayPort {
  // Retorna o "Pix Copia e Cola" ou o Link do Checkout
  generatePaymentDetails(transactionId: string, valor: number, metodo: string): Promise<string>;
}