import { Injectable } from '@nestjs/common';
import { RecordRepositoryPort } from '../../../application/ports/out/RecordRepositoryPort';
import { Record } from '../../../domain/entities/Record';
import { mock } from 'node:test';

@Injectable()
export class PrismaRecordRepository implements RecordRepositoryPort {
  private readonly recordsDb = new Map<string, any>();

  constructor() {
	const mockRecord1 = Record.create({
      title: 'Captura de Prova - Site G1',
      userId: 'mock-user',
      siteUrl: 'https://g1.globo.com',
      details: 'Evidência de notícia falsa',
    }, 'rec-1');
    mockRecord1.complete(3, 1, 'Capturado com sucesso usando Playwright');

    const mockRecord2 = Record.create({
      title: 'Captura de Ofensa - Twitter',
      userId: 'mock-user',
      siteUrl: 'https://twitter.com/post/12345',
      details: 'Post contendo difamação',
    }, 'rec-2');

    this.save(mockRecord1);
    this.save(mockRecord2);

  }
  public async save(record: Record): Promise<void> {
    const rawData = {
      id: record.id,
      title: record.title,
      userId: record.userId,
      siteUrl: record.siteUrl,
      startTime: record.startTime,
      endTime: record.endTime,
      details: record.details,
      status: record.status,
      imageCount: record.imageCount,
      videoCount: record.videoCount,
    };
    this.recordsDb.set(record.id, rawData);
  }

  public async findByUserId(userId: string): Promise<Record[]> {
    const list: Record[] = [];
    for (const rawData of this.recordsDb.values()) {
      if (rawData.userId === userId || rawData.userId === 'mock-user') {
        list.push(this.mapToDomain(rawData));
      }
    }
    return list;
  }

  public async findById(id: string): Promise<Record | null> {
    const rawData = this.recordsDb.get(id);
    if (!rawData) return null;
    return this.mapToDomain(rawData);
  }

  private mapToDomain(rawData: any): Record {
    const record = Record.create(
      {
        title: rawData.title,
        userId: rawData.userId,
        siteUrl: rawData.siteUrl,
        details: rawData.details,
      },
      rawData.id,
    );

    if (rawData.status === 'COMPLETED') {
      record.complete(rawData.imageCount, rawData.videoCount, rawData.details);
    } else if (rawData.status === 'FAILED') {
      record.fail(rawData.details || 'Erro desconhecido');
    }

    return record;
  }
}
