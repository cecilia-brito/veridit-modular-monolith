import { Injectable } from '@nestjs/common';
import { CaptureRepositoryPort } from '../../../application/ports/out/CaptureRepositoryPort';
import { CaptureSession } from '../../../domain/entities/CaptureSession';
import { PrismaService } from '../../../../prisma/prisma.service'; // Seu módulo global do Prisma

@Injectable()
export class PrismaCaptureRepository implements CaptureRepositoryPort {
  // Simulando a nossa tabela do banco de dados na memória RAM
  private readonly database = new Map<string, CaptureSession>();

  async save(session: CaptureSession): Promise<void> {
    console.log(`[MOCK DB] Salvando nova captura: ${session.id} - URL: ${session.siteUrl}`);
    this.database.set(session.id, session);
  }

  async findById(id: string): Promise<CaptureSession | null> {
    console.log(`[MOCK DB] Buscando captura pelo ID: ${id}`);
    const record = this.database.get(id);
    
    if (!record) return null;

    // Retorna uma cópia da entidade para evitar mutações acidentais na memória
    const session = new CaptureSession(
      record.id,
      record.titulo,
      record.siteUrl,
      record.inicio,
      record.status,
      record.userId
    );
    session.fim = record.fim;

    return session;
  }

  async update(session: CaptureSession): Promise<void> {
    console.log(`[MOCK DB] Atualizando captura ${session.id} para status: ${session.status}`);
    
    if (this.database.has(session.id)) {
      this.database.set(session.id, session);
    }
  }
}