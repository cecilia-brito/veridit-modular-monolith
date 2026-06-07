import { BaseEntity } from '../../../../shared/domain/entity.base';
export type RecordStatus = 'PENDING' | 'COMPLETED' | 'FAILED';
interface RecordProps {
    title: string;
    userId: string;
    siteUrl: string;
    startTime: Date;
    endTime?: Date;
    details?: string;
    status: RecordStatus;
    imageCount: number;
    videoCount: number;
}
export declare class Record extends BaseEntity<RecordProps> {
    private constructor();
    get title(): string;
    get userId(): string;
    get siteUrl(): string;
    get startTime(): Date;
    get endTime(): Date | undefined;
    get details(): string | undefined;
    get status(): RecordStatus;
    get imageCount(): number;
    get videoCount(): number;
    static create(props: Omit<RecordProps, 'startTime' | 'status' | 'imageCount' | 'videoCount'>, id?: string): Record;
    complete(imageCount: number, videoCount: number, details?: string): void;
    fail(details: string): void;
}
export {};
