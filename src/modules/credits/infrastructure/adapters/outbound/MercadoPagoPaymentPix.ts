import { Inject, Injectable } from '@nestjs/common';
import { PaymentGatewayPort, PaymentGatewayResponse } from '../../../application/ports/out/PaymentGatewayPort';
import { CreditTransaction } from '../../../domain/entities/CreditTransaction';
import { Order } from 'mercadopago';

export const MercadoPagoOrderToken = Symbol('MercadoPagoOrder');

@Injectable()
export class MercadoPagoPaymentPix implements PaymentGatewayPort {
  constructor(
    @Inject(MercadoPagoOrderToken) private readonly order: Order,
  ) {}

  async generatePaymentDetails(
    transaction: CreditTransaction,
    valor: number,
    _metodo: string,
    _userEmail: string,
  ): Promise<PaymentGatewayResponse> {
    const valorStr = valor.toFixed(2);

    const response = await this.order.create({
      body: {
        type: 'online',
        total_amount: valorStr,
        external_reference: transaction.id,
        processing_mode: 'automatic',
        transactions: {
          payments: [
            {
              amount: valorStr,
              payment_method: {
                id: 'pix',
                type: 'bank_transfer',
              },
            },
          ],
        },
        payer: {
          email: transaction.userEmail,
        },
      },
    });

    const paymentMethod = response.transactions?.payments?.[0]?.payment_method;
    if (!paymentMethod?.qr_code) {
      throw new Error('Falha ao gerar pagamento PIX: QR code não retornado pelo Mercado Pago.');
    }

    return {
      paymentPayload: paymentMethod.qr_code,
      paymentQrCodeBase64: paymentMethod.qr_code_base64,
    };
  }
}
