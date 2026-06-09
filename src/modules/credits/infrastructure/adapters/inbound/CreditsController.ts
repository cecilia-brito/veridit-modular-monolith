import { Controller, Post, Body, Inject, UseGuards, Request } from '@nestjs/common';
import { BuyCreditsUseCase, BuyCreditsUseCaseToken } from '../../../application/ports/in/BuyCreditsUseCase';
import { JwtAuthGuard } from '../../../../../shared/infrastructure/auth/jwt-auth.guard';

@Controller('credits')
@UseGuards(JwtAuthGuard) // Protege a rota, exigindo a "Pulseira VIP" (JWT)
export class CreditsController {
  constructor(
    @Inject(BuyCreditsUseCaseToken)
    private readonly buyCreditsUseCase: BuyCreditsUseCase,
  ) {}

  @Post('buy')
  async buy(@Body() body: any, @Request() req: any) {
    // Unimos os dados do formulário com os dados do utilizador autenticado no JWT
    return this.buyCreditsUseCase.execute({
      userId: req.user.sub,
      userEmail: req.user.email,
      ...body,
    });
  }
}