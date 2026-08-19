import { PortsEnvSchema } from '@application-template/runtime-config';
import { z } from 'zod';

const ApiE2eRuntimeEnvSchema = PortsEnvSchema.pick({
    API_PORT: true,
}).extend({
    HOST: z.string().min(1).default('localhost'),
});

export function getApiE2eRuntimeConfig() {
    const env = ApiE2eRuntimeEnvSchema.parse(process.env);

    return {
        host: env.HOST,
        port: env.API_PORT,
        baseUrl: `http://${env.HOST}:${env.API_PORT}`,
    };
}
