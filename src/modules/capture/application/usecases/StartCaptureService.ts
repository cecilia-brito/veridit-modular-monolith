import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StartCaptureUseCase, StartCaptureCommand } from '../ports/in/StartCaptureUseCase';
import { CaptureRepositoryPort, CaptureRepositoryPortToken } from '../ports/out/CaptureRepositoryPort';
import { CaptureSession } from '../../domain/entities/CaptureSession';

@Injectable()
export class StartCaptureService implements StartCaptureUseCase {
  constructor(
    @Inject(CaptureRepositoryPortToken)
    private readonly captureRepo: CaptureRepositoryPort,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async start(command: StartCaptureCommand): Promise<string> {
    const session = CaptureSession.create(command.titulo, command.siteUrl, command.userId);
    await this.captureRepo.save(session);
    
    // Dispara o evento de solicitacao para o Worker assíncrono (ADR-004)
    this.eventEmitter.emit('capture.requested', { 
      captureId: session.id, 
      userId: session.userId,
      titulo: session.titulo,
      siteUrl: session.siteUrl 
    });
    
    return session.id;
  }
}