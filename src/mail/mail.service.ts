import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectModel } from "@nestjs/mongoose";
import * as SendGrid from "@sendgrid/mail";
import { compare, genSalt, hash } from "bcryptjs";
import { Model } from "mongoose";
import { User, UserDocument } from "src/user/user.model";
import { Otp, OtpDocument } from "./otp.model";

@Injectable()
export class MailService {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(Otp.name) private otpModel: Model<OtpDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    SendGrid.setApiKey(this.configService.get<string>("SENDGRID_API_KEY"));
  }

  async sendOtpVerification(email: string, isRegistered: boolean = false) {
    if (!email) throw new ForbiddenException("Email is required.");

    if (isRegistered) {
      const existUser = await this.userModel.findOne({ email });
      if (!existUser) throw new UnauthorizedException("User not found");
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    const salt = await genSalt(10);
    const hashedOtp = await hash(String(otp), salt);

    const emailData = {
      to: email,
      subject: "Email Verification",
      from: "muhammadqodirmuminov0@gmail.com",
      text: "Verify your email end enjoy free courses.",
      html: `<h1>Verifivation code : ${otp} </h1>`,
    };

    const newOtp = await this.otpModel.create({
      email,
      otp: hashedOtp,
      exporeAt: Date.now() + 3600000,
    });

    const transport = await SendGrid.send(emailData);
    return "Success";
  }

  async verifyOtp(email: string, otpVerification: string) {
    const existUserOtp = await this.otpModel.find({ email });

    if (existUserOtp?.slice(-1)[0]?.exporeAt) {
      const { exporeAt, otp } = existUserOtp?.slice(-1)[0];

      if (exporeAt < new Date()) {
        await this.otpModel.deleteMany({ email });
        throw new BadRequestException("Your code is expired.");
      }
      const validOtp = await compare(otpVerification, otp);
      if (!validOtp)
        throw new BadRequestException(
          "Your code is not valid. please check your email or try again",
        );

      await this.otpModel.deleteMany({ email });
      return "Success";
    }
  }
}
