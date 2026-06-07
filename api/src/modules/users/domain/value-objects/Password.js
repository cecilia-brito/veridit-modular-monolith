"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const value_object_base_1 = require("../../../../shared/domain/value-object.base");
const bcrypt = require("bcrypt");
class Password extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    static create(value) {
        if (value.length < 8) {
            throw new Error('A senha deve ter no mínimo 8 caracteres');
        }
        return new Password({ value, isHashed: false });
    }
    static createFromHash(hash) {
        return new Password({ value: hash, isHashed: true });
    }
    async getHashedValue() {
        if (this.props.isHashed) {
            return this.props.value;
        }
        return bcrypt.hash(this.props.value, 10);
    }
    async compare(plainText) {
        if (!this.props.isHashed) {
            return this.props.value === plainText;
        }
        return bcrypt.compare(plainText, this.props.value);
    }
}
exports.Password = Password;
//# sourceMappingURL=Password.js.map