import { Controller, Get, Param, Inject, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { RecordsUseCase, RecordsUseCaseToken } from '../../../application/ports/in/RecordsUseCase';
import { JwtAuthGuard } from 'src/shared/infrastructure/auth/jwt-auth.guard';

@Controller('audit')
export class AuditController {
  constructor(
    @Inject(RecordsUseCaseToken)
    private readonly recordsUseCase: RecordsUseCase,
  ) { }

  @Get('records/:userId')
  @HttpCode(HttpStatus.OK)
  public async listUserRecords(@Param('userId') userId: string) {
    const records = await this.recordsUseCase.list(userId);

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

  @Get('records/details/:recordId')
  @HttpCode(HttpStatus.OK)
  public async fetchRecord(@Param('recordId') recordId: string) {
    const record = await this.recordsUseCase.fetch(recordId);

    // Mapear para DTO de resposta para evitar expor objetos de domínio diretamente
    return {
      id: record.id,
      title: record.title,
      siteUrl: record.siteUrl,
      status: record.status,
      startTime: record.startTime,
      endTime: record.endTime,
      imageCount: record.imageCount,
      videoCount: record.videoCount,
      details: record.details,
    };
  }
}
