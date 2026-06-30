import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ProcessPaymentNotificationUseCase, ProcessPaymentNotificationUseCaseToken } from '../../../application/ports/in/ProcessPaymentNotificationUseCase';

@Controller('webhooks')
export class WebhookController {
  constructor(
    @Inject(ProcessPaymentNotificationUseCaseToken)
    private readonly useCase: ProcessPaymentNotificationUseCase,
  ) {}

  @Post('mercadopago')
  async handle(@Body() body: any): Promise<{ received: boolean }> {
    if (body.type === 'order' && body.data?.id) {
      await this.useCase.execute({ orderId: body.data.id });
    }

    return { received: true };
  }
}
