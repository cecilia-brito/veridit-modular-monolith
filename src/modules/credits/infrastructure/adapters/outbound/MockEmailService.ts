import { Injectable } from '@nestjs/common';
import { EmailServicePort } from '../../../application/ports/out/EmailServicePort';

@Injectable()
export class MockEmailService implements EmailServicePort {
  async sendPurchaseConfirmation(emailDestino: string, pacote: string): Promise<void> {
    console.log(`[MOCK EMAIL - JOB] ⏳ Iniciando envio de e-mail em background para ${emailDestino}...`);
    
    // Simulando o tempo lento que um servidor SMTP real leva para disparar um e-mail (2 segundos)
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`===================================================`);
    console.log(`✉️ NOVO E-MAIL ENVIADO`);
    console.log(`Para: ${emailDestino}`);
    console.log(`Assunto: Confirmação de Pedido - Veridit`);
    console.log(`Mensagem: Olá! O seu pedido do pacote de créditos "${pacote}" foi gerado com sucesso. Aguardamos a confirmação do pagamento para liberar os seus acessos.`);
    console.log(`===================================================`);
    console.log(`[MOCK EMAIL - JOB] ✅ E-mail entregue com sucesso!`);
  }
}