export interface RecoverPasswordUseCase {
  recoverPassword(email: string): Promise<{ message: string }>;
}

export const RecoverPasswordUseCaseToken = Symbol('RecoverPasswordUseCase');