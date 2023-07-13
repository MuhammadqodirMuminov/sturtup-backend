import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User, userSchema } from './user.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: userSchema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
