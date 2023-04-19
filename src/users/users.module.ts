import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { usersProviders } from './users.providers';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule } from 'src/role/role.module';
import { GenderModule } from 'src/gender/gender.module';
import { PositionModule } from 'src/position/position.module';
import { BranchModule } from 'src/branch/branch.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RoleModule,
    GenderModule,
    PositionModule,
    BranchModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
