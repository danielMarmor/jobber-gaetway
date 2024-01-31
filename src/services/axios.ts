import axios from 'axios';
import { config } from '@gateway/config';
import { sign } from 'jsonwebtoken'

export class AxiosService {
    public axios: ReturnType<typeof axios.create>
    constructor(baseUrl: string, serviceName: string) {
        this.axios = this.axiosCreateInstance(baseUrl, serviceName);
    }
    //CREATE INSTANCE
    public axiosCreateInstance(baseUrl: string, serviceName?: string): ReturnType<typeof axios.create> {
        let requestJWtToken = '';
        if (serviceName) {
            requestJWtToken = sign({ id: serviceName }, config.GATEWAY_JWT_TOKEN!)
        }
        const instance: ReturnType<typeof axios.create> = axios.create({
            baseURL: baseUrl,
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                gatewayToken: requestJWtToken
            },
            withCredentials: true
        });
        return instance;
    }
}

//const auth :AxiosService = new AxiosService("", "auth");
