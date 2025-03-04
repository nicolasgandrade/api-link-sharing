import { DataSource } from 'typeorm';
import { LinkButtonEntity } from './entities/link-button.entity';
import { PageEntity } from './entities/page.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'link-sharing',
  entities: [PageEntity, LinkButtonEntity],
  synchronize: true,
  logging: false,
});
