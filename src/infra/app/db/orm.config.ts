import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function createOptions(
  configService: ConfigService,
): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: configService.get('POSTGRES_DB_HOST'),
    port: parseInt(<string>configService.get('POSTGRES_DB_PORT')),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    entities: [__dirname + '/../../**/*.db-entity.{ts,js}'],
    autoLoadEntities: true,
    synchronize: configService.get('NODE_ENV') !== 'production',
  };
}

export const OrmConfig = {
  type: 'postgres',
  host: process.env.POSTGRES_DB_HOST,
  port: parseInt(<string>process.env.POSTGRES_DB_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [__dirname + '/../../**/*.db-entity.{ts,js}'],
  autoLoadEntities: true,
  migrationsTableName: 'migrations',
  migrations: ['database/migrations/*.ts'],
  cli: {
    migrationsDir: 'database/migrations',
  },
};
export default OrmConfig;
