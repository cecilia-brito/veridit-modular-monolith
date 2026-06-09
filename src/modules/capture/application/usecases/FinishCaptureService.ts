import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FinishCaptureUseCase } from '../ports/in/FinishCaptureUseCase';
import { CaptureRepositoryPort, CaptureRepositoryPortToken } from '../ports/out/CaptureRepositoryPort';

@Injectable()
export class FinishCaptureService implements FinishCaptureUseCase {
  constructor(
    @Inject(CaptureRepositoryPortToken)
    private readonly captureRepo: CaptureRepositoryPort,
  ) {}

  async finish(captureId: string, userId: string): Promise<void> {
    const session = await this.captureRepo.findById(captureId);
    
    if (!session || session.userId !== userId) {
      throw new NotFoundException('Sessão de captura não encontrada.');
    }

    session.finish();
    
    await this.captureRepo.update(session);
  }
}