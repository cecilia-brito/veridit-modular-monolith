import { Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ResetPasswordUseCase, ResetPasswordCommand } from '../ports/in/ResetPasswordUseCase';
import { UserRepositoryPort, UserRepositoryPortToken } from '../ports/out/UserRepositoryPort';
import { Email } from '../../domain/value-objects/Email';
import { Password } from '../../domain/value-objects/Password';

@Injectable()
export class ResetPasswordService implements ResetPasswordUseCase {
  constructor(
    @Inject(UserRepositoryPortToken)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  public async resetPassword(command: ResetPasswordCommand): Promise<{ message: string }> {
    const emailVO = Email.create(command.email);
    const user = await this.userRepository.findByEmail(emailVO.value);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!user.resetToken || user.resetToken !== command.token) {
      throw new UnauthorizedException('Token inválido ou expirado');
    }

    const passwordVO = Password.create(command.newPassword);
    const hashedValue = await passwordVO.getHashedValue();
    const hashedPasswordVO = Password.createFromHash(hashedValue);
    
    // Accessing private props or just updating the password directly.
    // user.updatePassword takes a string and stores it unhashed, which isn't ideal for our mock mapping.
    // Instead we will overwrite it with the hashed object for the repository format, or rely on updatePassword.
    // For consistency with how PrismaUserRepository maps rawData.password:
    user['props'].password = hashedPasswordVO; 
    user.clearResetToken();

    await this.userRepository.save(user);

    return { message: 'Senha alterada com sucesso!' };
  }
}
