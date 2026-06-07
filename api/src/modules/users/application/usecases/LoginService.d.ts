import { LoginUseCase, LoginResult } from '../ports/in/LoginUseCase';
import { LoginCommand } from '../ports/in/dto/LoginCommand';
import { UserRepositoryPort } from '../ports/out/UserRepositoryPort';
export declare class LoginService implements LoginUseCase {
    private readonly userRepository;
    constructor(userRepository: UserRepositoryPort);
    login(command: LoginCommand): Promise<LoginResult>;
}
