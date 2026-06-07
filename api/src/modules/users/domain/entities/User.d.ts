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
}
export declare class User extends BaseEntity<UserProps> {
    private constructor();
    get fullName(): string;
    get email(): Email;
    get password(): Password;
    get cpf(): CPF;
    get role(): UserRole;
    get oabNumber(): string | undefined;
    get isActive(): boolean;
    get createdAt(): Date;
    static create(props: Omit<UserProps, 'isActive' | 'createdAt'>, id?: string): User;
    deactivate(): void;
}
export {};
