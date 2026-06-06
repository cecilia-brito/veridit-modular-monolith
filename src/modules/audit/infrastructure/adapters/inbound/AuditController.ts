import { Controller, Get, Param, Inject, HttpCode, HttpStatus } from '@nestjs/common';
import { ListRecordsUseCase, ListRecordsUseCaseToken } from '../../../../application/ports/in/ListRecordsUseCase';

@Controller('audit')
export class AuditController {
  constructor(
    @Inject(ListRecordsUseCaseToken)
    private readonly listRecordsUseCase: ListRecordsUseCase,
  ) {}

  @Get('records/:userId')
  @HttpCode(HttpStatus.OK)
  public async listUserRecords(@Param('userId') userId: string) {
    const records = await this.listRecordsUseCase.execute(userId);
    
    // Mapear para DTO de resposta para evitar expor objetos de domínio diretamente
    return records.map(record => ({
      id: record.id,
      title: record.title,
      siteUrl: record.siteUrl,
      status: record.status,
      startTime: record.startTime,
      endTime: record.endTime,
      imageCount: record.imageCount,
      videoCount: record.videoCount,
      details: record.details,
    }));
  }
}
