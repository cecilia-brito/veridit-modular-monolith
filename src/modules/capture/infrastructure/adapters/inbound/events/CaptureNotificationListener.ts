import { Injectable, Inject } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CaptureNotificationPort, CaptureNotificationPortToken } from '../../../../application/ports/out/CaptureNotificationPort';
import { UserRepositoryPort, UserRepositoryPortToken } from '../../../../../users/application/ports/out/UserRepositoryPort';

@Injectable()
export class CaptureNotificationListener {
  constructor(
    @Inject(CaptureNotificationPortToken)
    private readonly notificationService: CaptureNotificationPort,
    @Inject(UserRepositoryPortToken)
    private readonly userRepository: UserRepositoryPort
  ) { }

  @OnEvent('capture.finished', { async: true })
  async handleCaptureFinishedEvent(payload: { captureId: string; userId: string; userEmail?: string }) {
    try {
      let email = payload.userEmail;
      
      if (!email) {
        const user = await this.userRepository.findById(payload.userId);
        if (user) {
          email = user.email.value;
        } else {
          email = `${payload.userId}@example.com`;
        }
      }

      await this.notificationService.sendCaptureFinishedConfirmation(email, payload.captureId);
      console.log(`[ASYNC JOB SUCCESS] E-mail de captura finalizada enviado para ${email}`);
    } catch (err) {
      console.error('[ASYNC JOB ERROR] Falha ao processar e-mail de captura em background:', err);
    }
  }
}
