import 'tsconfig-paths/register';
process.env.JWT_SECRET = 'test';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { StartCaptureUseCaseToken } from './modules/capture/application/ports/in/StartCaptureUseCase';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const startCaptureService = app.get(StartCaptureUseCaseToken) as any;

  const siteUrl = process.argv[2] || 'https://veridit.com/teste';
  const userId = process.argv[3] || 'test-user-id';

  console.log('--- Executando StartCaptureService ---');
  try {
    const id = await startCaptureService.start({
      titulo: 'Captura de Teste',
      siteUrl,
      userId,
    });
    console.log('Captura Iniciada, ID:', id);
    console.log(`URL Alvo: ${siteUrl}`);
    console.log('Aguardando processamento em background (MockCaptureWorker)...');
    
    // Aguarda mais tempo para garantir que os workers finalizem
    await new Promise((resolve) => setTimeout(resolve, 8000));
  } catch (error) {
    console.error('Erro na captura:', error);
  }

  await app.close();
}

bootstrap();
