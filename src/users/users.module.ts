import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user.entity';
import { Profile } from './models/profile.entity';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
    RolesModule,
    PermissionsModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
