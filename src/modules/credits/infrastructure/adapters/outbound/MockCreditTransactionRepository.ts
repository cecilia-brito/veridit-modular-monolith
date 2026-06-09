import { Injectable } from '@nestjs/common';
import { CreditTransactionRepositoryPort } from '../../../application/ports/out/CreditTransactionRepositoryPort';
import { CreditTransaction } from '../../../domain/entities/CreditTransaction';

@Injectable()
export class MockCreditTransactionRepository implements CreditTransactionRepositoryPort {
  // O nosso "banco de dados" em memória para o MVP
  private readonly database = new Map<string, CreditTransaction>();

  async save(transaction: CreditTransaction): Promise<void> {
    console.log(`[MOCK DB - CREDITS] Salvando transação de pagamento: ${transaction.id}`);
    console.log(`[MOCK DB - CREDITS] Valor: R$${transaction.valorTotal} | Método: ${transaction.metodoPagamento}`);
    
    // Salva a entidade na memória
    this.database.set(transaction.id, transaction);
  }

  // Método bônus caso a gente precise consultar depois (ex: webhook de confirmação)
  async findById(id: string): Promise<CreditTransaction | null> {
    return this.database.get(id) || null;
  }
}