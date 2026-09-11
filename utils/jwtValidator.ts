import jwt, {
    JwtPayload
} from 'jsonwebtoken';


export class JwtValidator {


    static decodeToken(
        token: string
    ): JwtPayload {

        const decoded =
            jwt.decode(token);


        if (
            !decoded ||
            typeof decoded === 'string'
        ) {

            throw new Error(
                'Invalid JWT token'
            );
        }


        return decoded;
    }


    static validateTokenExists(
        token: string
    ): void {

        if (
            !token ||
            token.trim() === ''
        ) {

            throw new Error(
                'JWT token is empty'
            );
        }
    }


    static validateExpiration(
        token: string
    ): void {

        const decoded =
            this.decodeToken(token);


        if (!decoded.exp) {

            throw new Error(
                'JWT does not contain exp claim'
            );
        }


        const currentTime =
            Math.floor(
                Date.now() / 1000
            );


        if (
            decoded.exp <= currentTime
        ) {

            throw new Error(
                'JWT token is expired'
            );
        }
    }
}