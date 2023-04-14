// https://www.typescriptlang.org/play?experimentalDecorators=true&emitDecoratorMetadata=true&target=9&ssl=7&ssc=1&pln=8&pc=1&useDefineForClassFields=false#code/GYVwdgxgLglg9mABAWRmAFAGxgWxlALkTBBwCMBTAJwEpEBvAWAChFEqKoQqlRJYEidFACGVAOaciAeTIArCtAA0iAA5U4q6lACeAaQo6iAZyhU04uk1ZtEmTogBuIzCAomzFgNwtbiCAimiJJQUNSIALyIfNDwSOhWvn7snNxIzq4UPjZsAL7ZfgFgxnD2AHSYcOLoAKrG1GXqcFDNOloRHaISnDRJbEVB9aHhUTEC8WAUAO4Aai4e5mCWDH22A6UUFVXoAERDYVQ7KpOzLjQFyTDAQidzmBUUS1AAFogAPHa4+Ik5yWxdITK1A0VGMUQABgBNODcNQiYzGKZwKgAE0QxmeMMwaMoiDIMHEkioiBeIiQABJ6Ng8FBckpKbcXLlwas8ogKJh6itfn4Mm5IsRpncLn5cqt8qtZApoGUURRgGgKAAFDRaKi6YRiEIqJpq3QGHQqax-EJEEIHJSs9FSa3DKji85JCXMMXMFgQTDw4yIOrhY2IED1HgiHDudGeJYXAACqAwAA5ejZVF6kaiFt4kgMzCBoMj0IHqGAQ2HTItxDqU8iUemlj8-C8YMYygXg6GBS2i6GRSTno3GpXUQLkwjUyiLq7XetypVqgByUxiKCzxPuwJQRAosk6X3EqInH1B3YAQXsAA8jogdgBGABMAGYACw7R3MTdgbdB-sjqsCnYPgCsABsADsOzZFOmwzugs5vjuBCzkob4ftQL4QVsc47ghB4NE0LS6FoK7MEAA
function Min(limit: number) {
  return function (target: Object, propertyKey: string) {
    let value: string;
    const getter = function () {
      return value;
    };
    console.log(User.prototype === target);
    const setter = function (newVal: string) {
      console.log("setter", newVal);
      if (newVal.length < limit) {
        // @ts-ignore
        target.errors = `Your password should be bigger than ${limit},${newVal}`;
      } else {
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
  username: string;
  @Min(8)
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
console.log('start');

const danyUser = new User("Alex", "1234");
danyUser.password = "4567";
console.log('danUser:', danyUser);
console.log('User', User.prototype);
