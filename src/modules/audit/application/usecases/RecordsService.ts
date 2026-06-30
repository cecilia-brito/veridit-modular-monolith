import { Inject, Injectable } from '@nestjs/common';
import { RecordsUseCase } from '../ports/in/RecordsUseCase';
import { Record } from '../../domain/entities/Record';
import { RecordRepositoryPort, RecordRepositoryPortToken } from '../ports/out/RecordRepositoryPort';

@Injectable()
export class RecordsService implements RecordsUseCase {
  constructor(
    @Inject(RecordRepositoryPortToken)
    private readonly recordRepository: RecordRepositoryPort,
  ) { }

  public async list(userId: string): Promise<Record[]> {
    return this.recordRepository.findByUserId(userId);
  }

  public async fetch(recordId: string): Promise<Record> {
    return this.recordRepository.findById(recordId);
  }

}
