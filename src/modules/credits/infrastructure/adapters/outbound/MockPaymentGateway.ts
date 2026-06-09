import { Injectable } from '@nestjs/common';
import { PaymentGatewayPort } from '../../../application/ports/out/PaymentGatewayPort';

@Injectable()
export class MockPaymentGateway implements PaymentGatewayPort {
  async generatePaymentDetails(transactionId: string, valor: number, metodo: string): Promise<string> {
    console.log(`[MOCK GATEWAY] Gerando cobrança de R$${valor.toFixed(2)} via ${metodo}...`);
    
    // Simula um tempo de latência real de API (meio segundo)
    await new Promise(resolve => setTimeout(resolve, 500));

    if (metodo === 'Pix') {
      // Retorna uma string que simula um Pix Copia e Cola válido
      return `00020126580014br.gov.bcb.pix0136mock-chave-pix-aleatoria-${transactionId}5204000053039865802BR5925Veridit Pagamentos LTDA6009SAO PAULO62070503***6304ABCD`;
    }
    
    // Se for Mercado Pago, retorna um link fictício de checkout
    return `https://mercadopago.com.br/mock-checkout/${transactionId}`;
  }
}