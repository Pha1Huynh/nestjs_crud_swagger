import { DataSource } from 'typeorm';
import { PositionCategories } from './entities/positionCategories.entity';

export const positionCategoriesProviders = [
  {
    provide: 'POSITIONCATEGORIES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PositionCategories),
    inject: ['DATA_SOURCE'],
  },
];
