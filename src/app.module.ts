import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { getMongoDbConfig } from './config/mongo.config';
import { CourseModule } from './course/course.module';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ ConfigModule.forRoot(), MongooseModule.forRootAsync({ 
  imports : [ConfigModule],
  inject : [ConfigService],
  useFactory : getMongoDbConfig
  }) , AuthModule, CourseModule, UserModule, MailModule]
})
export class AppModule {}
