import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { UserDocument } from "src/user/user.model";

@Injectable()
export class OnlyAdminGuard implements CanActivate {
	constructor(private reflector: Reflector){}
	
	canActivate(context: ExecutionContext): boolean {
		const request = context.switchToHttp().getRequest<{user : UserDocument}>();

		const user = request.user;

		if(user.role !== "ADMIN") {
			throw new ForbiddenException("You are not allowed to access this actions.");
		}

		return user.role === "ADMIN" && true;
	}
}