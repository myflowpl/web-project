import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '../config';
import { StoreModule } from '../store/store.module';
import { UsersAdminController } from './controllers/users-admin.controller';

@Module({
  imports: [
    StoreModule,
    // config sync
    // JwtModule.register({
    //   secret: process.env.JWT_SECRET,
    //   signOptions: {expiresIn: '4d'}
    // }),

    // config async
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.JWT_SECRET,
        signOptions: {expiresIn: '4d'}
      })
    }),
  ],
  controllers: [AuthController, UsersAdminController],
  providers: [UsersService, AuthService],
  exports: [UsersService, AuthService]
})
export class UsersModule {}
