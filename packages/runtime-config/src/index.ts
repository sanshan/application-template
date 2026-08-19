import { z } from 'zod';

export const PortSchema = z.coerce.number().int().min(1).max(65535);

export const PortsEnvSchema = z.object({
    API_PORT: PortSchema.default(3000),
    WEB_PORT: PortSchema.default(4200),
});
