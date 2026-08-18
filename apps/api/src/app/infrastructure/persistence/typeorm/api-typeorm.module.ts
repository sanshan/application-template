import { Module } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApiConfigModule } from '../../config/api-config.module';
import { apiConfig } from '../../config/api.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ApiConfigModule],
            inject: [apiConfig.KEY],
            useFactory: (config: ConfigType<typeof apiConfig>) => {
                const { name, host, port, username, password } = config.database;

                return {
                    type: 'postgres' as const,
                    host,
                    port,
                    username,
                    password,
                    database: name,
                    synchronize: false,
                    logging: false,
                    autoLoadEntities: true,
                };
            },
        }),
    ],
    exports: [TypeOrmModule],
})
export class ApiTypeormModule {}
