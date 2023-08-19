import { Body, Controller, Post } from "@nestjs/common";
import { MailService } from "./mail.service";
import { SendOtpDto } from "./dto/senOtpDto";

@Controller("mail")
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post("send-otp")
  async sendOtp(@Body() dto: SendOtpDto) {
    return this.mailService.sendOtpVerification(dto.email, dto.isRegistered);
  }

  @Post("verify-otp")
  async verifyOtp(@Body() dto: { email: string; verificationCode: string }) {
    return this.mailService.verifyOtp(dto.email, dto.verificationCode);
  }
}
