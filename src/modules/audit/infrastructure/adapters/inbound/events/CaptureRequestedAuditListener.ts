import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RecordRepositoryPort, RecordRepositoryPortToken } from '../../../../application/ports/out/RecordRepositoryPort';
import { Record } from '../../../../domain/entities/Record';

@Injectable()
export class CaptureRequestedAuditListener {
  constructor(
    @Inject(RecordRepositoryPortToken)
    private readonly recordRepository: RecordRepositoryPort
  ) {}

  @OnEvent('capture.requested', { async: true })
  async handleCaptureRequestedEvent(payload: { captureId: string; userId: string; titulo?: string; siteUrl?: string }) {
    try {
      console.log(`[AUDIT WORKER] 📝 Criando registro em andamento para a captura: ${payload.captureId}`);
      
      const title = payload.titulo || 'Captura sem título';
      const siteUrl = payload.siteUrl || 'https://unknown.com';
      
      // Cria o registro base com status PENDING (criado pelo método create)
      const record = Record.create({
        title,
        userId: payload.userId,
        siteUrl
      }, payload.captureId);

      await this.recordRepository.save(record);
    } catch (err) {
      console.error(`[AUDIT WORKER] Falha ao criar registro pendente da captura:`, err);
    }
  }
}
