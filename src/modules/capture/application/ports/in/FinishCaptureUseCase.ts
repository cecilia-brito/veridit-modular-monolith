export const FinishCaptureUseCaseToken = Symbol('FinishCaptureUseCase');

export interface FinishCaptureUseCase {
  finish(captureId: string, userId: string): Promise<void>;
}