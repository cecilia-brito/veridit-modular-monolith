export interface ResetPasswordCommand {
  email: string;
  token: string;
  newPassword: string;
}

export interface ResetPasswordUseCase {
  resetPassword(command: ResetPasswordCommand): Promise<{ message: string }>;
}

export const ResetPasswordUseCaseToken = Symbol('ResetPasswordUseCase');
