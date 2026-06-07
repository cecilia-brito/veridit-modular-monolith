"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Record = void 0;
const entity_base_1 = require("../../../../shared/domain/entity.base");
class Record extends entity_base_1.BaseEntity {
    constructor(props, id) {
        super(props, id);
    }
    get title() { return this.props.title; }
    get userId() { return this.props.userId; }
    get siteUrl() { return this.props.siteUrl; }
    get startTime() { return this.props.startTime; }
    get endTime() { return this.props.endTime; }
    get details() { return this.props.details; }
    get status() { return this.props.status; }
    get imageCount() { return this.props.imageCount; }
    get videoCount() { return this.props.videoCount; }
    static create(props, id) {
        return new Record({
            ...props,
            status: 'PENDING',
            startTime: new Date(),
            imageCount: 0,
            videoCount: 0,
        }, id);
    }
    complete(imageCount, videoCount, details) {
        this.props.status = 'COMPLETED';
        this.props.endTime = new Date();
        this.props.imageCount = imageCount;
        this.props.videoCount = videoCount;
        if (details)
            this.props.details = details;
    }
    fail(details) {
        this.props.status = 'FAILED';
        this.props.endTime = new Date();
        this.props.details = details;
    }
}
exports.Record = Record;
//# sourceMappingURL=Record.js.map