import { Inject, Injectable } from '@nestjs/common';
import { StartCaptureUseCase, StartCaptureCommand } from '../ports/in/StartCaptureUseCase';
import { CaptureRepositoryPort, CaptureRepositoryPortToken } from '../ports/out/CaptureRepositoryPort';
import { CaptureSession } from '../../domain/entities/CaptureSession';

@Injectable()
export class StartCaptureService implements StartCaptureUseCase {
  constructor(
    @Inject(CaptureRepositoryPortToken)
    private readonly captureRepo: CaptureRepositoryPort,
  ) {}

  async start(command: StartCaptureCommand): Promise<string> {
    const session = CaptureSession.create(command.titulo, command.siteUrl, command.userId);
    await this.captureRepo.save(session);
    return session.id;
  }
}