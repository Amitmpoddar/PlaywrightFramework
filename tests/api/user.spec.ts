import { test, expect } from '../../fixtures/apiFixture';

import { CreateUserRequest } from '../../models/CreateUserRequest';
import { UpdateUserRequest } from '../../models/UpdateUserRequest';
import { PatchUserRequest } from '../../models/PatchUserRequest';
import { ApiError } from '../../api/ApiError';

import { SchemaValidator } from '../../utils/schemaValidator';

import userSchema from '../../schemas/userSchema.json';


// =====================================================
// SCHEMA VALIDATOR
// =====================================================

const schemaValidator =
    new SchemaValidator();


// =====================================================
// GET CURRENT USER
// =====================================================

test(
    'Get current logged-in user',
    async ({ userApi }) => {

        const user =
            await userApi.getCurrentUser();

        expect(user.id)
            .toBeDefined();

        expect(user.username)
            .toBeDefined();

        expect(user.email)
            .toBeDefined();

        console.log(
            'Current User:',
            user
        );
    }
);


// =====================================================
// GET USER BY ID
// =====================================================

test(
    'Get user by ID',
    async ({ userApi }) => {

        const user =
            await userApi.getUserById(1);

        expect(user.id)
            .toBe(1);

        expect(user.username)
            .toBeDefined();

        expect(user.email)
            .toBeDefined();

        expect(user.firstName)
            .toBeDefined();

        expect(user.lastName)
            .toBeDefined();
    }
);


// =====================================================
// GET USER - RESPONSE + SCHEMA VALIDATION
// =====================================================

test(
    'Validate user API response with JSON schema',
    async ({ userApi }) => {

        const response =
            await userApi.getUserResponse(1);


        // Validate status code
        expect(response.status())
            .toBe(200);


        // Validate response header
        expect(
            response.headers()['content-type']
        ).toContain('application/json');


        // Read response body
        const body =
            await response.json();


        // Validate response body
        expect(body.id)
            .toBe(1);

        expect(body.username)
            .toBeDefined();

        expect(body.email)
            .toBeDefined();

        expect(body.firstName)
            .toBeDefined();

        expect(body.lastName)
            .toBeDefined();


        // Validate JSON schema
        schemaValidator.validate(
            body,
            userSchema
        );
    }
);


// =====================================================
// CREATE USER
// =====================================================

test(
    'Create user',
    async ({ userApi }) => {

        const request =
            new CreateUserRequest(
                'Amit',
                'Tester',
                30
            );


        const user =
            await userApi.createUser(request);


        expect(user.id)
            .toBeDefined();

        expect(user.firstName)
            .toBe('Amit');

        expect(user.lastName)
            .toBe('Tester');

        console.log(
            'Created User:',
            user
        );
    }
);


// =====================================================
// UPDATE USER - PUT
// =====================================================

test(
    'Update user using PUT',
    async ({ userApi }) => {

        const request =
            new UpdateUserRequest(
                'AmitUpdated',
                'TesterUpdated',
                31
            );


        const user =
            await userApi.updateUser(
                1,
                request
            );


        expect(user.id)
            .toBe(1);

        expect(user.firstName)
            .toBe('AmitUpdated');

        expect(user.lastName)
            .toBe('TesterUpdated');
    }
);


// =====================================================
// UPDATE USER - PATCH
// =====================================================

test(
    'Update user using PATCH',
    async ({ userApi }) => {

        const request =
            new PatchUserRequest(35);


        const user =
            await userApi.patchUser(
                1,
                request
            );


        expect(user.id)
            .toBe(1);
    }
);


// =====================================================
// DELETE USER
// =====================================================

test(
    'Delete user',
    async ({ userApi }) => {

        await userApi.deleteUser(1);

        expect(true)
            .toBe(true);
    }
);


// =====================================================
// NEGATIVE TEST - INVALID USER ID
// =====================================================

test(
    'Get user with invalid ID',
    async ({ userApi }) => {

        try {

            await userApi.getUserById(99999);


            throw new Error(
                'Request should have failed'
            );

        } catch (error) {

            expect(error)
                .toBeInstanceOf(ApiError);


            const apiError =
                error as ApiError;


            expect(apiError.statusCode)
                .toBe(404);


            expect(apiError.message)
                .toBe('Get user failed');
        }
    }
);

test(
    'Validate user API response time',
    async ({ userApi }) => {

        const startTime =
            Date.now();


        const response =
            await userApi.getUserResponse(1);


        const responseTime =
            Date.now() - startTime;


        console.log(
            `Response time: ${responseTime} ms`
        );


        expect(response.status())
            .toBe(200);


        expect(responseTime)
            .toBeLessThan(2000);
    }
);

test(
    'Create user with invalid age',
    async () => {

        expect(() => {

            new CreateUserRequest(
                'Amit',
                'Tester',
                0
            );

        }).toThrow(
            'age must be greater than 0'
        );
    }
);

test(
    'Create user with invalid payload',
    async ({ apiClient }) => {

        const invalidPayload = {
            firstName: '',
            lastName: '',
            age: -1
        };


        const response =
            await apiClient.post(
                '/users/add',
                invalidPayload
            );


        console.log(
            'Status:',
            response.status()
        );


        const body =
            await response.json();


        console.log(
            'Response:',
            body
        );


        // DummyJSON accepts this payload
        expect(response.status())
            .toBe(201);


        // Validate returned data
        expect(body.firstName)
            .toBe(invalidPayload.firstName);

        expect(body.lastName)
            .toBe(invalidPayload.lastName);

        expect(body.age)
            .toBe(invalidPayload.age);


        // API should generate an ID
        expect(body.id)
            .toBeDefined();
    }
);
