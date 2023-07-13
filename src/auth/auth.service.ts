import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { compare, genSalt, hash } from "bcryptjs";
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/user.model';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>, private readonly jwtService : JwtService) {}

	async register (dto : RegisterAuthDto) {

		const existUser = await this.isExistUser(dto.email);
		if(existUser) {
			throw new BadRequestException("User with that email already exists")
		}

		const salt =  await genSalt(10);
		const hashedPassword = await hash(dto.password, salt);

		const newUser = await this.userModel.create({...dto, password : hashedPassword})

		const token = await this.issueTokenPair(String(newUser._id))

		newUser.save()
		return {user : this.getUserField(newUser), ...token}
	}

	async login(dto : LoginAuthDto) {
		
		const existUser = await this.isExistUser(dto.email);
		if(!existUser) {
			throw new BadRequestException("User not found")
		}
		
		const currentPassword = await compare(dto.password, existUser.password)
		if(!currentPassword) {
			throw new BadRequestException("password does not much." )
		}

		const token = await this.issueTokenPair(String(existUser._id))

		return {user : this.getUserField(existUser), ...token}
	}

	async getnewTokens({ refreshToken }: TokenDto) {
		if(!refreshToken) throw new UnauthorizedException("Token is required.");

		const checkToken = await this.jwtService.verifyAsync(refreshToken);

		if(!checkToken) throw new UnauthorizedException("Invalid token or expired.");

		const user =  await this.userModel.findById(checkToken._id);

		const token = await this.issueTokenPair(String(user._id))

		return {user : this.getUserField(user), ...token}
	} 	

	async isExistUser (email : string) : Promise<UserDocument> {
		const existUser = await this.userModel.findOne({email})
		return existUser;
	}

	async issueTokenPair (userId : string) {
		const data = { _id : userId };

		const refreshToken = await this.jwtService.signAsync(data, { expiresIn : '15d' });

		const accessToken =  await this.jwtService.signAsync(data, {expiresIn : '1h'});

		return {accessToken, refreshToken};
	}

	getUserField(user :UserDocument) {
		return {
			id: user._id,
			email : user.email,
			passpord : user.password,
			fullname : user.fullname
		}
	}
}
