import { ListRecordsUseCase } from '../../../application/ports/in/ListRecordsUseCase';
export declare class AuditController {
    private readonly listRecordsUseCase;
    constructor(listRecordsUseCase: ListRecordsUseCase);
    listUserRecords(userId: string): Promise<{
        id: string;
        title: string;
        siteUrl: string;
        status: import("../../../domain/entities/Record").RecordStatus;
        startTime: Date;
        endTime: Date;
        imageCount: number;
        videoCount: number;
        details: string;
    }[]>;
}
