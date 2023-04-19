import { DataSource } from 'typeorm';
import { Token } from './entities/tokens.entity';

export const usersProviders = [
  {
    provide: 'TOKEN_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Token),
    inject: ['DATA_SOURCE'],
  },
];
