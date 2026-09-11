export class CreateUserRequest {

    constructor(
        public firstName: string,
        public lastName: string,
        public age: number
    ) {

        if (!firstName) {
            throw new Error(
                'firstName is required'
            );
        }

        if (!lastName) {
            throw new Error(
                'lastName is required'
            );
        }

        if (age <= 0) {
            throw new Error(
                'age must be greater than 0'
            );
        }
    }
}