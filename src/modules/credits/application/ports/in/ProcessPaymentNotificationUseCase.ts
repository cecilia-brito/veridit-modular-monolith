export const ProcessPaymentNotificationUseCaseToken = Symbol('ProcessPaymentNotificationUseCase');

export interface PaymentNotification {
  orderId: string;
}

export interface ProcessPaymentNotificationUseCase {
  execute(notification: PaymentNotification): Promise<void>;
}
