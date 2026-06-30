import { Injectable } from '@nestjs/common';
import { PaymentGatewayPort, PaymentGatewayResponse } from '../../../application/ports/out/PaymentGatewayPort';
import { CreditTransaction } from '../../../domain/entities/CreditTransaction';

@Injectable()
export class MockPaymentGateway implements PaymentGatewayPort {
  async generatePaymentDetails(transaction: CreditTransaction, valor: number, metodo: string, _userEmail: string): Promise<PaymentGatewayResponse> {
    console.log(`[MOCK GATEWAY] Gerando cobrança de R$${valor.toFixed(2)} via ${metodo} para ${transaction.userName}...`);

    await new Promise(resolve => setTimeout(resolve, 500));

    if (metodo === 'Pix') {
      return {
        paymentPayload: `00020126580014br.gov.bcb.pix0136mock-chave-pix-aleatoria-${transaction.id}5204000053039865802BR5925Veridit Pagamentos LTDA6009SAO PAULO62070503***6304ABCD`,
        paymentQrCodeBase64: undefined,
      };
    }

    return {
      paymentPayload: `https://mercadopago.com.br/mock-checkout/${transaction.id}`,
    };
  }
}