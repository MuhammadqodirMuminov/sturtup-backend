import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { RoleUser } from "./user.interface";

export type UserDocument = HydratedDocument<User>

@Schema({timestamps : true, versionKey : false})
export class User {
	@Prop({unique : true , required : true})
	email : string;

	@Prop({required : true})
	fullname : string;

	@Prop({required : true})
	password : string;

	@Prop()
	role : RoleUser
}

export const userSchema = SchemaFactory.createForClass(User)