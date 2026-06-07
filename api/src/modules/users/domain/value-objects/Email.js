"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const value_object_base_1 = require("../../../../shared/domain/value-object.base");
class Email extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    static create(value) {
        if (!this.isValid(value)) {
            throw new Error('Formato de e-mail inválido');
        }
        return new Email({ value: value.toLowerCase().trim() });
    }
    static isValid(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map