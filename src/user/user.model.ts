import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { RoleUser } from "./user.interface";

export type UserDocument = HydratedDocument<User>

@Schema({timestamps : true, versionKey : false})
export class User {
	@Prop({ required : true})
	email : string;

	@Prop()
	fullname : string;

	@Prop({required : true})
	password : string;

	@Prop()
	role : RoleUser
}

export const userSchema = SchemaFactory.createForClass(User)