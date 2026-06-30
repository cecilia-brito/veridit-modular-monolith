import { Injectable, Inject } from '@nestjs/common';
import { OnEvent, EventEmitter2 } from '@nestjs/event-emitter';
import { CaptureRepositoryPort, CaptureRepositoryPortToken } from '../../../../application/ports/out/CaptureRepositoryPort';

@Injectable()
export class MockCaptureWorker {
  constructor(
    @Inject(CaptureRepositoryPortToken)
    private readonly captureRepo: CaptureRepositoryPort,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @OnEvent('capture.requested', { async: true })
  async handleCaptureRequestedEvent(payload: { captureId: string; userId: string }) {
    console.log(`[MOCK WORKER] 🎬 Iniciando gravação mock em background para captureId: ${payload.captureId}...`);
    
    try {
      // 1. Simula o tempo de gravação via Headless Browser (ADR-006)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // 2. Busca a sessão e a finaliza
      const session = await this.captureRepo.findById(payload.captureId);
      if (session && session.userId === payload.userId) {
        session.finish();
        await this.captureRepo.update(session);
        console.log(`[MOCK WORKER] ✅ Gravação ${payload.captureId} concluída com sucesso!`);
        
        // 3. Dispara evento de conclusão para notificação por e-mail e geração de relatório
        this.eventEmitter.emit('capture.finished', { 
          captureId: session.id, 
          userId: session.userId,
          titulo: session.titulo,
          siteUrl: session.siteUrl
        });
      } else {
        console.warn(`[MOCK WORKER] ⚠️ Sessão não encontrada ou não pertence ao usuário.`);
      }
    } catch (error) {
      console.error(`[MOCK WORKER] ❌ Falha na gravação mock:`, error);
    }
  }
}
