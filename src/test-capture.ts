process.env.JWT_SECRET = 'test';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StartCaptureUseCaseToken } from './modules/capture/application/ports/in/StartCaptureUseCase';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const startCaptureService = app.get(StartCaptureUseCaseToken) as any;

  console.log('--- Executando StartCaptureService ---');
  try {
    const id = await startCaptureService.start({
      titulo: 'Captura de Teste',
      siteUrl: 'https://veridit.com/teste',
      userId: 'test-user-id',
    });
    console.log('Captura Iniciada, ID:', id);
    console.log('Aguardando processamento em background (MockCaptureWorker)...');
    await new Promise((resolve) => setTimeout(resolve, 5000));
  } catch (error) {
    console.error('Erro na captura:', error);
  }

  await app.close();
}

bootstrap();
