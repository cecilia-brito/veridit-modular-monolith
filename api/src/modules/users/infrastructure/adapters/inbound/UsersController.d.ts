import { RegisterUserUseCase, RegisterUserCommand } from '../../../application/ports/in/RegisterUserUseCase';
import { LoginUseCase } from '../../../application/ports/in/LoginUseCase';
import { RecoverPasswordUseCase } from '../../../application/ports/in/RecoverPasswordUseCase';
import { LogoutUseCase } from '../../../application/ports/in/LogoutUseCase';
import { LoginCommand } from '../../../application/ports/in/dto/LoginCommand';
export declare class UsersController {
    private readonly registerUserUseCase;
    private readonly loginUseCase;
    private readonly recoverPasswordUseCase;
    private readonly logoutUseCase;
    constructor(registerUserUseCase: RegisterUserUseCase, loginUseCase: LoginUseCase, recoverPasswordUseCase: RecoverPasswordUseCase, logoutUseCase: LogoutUseCase);
    register(body: RegisterUserCommand): Promise<{
        id: string;
        message: string;
    }>;
    login(body: LoginCommand): Promise<import("../../../application/ports/in/LoginUseCase").LoginResult>;
    recoverPassword(email: string): Promise<{
        message: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
