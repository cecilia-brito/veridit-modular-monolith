import { Controller, Post, Body, Inject, UseGuards, Request } from '@nestjs/common';
import { StartCaptureUseCase, StartCaptureUseCaseToken } from '../../../application/ports/in/StartCaptureUseCase';
import { JwtAuthGuard } from '../../../../../shared/infrastructure/auth/jwt-auth.guard'; // Assumindo que você tem o guard

@Controller('captures')
@UseGuards(JwtAuthGuard) 
export class CaptureController {
  constructor(
    @Inject(StartCaptureUseCaseToken)
    private readonly startCaptureUseCase: StartCaptureUseCase,
  ) {}
  
  @Post('start')
  async startCapture(@Body() body: { titulo: string; siteUrl: string }, @Request() req: any) {
    const id = await this.startCaptureUseCase.start({
      titulo: body.titulo,
      siteUrl: body.siteUrl,
      userId: req.user.sub,
    });
    return { id, message: 'Captura iniciada com sucesso. Processamento em background.' };
  }
}