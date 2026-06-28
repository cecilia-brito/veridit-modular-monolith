import { Injectable } from '@nestjs/common';
import { CaptureNotificationPort } from '../../../application/ports/out/CaptureNotificationPort';

@Injectable()
export class MockCaptureNotificationService implements CaptureNotificationPort {
  async sendCaptureFinishedConfirmation(emailDestino: string, captureId: string): Promise<void> {
    console.log(`[MOCK EMAIL] Enviando e-mail para ${emailDestino} confirmando a conclusão da captura ${captureId}`);
    return Promise.resolve();
  }
}
