import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto'; // Periksa import ini

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  async login(loginDto: LoginDto) { // Pastikan LoginDto digunakan di sini
    const user = await this.usersService.findOne(loginDto.username);
    if (user && user.password === loginDto.password) {
      const payload = { username: user.username, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }
}
