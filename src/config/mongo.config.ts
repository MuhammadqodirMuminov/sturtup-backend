import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';
export const getMongoDbConfig = async (configService : ConfigService) : Promise<MongooseModuleOptions> => {
	return {
		uri : configService.get<string>('MOONGO_URI')
	}
}