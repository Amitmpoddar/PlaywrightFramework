import { test as base, expect, request } from '@playwright/test';

import { ApiClient } from '../api/ApiClient';
import { AuthApi } from '../api/AuthApi';
import { UserApi } from '../api/UserApi';

import { LoginRequest } from '../models/LoginRequest';
import { UsersTestData } from '../models/UserTestData';

import users from '../test-data/users.json';

import { ENV } from '../config/env';


type ApiFixtures = {
    authApi: AuthApi;
    apiClient: ApiClient;
    userApi: UserApi;
};


const testData: UsersTestData = users;


export const test = base.extend<ApiFixtures>({

    // Authentication API
    authApi: async ({}, use) => {

        const apiRequest = await request.newContext({
            baseURL: ENV.apiBaseURL,
            ignoreHTTPSErrors: true
        });

        const authApi = new AuthApi(apiRequest);

        await use(authApi);

        await apiRequest.dispose();
    },


    // Authenticated API Client
    apiClient: async ({}, use) => {

        const apiRequest = await request.newContext({
            baseURL: ENV.apiBaseURL,
            ignoreHTTPSErrors: true
        });


        // Create Auth API
        const authApi = new AuthApi(apiRequest);


        // Get credentials from test data
        const loginData = new LoginRequest(
            testData.validUser.username,
            testData.validUser.password
        );


        // Login
        const loginResponse = await authApi.login(loginData);


        // Get JWT token
        const token = loginResponse.accessToken;


        // Validate JWT
        if (!token) {
            throw new Error(
                'JWT accessToken was not returned from login API'
            );
        }


        // Create authenticated API client
        const apiClient = new ApiClient(
            apiRequest,
            token
        );


        await use(apiClient);

        await apiRequest.dispose();
    },


    // User API
    userApi: async ({ apiClient }, use) => {

        const userApi = new UserApi(apiClient);

        await use(userApi);
    }

});


export { expect };