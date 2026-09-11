export class UserResponse {

    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;

    constructor(
        id: number,
        username: string,
        email: string,
        firstName: string,
        lastName: string
    ) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}