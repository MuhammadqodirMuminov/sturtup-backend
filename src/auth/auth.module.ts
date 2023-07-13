import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from '../user/user.model';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { getJwtConfig } from 'src/config/jwt.config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: userSchema }]), ConfigModule, 
  JwtModule.registerAsync({
    imports : [ConfigModule],
    inject : [ConfigService],
    useFactory : getJwtConfig
  })],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
