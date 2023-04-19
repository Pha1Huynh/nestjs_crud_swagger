import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { PositionModule } from './position/position.module';

import { RoleModule } from './role/role.module';
import { BranchModule } from './branch/branch.module';
import { GenderModule } from './gender/gender.module';

import configuration from './config/configuration';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    AuthModule,
    PositionModule,

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'postgres',

      synchronize: false,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/src/migrations/*{.js,.ts}'],
      migrationsRun: true,
    }),
    GenderModule,
    BranchModule,
    RoleModule,
  ],

  controllers: [AppController],
})
export class AppModule {}
