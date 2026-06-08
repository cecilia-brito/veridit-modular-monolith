export interface StartCaptureCommand {
  titulo: string;
  siteUrl: string;
  userId: string;
}

export const StartCaptureUseCaseToken = Symbol('StartCaptureUseCase');

export interface StartCaptureUseCase {
  start(command: StartCaptureCommand): Promise<string>; // Retorna o ID
}