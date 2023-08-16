import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/user/user.model';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { Otp, otpSchema } from './otp.model';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: Otp.name, schema: otpSchema },
      { name: User.name, schema: userSchema },
    ]),
  ],
  controllers: [MailController],
  providers: [MailService]
})
export class MailModule { }
