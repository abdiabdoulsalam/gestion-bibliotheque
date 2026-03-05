/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CreateUserDto } from 'src/user/dto/user.dto';
import { UserService } from './../user/user.service';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import type { Response, Request } from 'express';
import { User } from 'src/user/entities/user.entites';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const { password, ...dto } = createUserDto;
    if (!password) {
      throw new Error('Password is required');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await this.userService.create({
      ...dto,
      password: hashedPassword,
    });

    return { message: 'user created successfully', user };
  }

  async login(loginDto: LoginDto, response: Response) {
    const { email, ...dto } = loginDto;
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (!(await bcrypt.compare(dto.password, user.password))) {
      throw new BadRequestException('invalid credentials');
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });
    response.cookie('jwt', jwt, { httpOnly: true });
    return {
      message: 'login succes',
    };
  }

  async session(request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.userService.findOne(data.id);
      const { password, ...userDto } = user;
      return userDto;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
