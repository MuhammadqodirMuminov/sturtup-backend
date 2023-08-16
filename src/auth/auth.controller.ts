import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login.dto';
import { RegisterAuthDto } from './dto/register.dto';
import { TokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	async register(@Body() dto: RegisterAuthDto) {
		return await this.authService.register(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: LoginAuthDto) {
		return await this.authService.login(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('access')
	async getnewTokens(@Body() dto: TokenDto) {
		return await this.authService.getnewTokens(dto);
	}
}
