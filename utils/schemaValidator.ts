import Ajv2020, { ValidateFunction } from 'ajv/dist/2020';

export class SchemaValidator {

    private ajv: Ajv2020;

    constructor() {
        this.ajv = new Ajv2020();
    }

    validate<T>(
        data: T,
        schema: object
    ): void {

        const validate: ValidateFunction =
            this.ajv.compile(schema);

        const isValid = validate(data);

        if (!isValid) {

            const errors = validate.errors
                ?.map(error =>
                    `${error.instancePath || 'response'} ${error.message}`
                )
                .join('\n');

            throw new Error(
                `Schema validation failed:\n${errors}`
            );
        }
    }
}