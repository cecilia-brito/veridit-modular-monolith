import { Inject, Injectable } from '@nestjs/common';
import { ListRecordsUseCase } from '../ports/in/ListRecordsUseCase';
import { Record } from '../../domain/entities/Record';
import { RecordRepositoryPort, RecordRepositoryPortToken } from '../ports/out/RecordRepositoryPort';

@Injectable()
export class ListRecordsService implements ListRecordsUseCase {
  constructor(
    @Inject(RecordRepositoryPortToken)
    private readonly recordRepository: RecordRepositoryPort,
  ) {}

  public async execute(userId: string): Promise<Record[]> {
    return this.recordRepository.findByUserId(userId);
  }
}
