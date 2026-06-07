import { LogoutUseCase } from '../ports/in/LogoutUseCase';
export declare class LogoutService implements LogoutUseCase {
    logout(userId: string): Promise<void>;
}
