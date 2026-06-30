import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RecordRepositoryPort, RecordRepositoryPortToken } from '../../../../application/ports/out/RecordRepositoryPort';
import { Record } from '../../../../domain/entities/Record';

@Injectable()
export class CaptureFinishedAuditListener {
  constructor(
    @Inject(RecordRepositoryPortToken)
    private readonly recordRepository: RecordRepositoryPort
  ) {}

  @OnEvent('capture.finished', { async: true })
  async handleCaptureFinishedEvent(payload: { captureId: string; userId: string; titulo?: string; siteUrl?: string }) {
    try {
      console.log(`[AUDIT WORKER] 📝 Concluindo relatório para a captura: ${payload.captureId}`);
      
      let record = await this.recordRepository.findById(payload.captureId);

      if (!record) {
        console.warn(`[AUDIT WORKER] Registro ${payload.captureId} não encontrado. Criando um novo.`);
        const title = payload.titulo || 'Captura sem título';
        const siteUrl = payload.siteUrl || 'https://unknown.com';
        
        record = Record.create({
          title,
          userId: payload.userId,
          siteUrl
        }, payload.captureId);
      }

      // Conclui a gravação simulando imagens e vídeos encontrados no mock
      const imageCount = Math.floor(Math.random() * 5) + 1;
      const videoCount = Math.floor(Math.random() * 2);
      record.complete(imageCount, videoCount, 'Captura processada com sucesso.');

      await this.recordRepository.save(record);
      console.log(`[AUDIT WORKER] Relatório ${payload.captureId} atualizado com sucesso!`);
    } catch (err) {
      console.error(`[AUDIT WORKER] Falha ao salvar relatório da captura:`, err);
    }
  }
}
