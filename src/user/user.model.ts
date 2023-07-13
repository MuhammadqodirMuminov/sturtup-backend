import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
	@Prop({unique : true , required : true})
	email : string;

	@Prop({required : true})
	fullname : string;

	@Prop({required : true})
	passwordHash : string;
}

export const userSchema = SchemaFactory.createForClass(User)