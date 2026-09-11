import { APIRequestContext } from '@playwright/test';

import { LoginRequest } from '../models/LoginRequest';
import { LoginResponse } from '../models/LoginResponse';
import { ApiError } from './ApiError';


export class AuthApi {

    constructor(
        private request: APIRequestContext
    ) {}


    async login(
        loginRequest: LoginRequest
    ): Promise<LoginResponse> {

        const response = await this.request.post(
            '/auth/login',
            {
                data: {
                    username: loginRequest.username,
                    password: loginRequest.password,
                    expiresInMins: 30
                }
            }
        );


        if (!response.ok()) {

            throw new ApiError(
                response.status(),
                'Login failed'
            );
        }


        const body = await response.json();


        return new LoginResponse(
            body.accessToken,
            body.refreshToken,
            body.id,
            body.username,
            body.email
        );
    }
}