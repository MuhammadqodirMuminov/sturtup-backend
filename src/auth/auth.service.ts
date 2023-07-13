import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.model';

@Injectable()
export class AuthService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

	async register () {

		const newUser = new this.userModel({
			fullname : "MM",
			passwordHash : "123456",
			email : "user@example.com"
		})

		return newUser.save();
	}
}
