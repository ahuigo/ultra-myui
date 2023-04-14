var __decorate = function (decorators, target, key, desc) {
    var c = arguments.length;
    var r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc
    var d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Min(limit) {
    return function (target, propertyKey) {
        let value;
        const getter = function () {
            return value;
        };
        const setter = function (newVal) {
            console.log("setter", newVal);
            if (newVal.length < limit) {
                Object.defineProperty(target, 'errors', {
                    value: `Your password should be bigger than ${limit}`
                });
            }
            else {
                value = newVal;
            }
        };
        Object.defineProperty(target, propertyKey, {
            get: getter,
            set: setter
        });
    };
}
class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
}
__decorate([
    Min(8)
], User.prototype, "password", void 0);
console.log('start....');
const danyUser = new User("dany", "pass");
danyUser.password = "aaaa";
console.log(danyUser);
console.log(danyUser.errors);
