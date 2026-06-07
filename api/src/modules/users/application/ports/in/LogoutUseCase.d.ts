export interface LogoutUseCase {
    logout(userId: string): Promise<void>;
}
export declare const LogoutUseCaseToken: unique symbol;
