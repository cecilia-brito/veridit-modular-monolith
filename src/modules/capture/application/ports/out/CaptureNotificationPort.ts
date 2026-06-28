export const CaptureNotificationPortToken = Symbol('CaptureNotificationPort');

export interface CaptureNotificationPort {
  sendCaptureFinishedConfirmation(emailDestino: string, captureId: string): Promise<void>;
}
