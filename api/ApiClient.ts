import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {

    constructor(
        private request: APIRequestContext,
        private token?: string
    ) {}


    async get(
        endpoint: string
    ): Promise<APIResponse> {

        return await this.request.get(
            endpoint,
            {
                headers: this.getHeaders()
            }
        );
    }


    async post(
        endpoint: string,
        data?: object
    ): Promise<APIResponse> {

        return await this.request.post(
            endpoint,
            {
                data,
                headers: this.getHeaders()
            }
        );
    }


    async put(
        endpoint: string,
        data?: object
    ): Promise<APIResponse> {

        return await this.request.put(
            endpoint,
            {
                data,
                headers: this.getHeaders()
            }
        );
    }


    async patch(
        endpoint: string,
        data?: object
    ): Promise<APIResponse> {

        return await this.request.patch(
            endpoint,
            {
                data,
                headers: this.getHeaders()
            }
        );
    }


    async delete(
        endpoint: string
    ): Promise<APIResponse> {

        return await this.request.delete(
            endpoint,
            {
                headers: this.getHeaders()
            }
        );
    }


    private getHeaders(): Record<string, string> {

        const headers: Record<string, string> = {

            'Content-Type': 'application/json',

            'Accept': 'application/json'
        };


        if (this.token) {

            headers['Authorization'] =
                `Bearer ${this.token}`;
        }


        return headers;
    }
}