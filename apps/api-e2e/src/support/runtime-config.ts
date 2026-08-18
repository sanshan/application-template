import { z } from 'zod';

const ApiE2eRuntimeEnvSchema = z.object({
    HOST: z.string().min(1).default('localhost'),
    API_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
});

export function getApiE2eRuntimeConfig() {
    const env = ApiE2eRuntimeEnvSchema.parse(process.env);

    return {
        host: env.HOST,
        port: env.API_PORT,
        baseUrl: `http://${env.HOST}:${env.API_PORT}`,
    };
}
