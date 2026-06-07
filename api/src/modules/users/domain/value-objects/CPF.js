"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CPF = void 0;
const value_object_base_1 = require("../../../../shared/domain/value-object.base");
class CPF extends value_object_base_1.ValueObject {
    constructor(props) {
        super(props);
    }
    get value() {
        return this.props.value;
    }
    static create(value) {
        const cleaned = value.replace(/\D/g, '');
        if (!this.isValid(cleaned)) {
            throw new Error('CPF inválido');
        }
        return new CPF({ value: cleaned });
    }
    static isValid(cpf) {
        if (cpf.length !== 11)
            return false;
        if (/^(\d)\1{10}$/.test(cpf))
            return false;
        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11)
            remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10)))
            return false;
        sum = 0;
        for (let i = 1; i <= 10; i++) {
            sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
        }
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11)
            remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11)))
            return false;
        return true;
    }
}
exports.CPF = CPF;
//# sourceMappingURL=CPF.js.map