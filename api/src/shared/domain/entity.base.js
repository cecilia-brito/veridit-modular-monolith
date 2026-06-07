"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEntity = void 0;
class BaseEntity {
    constructor(props, id) {
        this._id = id || Math.random().toString(36).substring(2, 11);
        this.props = props;
    }
    get id() {
        return this._id;
    }
}
exports.BaseEntity = BaseEntity;
//# sourceMappingURL=entity.base.js.map