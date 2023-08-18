import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OtpDocument = HydratedDocument<Otp>

@Schema({ timestamps: true, versionKey: false })
export class Otp {
	@Prop({  required: true })
	email: string;

	@Prop()
	otp: string;

	@Prop()
	exporeAt : Date;
}

export const otpSchema = SchemaFactory.createForClass(Otp)