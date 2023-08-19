import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { genSalt, hash } from "bcryptjs";
import { Model } from "mongoose";
import { IEditPassword } from "./user.interface";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

  async byId(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException("User not found");

    return user;
  }

  async editPassword({ email, password }: IEditPassword) {
    const existUser = await this.userModel.findOne({ email });
    if (!existUser) throw new UnauthorizedException("User not Found with this email.");

    const salt = await genSalt(10);
    const hashPassword = await hash(password, salt);

    await this.userModel.findByIdAndUpdate(existUser.id, { $set: { password: hashPassword } });

		return "Success"
  }
}
