"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const entity_base_1 = require("../../../../shared/domain/entity.base");
class User extends entity_base_1.BaseEntity {
    constructor(props, id) {
        super(props, id);
    }
    get fullName() { return this.props.fullName; }
    get email() { return this.props.email; }
    get password() { return this.props.password; }
    get cpf() { return this.props.cpf; }
    get role() { return this.props.role; }
    get oabNumber() { return this.props.oabNumber; }
    get isActive() { return this.props.isActive; }
    get createdAt() { return this.props.createdAt; }
    static create(props, id) {
        if (props.role === 'LAWYER' && !props.oabNumber) {
            throw new Error('Advogados precisam informar o número da OAB');
        }
        return new User({
            ...props,
            isActive: true,
            createdAt: new Date(),
        }, id);
    }
    deactivate() {
        this.props.isActive = false;
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map