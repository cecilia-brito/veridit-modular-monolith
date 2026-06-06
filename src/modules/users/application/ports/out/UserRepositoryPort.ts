import { User } from '../../../domain/entities/User';

export interface UserRepositoryPort {
  save(user: User): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  findByCpf(cpf: string): Promise<User | null>;
}

export const UserRepositoryPortToken = Symbol('UserRepositoryPort');
