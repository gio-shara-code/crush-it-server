interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export class User {
  firstName: string;
  lastName: string;
  email: string;
  id: string;

  constructor(fName: string, lName: string, email: string, id: string) {
    this.firstName = fName;
    this.lastName = lName;
    this.email = email;
    this.id = id;
  }

  toString() {
    return `firstName: ${this.firstName}, lastName: ${this.lastName}, email: ${this.email}, id: ${this.id}`;
  }
}
