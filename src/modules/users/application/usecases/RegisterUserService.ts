import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserUseCase, RegisterUserCommand } from '../ports/in/RegisterUserUseCase';
import { UserRepositoryPort, UserRepositoryPortToken } from '../ports/out/UserRepositoryPort';
import { User } from '../../domain/entities/User';
import { Email } from '../../domain/value-objects/Email';
import { Password } from '../../domain/value-objects/Password';
import { CPF } from '../../domain/value-objects/CPF';

@Injectable()
export class RegisterUserService implements RegisterUserUseCase {
  constructor(
    @Inject(UserRepositoryPortToken)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  public async registerUser(command: RegisterUserCommand): Promise<string> {
    // Validações sintáticas por Value Objects
    const emailVO = Email.create(command.email);
    const cpfVO = CPF.create(command.cpf);
    const passwordVO = Password.create(command.password);

    // Validações de unicidade de e-mail e CPF
    const existingEmail = await this.userRepository.findByEmail(emailVO.value);
    if (existingEmail) {
      throw new Error('E-mail já cadastrado');
    }

    const existingCpf = await this.userRepository.findByCpf(cpfVO.value);
    if (existingCpf) {
      throw new Error('CPF já cadastrado');
    }

    // Criar hash da senha
    const hashedPasswordValue = await passwordVO.getHashedValue();
    const hashedPasswordVO = Password.createFromHash(hashedPasswordValue);

    // Instanciar Entidade de Domínio
    const user = User.create({
      fullName: command.fullName,
      email: emailVO,
      password: hashedPasswordVO,
      cpf: cpfVO,
      role: command.role,
      oabNumber: command.oabNumber,
    });

    // Persistir usando porta de saída
    await this.userRepository.save(user);

    return user.id;
  }
}
