import { Controller, Post, Body, Param, Inject, UseGuards, Request } from '@nestjs/common';
import { StartCaptureUseCase, StartCaptureUseCaseToken } from '../../../application/ports/in/StartCaptureUseCase';
import { FinishCaptureUseCase, FinishCaptureUseCaseToken } from '../../../application/ports/in/FinishCaptureUseCase';
import { JwtAuthGuard } from '../../../../../shared/infrastructure/auth/jwt-auth.guard'; // Assumindo que você tem o guard

@Controller('captures')
@UseGuards(JwtAuthGuard) 
export class CaptureController {
  constructor(
    @Inject(StartCaptureUseCaseToken)
    private readonly startCaptureUseCase: StartCaptureUseCase,
    @Inject(FinishCaptureUseCaseToken)
    private readonly finishCaptureUseCase: FinishCaptureUseCase,
  ) {}
  
  @Post('start')
  async startCapture(@Body() body: { titulo: string; siteUrl: string }, @Request() req: any) {
    const id = await this.startCaptureUseCase.start({
      titulo: body.titulo,
      siteUrl: body.siteUrl,
      userId: req.user.sub,
    });
    return { id, message: 'Captura iniciada com sucesso.' };
  }

  @Post(':id/finish')
  async finishCapture(@Param('id') id: string, @Request() req: any) {
    await this.finishCaptureUseCase.finish(id, req.user.sub);
    return { message: 'Captura concluída e salva com sucesso.' };
  }
}