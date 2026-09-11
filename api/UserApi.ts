import { APIResponse } from '@playwright/test';

import { ApiClient } from './ApiClient';
import { ApiError } from './ApiError';

import { UserResponse } from '../models/UserResponse';
import { CreateUserRequest } from '../models/CreateUserRequest';
import { UpdateUserRequest } from '../models/UpdateUserRequest';
import { PatchUserRequest } from '../models/PatchUserRequest';


export class UserApi {

    constructor(
        private apiClient: ApiClient
    ) {}


    // GET current logged-in user
    async getCurrentUser(): Promise<UserResponse> {

        const response =
            await this.apiClient.get('/auth/me');

        if (!response.ok()) {

            throw new ApiError(
                response.status(),
                'Get current user failed'
            );
        }

        const body =
            await response.json();

        return new UserResponse(
            body.id,
            body.username,
            body.email,
            body.firstName,
            body.lastName
        );
    }


    // GET user by ID
    async getUserById(
        id: number
    ): Promise<UserResponse> {

        const response =
            await this.apiClient.get(
                `/users/${id}`
            );

        if (!response.ok()) {

            throw new ApiError(
                response.status(),
                'Get user failed'
            );
        }

        const body =
            await response.json();

        return new UserResponse(
            body.id,
            body.username,
            body.email,
            body.firstName,
            body.lastName
        );
    }


    // GET raw API response
    async getUserResponse(
        id: number
    ): Promise<APIResponse> {

        return await this.apiClient.get(
            `/users/${id}`
        );
    }


    // POST create user
    async createUser(
        userRequest: CreateUserRequest
    ): Promise<UserResponse> {

        const response =
            await this.apiClient.post(
                '/users/add',
                userRequest
            );

        if (!response.ok()) {

            throw new ApiError(
                response.status(),
                'Create user failed'
            );
        }

        const body =
            await response.json();

        return new UserResponse(
            body.id,
            body.username,
            body.email,
            body.firstName,
            body.lastName
        );
    }


    // PUT update user
    async updateUser(
        id: number,
        userRequest: UpdateUserRequest
    ): Promise<UserResponse> {

        const response =
            await this.apiClient.put(
                `/users/${id}`,
                userRequest
            );

        if (!response.ok()) {

            throw new ApiError(
                response.status(),
                'Update user failed'
            );
        }

        const body =
            await response.json();

        return new UserResponse(
            body.id,
            body.username,
            body.email,
            body.firstName,
            body.lastName
        );
    }


    // PATCH update user partially
    async patchUser(
        id: number,
        userRequest: PatchUserRequest
    ): Promise<UserResponse> {

        const response =
            await this.apiClient.patch(
                `/users/${id}`,
                userRequest
            );

        if (!response.ok()) {

            throw new ApiError(
                response.status(),
                'Patch user failed'
            );
        }

        const body =
            await response.json();

        return new UserResponse(
            body.id,
            body.username,
            body.email,
            body.firstName,
            body.lastName
        );
    }


    // DELETE user
    async deleteUser(
        id: number
    ): Promise<void> {

        const response =
            await this.apiClient.delete(
                `/users/${id}`
            );

        if (!response.ok()) {

            throw new ApiError(
                response.status(),
                'Delete user failed'
            );
        }
    }
}