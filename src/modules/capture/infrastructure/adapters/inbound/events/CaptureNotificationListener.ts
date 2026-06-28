import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CaptureNotificationPort, CaptureNotificationPortToken } from '../../../../application/ports/out/CaptureNotificationPort';

@Injectable()
export class CaptureNotificationListener {
  constructor(
    @Inject(CaptureNotificationPortToken)
    private readonly notificationService: CaptureNotificationPort
  ) { }

  @OnEvent('capture.finished', { async: true })
  async handleCaptureFinishedEvent(payload: { captureId: string; userId: string; userEmail?: string }) {
    try {
      // Usamos userId ou userEmail se tivermos. Aqui assumimos que temos o userEmail ou buscamos ele.
      // Como simplificação para o REQ 10, usaremos um e-mail dummy se não houver no payload,
      // pois FinishCaptureService tem apenas userId. Numa aplicação real, buscaríamos no DB.
      const email = payload.userEmail || `${payload.userId}@example.com`;
      await this.notificationService.sendCaptureFinishedConfirmation(email, payload.captureId);
      console.log(`[ASYNC JOB SUCCESS] E-mail de captura finalizada enviado para ${email}`);
    } catch (err) {
      console.error('[ASYNC JOB ERROR] Falha ao processar e-mail de captura em background:', err);
    }
  }
}
