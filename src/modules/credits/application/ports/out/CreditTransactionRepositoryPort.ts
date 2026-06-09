import { CreditTransaction } from '../../../domain/entities/CreditTransaction';

export const CreditTransactionRepositoryPortToken = Symbol('CreditTransactionRepositoryPort');

export interface CreditTransactionRepositoryPort {
  save(transaction: CreditTransaction): Promise<void>;
  findById(id: string): Promise<CreditTransaction | null>;
}