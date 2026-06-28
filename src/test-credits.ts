process.env.JWT_SECRET = 'test';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BuyCreditsUseCaseToken } from './modules/credits/application/ports/in/BuyCreditsUseCase';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const buyCreditsService = app.get(BuyCreditsUseCaseToken) as any;

  console.log('--- Executando BuyCreditsService ---');
  try {
    const result = await buyCreditsService.execute({
      userId: 'test-user-id',
      userEmail: 'teste@veridit.com',
      pacote: 'Básico',
      metodoPagamento: 'Pix',
      telefone: '11999999999',
      cep: '01001-000',
      cidade: 'Salvador',
      estado: 'BA',
      endereco: 'Rua do Michael Jackson',
      numero: '1',
      bairro: 'Centro',
    });
    console.log('Resultado da Compra:', result);
    await new Promise((resolve) => setTimeout(resolve, 1000));
  } catch (error) {
    console.error('Erro na compra:', error);
  }

  await app.close();
}

bootstrap();
