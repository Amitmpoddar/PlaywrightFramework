export class LoginResponse {

    accessToken: string;
    refreshToken: string;
    id: number;
    username: string;
    email: string;

    constructor(
        accessToken: string,
        refreshToken: string,
        id: number,
        username: string,
        email: string
    ) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.id = id;
        this.username = username;
        this.email = email;
    }
}