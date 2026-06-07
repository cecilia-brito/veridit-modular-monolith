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

export class Record extends BaseEntity<RecordProps> {
  private constructor(props: RecordProps, id?: string) {
    super(props, id);
  }

  get title(): string { return this.props.title; }
  get userId(): string { return this.props.userId; }
  get siteUrl(): string { return this.props.siteUrl; }
  get startTime(): Date { return this.props.startTime; }
  get endTime(): Date | undefined { return this.props.endTime; }
  get details(): string | undefined { return this.props.details; }
  get status(): RecordStatus { return this.props.status; }
  get imageCount(): number { return this.props.imageCount; }
  get videoCount(): number { return this.props.videoCount; }

  public static create(props: Omit<RecordProps, 'startTime' | 'status' | 'imageCount' | 'videoCount'>, id?: string): Record {
    return new Record({
      ...props,
      status: 'PENDING',
      startTime: new Date(),
      imageCount: 0,
      videoCount: 0,
    }, id);
  }

  public complete(imageCount: number, videoCount: number, details?: string): void {
    this.props.status = 'COMPLETED';
    this.props.endTime = new Date();
    this.props.imageCount = imageCount;
    this.props.videoCount = videoCount;
    if (details) this.props.details = details;
  }

  public fail(details: string): void {
    this.props.status = 'FAILED';
    this.props.endTime = new Date();
    this.props.details = details;
  }
}
