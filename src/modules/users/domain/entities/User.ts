import { BaseEntity } from '../../../../shared/domain/entity.base';
import { Email } from '../value-objects/Email';
import { Password } from '../value-objects/Password';
import { CPF } from '../value-objects/CPF';

export type UserRole = 'COMMON' | 'LAWYER';

interface UserProps {
  fullName: string;
  email: Email;
  password: Password;
  cpf: CPF;
  role: UserRole;
  oabNumber?: string;
  isActive: boolean;
  createdAt: Date;
  resetToken?: string;
}

export class User extends BaseEntity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  get fullName(): string { return this.props.fullName; }
  get email(): Email { return this.props.email; }
  get password(): Password { return this.props.password; }
  get cpf(): CPF { return this.props.cpf; }
  get role(): UserRole { return this.props.role; }
  get oabNumber(): string | undefined { return this.props.oabNumber; }
  get isActive(): boolean { return this.props.isActive; }
  get createdAt(): Date { return this.props.createdAt; }
  get resetToken(): string | undefined { return this.props.resetToken; }

  public static create(props: Omit<UserProps, 'isActive' | 'createdAt'>, id?: string): User {
    if (props.role === 'LAWYER' && !props.oabNumber) {
      throw new Error('Advogados precisam informar o número da OAB');
    }
    
    return new User({
      ...props,
      isActive: true,
      createdAt: new Date(),
    }, id);
  }

  public deactivate(): void {
    this.props.isActive = false;
  }
  public updatePassword(newPassword: string): void {
    this.props.password = Password.create(newPassword); 
  }
  public setResetToken(token: string): void {
    this.props.resetToken = token;
  }
  public clearResetToken(): void {
    this.props.resetToken = undefined;
  }
}
