import { Controller, Post, Get, Param, Body, Inject, UseGuards, Request } from '@nestjs/common';
import { BuyCreditsUseCase, BuyCreditsUseCaseToken } from '../../../application/ports/in/BuyCreditsUseCase';
import { CreditTransactionRepositoryPort, CreditTransactionRepositoryPortToken } from '../../../application/ports/out/CreditTransactionRepositoryPort';
import { JwtAuthGuard } from '../../../../../shared/infrastructure/auth/jwt-auth.guard';

@Controller('credits')
@UseGuards(JwtAuthGuard)
export class CreditsController {
  constructor(
    @Inject(BuyCreditsUseCaseToken)
    private readonly buyCreditsUseCase: BuyCreditsUseCase,
    @Inject(CreditTransactionRepositoryPortToken)
    private readonly repo: CreditTransactionRepositoryPort,
  ) {}

  @Post('buy')
  async buy(@Body() body: any, @Request() req: any) {
    return this.buyCreditsUseCase.execute({
      userId: req.user.sub,
      userEmail: req.user.email,
      ...body,
    });
  }

  @Get(':id/status')
  async status(@Param('id') id: string) {
    const transaction = await this.repo.findById(id);
    return { status: transaction?.status ?? 'NOT_FOUND' };
  }
}