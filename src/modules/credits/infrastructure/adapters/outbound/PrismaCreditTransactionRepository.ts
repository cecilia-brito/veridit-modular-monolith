// import { Injectable } from '@nestjs/common';
// // Ajuste o caminho do PrismaService conforme a estrutura do seu projeto
// import { PrismaService } from '../../../../prisma/prisma.service';
// import { CreditTransactionRepositoryPort } from '../../../application/ports/out/CreditTransactionRepositoryPort';
// import { CreditTransaction } from '../../../domain/entities/CreditTransaction';

// @Injectable()
// export class PrismaCreditTransactionRepository implements CreditTransactionRepositoryPort {
//   constructor(private readonly prisma: PrismaService) {}

//   async save(transaction: CreditTransaction): Promise<void> {
  
//     await this.prisma.creditTransaction.create({
//       data: {
//         id: transaction.id,
//         userId: transaction.userId,
//         pacoteNome: transaction.pacoteNome,
//         valorTotal: transaction.valorTotal,
//         metodoPagamento: transaction.metodoPagamento,
//         status: transaction.status,
        
//         // Dados de Faturação (REQ 05)
//         telefone: transaction.telefone,
//         cep: transaction.cep,
//         endereco: transaction.endereco,
//         numero: transaction.numero,
//         complemento: transaction.complemento,
//         bairro: transaction.bairro,
//         cidade: transaction.cidade,
//         estado: transaction.estado,
//       }
//     });
//   }
//   async findById(id: string): Promise<CreditTransaction | null> {
// 	const record = await this.prisma.creditTransaction.findUnique({
//       where: { id: id }
//     });
// 	if(record){
// 		return record;
// 	}else{
// 		return null;
// 	}
//   }
// }