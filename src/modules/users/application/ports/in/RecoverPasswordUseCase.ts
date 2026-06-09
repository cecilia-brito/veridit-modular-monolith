export interface RecoverPasswordUseCase {
  recoverPassword(email: string, newPassword?: string): Promise<{ message: string }>;
}

export const RecoverPasswordUseCaseToken = Symbol('RecoverPasswordUseCase');