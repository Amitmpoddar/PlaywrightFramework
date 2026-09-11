import { test, expect } from '../../fixtures/apiFixture';

import { LoginRequest } from '../../models/LoginRequest';
import { UsersTestData } from '../../models/UserTestData';

import users from '../../test-data/users.json';

import { JwtValidator } from '../../utils/jwtValidator';


const testData: UsersTestData = users;


test(
    'Validate JWT after successful login',
    async ({ authApi }) => {

        const loginData =
            new LoginRequest(
                testData.validUser.username,
                testData.validUser.password
            );


        const loginResponse =
            await authApi.login(loginData);


        // Validate token exists
        JwtValidator.validateTokenExists(
            loginResponse.accessToken
        );


        // Decode JWT
        const decodedToken =
            JwtValidator.decodeToken(
                loginResponse.accessToken
            );


        console.log(
            'Decoded JWT:',
            decodedToken
        );


        // Validate JWT payload
        expect(decodedToken)
            .toBeDefined();
    }
);

test(
    'Validate JWT expiration',
    async ({ authApi }) => {

        const loginData =
            new LoginRequest(
                testData.validUser.username,
                testData.validUser.password
            );


        const loginResponse =
            await authApi.login(loginData);


        const token =
            loginResponse.accessToken;


        JwtValidator.validateTokenExists(
            token
        );


        JwtValidator.validateExpiration(
            token
        );
    }
);