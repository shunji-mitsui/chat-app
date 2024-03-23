import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserAuth } from './auth.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([UserAuth]),
    JwtModule.register({ secret: 'secret-key' }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
