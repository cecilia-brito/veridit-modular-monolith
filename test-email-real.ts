import * as dotenv from 'dotenv';
import * as path from 'path';
const { MailtrapClient } = require("mailtrap");

// Carrega as variáveis do .env do diretório do script, independente de onde for rodado
dotenv.config({ path: path.resolve(__dirname, '.env') });

async function main() {
  const TOKEN = process.env.MAILTRAP_TOKEN;

  if (!TOKEN) {
    console.error("❌ ERRO: MAILTRAP_TOKEN não encontrado no arquivo .env");
    process.exit(1);
  }

  const client = new MailtrapClient({
    token: TOKEN,
  });

  const sender = {
    email: "hello@demomailtrap.co",
    name: "Equipe Veridit",
  };

  const recipients = [
    {
      email: "[EMAIL_ADDRESS]",
    }
  ];

  // Simulando dados de uma compra no sistema Veridit
  const nomeUsuario = "Pessoa";
  const nomePacote = "Pacote Pro - 500 Créditos";
  const valorPacote = "R$ 49,90";

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #2c3e50; text-align: center;">Confirmação de Pedido - Veridit</h2>
      
      <p style="color: #34495e; font-size: 16px;">Olá <strong>${nomeUsuario}</strong>,</p>
      
      <p style="color: #34495e; font-size: 16px; line-height: 1.5;">
        O seu pedido do <strong>${nomePacote}</strong> foi gerado com sucesso!
      </p>
      
      <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <p style="margin: 0; color: #2c3e50;"><strong>Resumo do Pedido:</strong></p>
        <ul style="color: #34495e;">
          <li>Item: ${nomePacote}</li>
          <li>Valor: ${valorPacote}</li>
          <li>Status: Aguardando Pagamento</li>
        </ul>
      </div>

      <p style="color: #34495e; font-size: 16px; line-height: 1.5;">
        Aguardamos a confirmação do pagamento para liberar os seus créditos na plataforma. 
        Assim que o pagamento for processado, você receberá um novo aviso.
      </p>
      
      <hr style="border: none; border-top: 1px solid #eaeaea; margin: 30px 0;" />
      
      <p style="color: #7f8c8d; font-size: 12px; text-align: center;">
        Este é um e-mail automático do sistema Veridit. Por favor, não responda.
      </p>
    </div>
  `;

  console.log("Gerando e-mail de confirmação de compra da Veridit...");

  try {
    const response = await client.send({
      from: sender,
      to: recipients,
      subject: `Seu pedido de créditos foi recebido! 🚀`,
      html: emailHtml,
      category: "Transaction Confirmation",
    });
    console.log("✅ E-mail enviado com sucesso:", response);
  } catch (error) {
    console.error("❌ Falha no envio:", error);
  }
}

main();
