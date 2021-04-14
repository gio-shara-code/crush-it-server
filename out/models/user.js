"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(fName, lName, email, id) {
        this.firstName = fName;
        this.lastName = lName;
        this.email = email;
        this.id = id;
    }
    User.prototype.toString = function () {
        return "firstName: " + this.firstName + ", lastName: " + this.lastName + ", email: " + this.email + ", id: " + this.id;
    };
    return User;
}());
exports.User = User;
