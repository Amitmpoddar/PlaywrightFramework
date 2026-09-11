export class PatchUserRequest {

    constructor(
        public age: number
    ) {

        if (age <= 0) {
            throw new Error(
                'age must be greater than 0'
            );
        }
    }
}