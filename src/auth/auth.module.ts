import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module'; // Impor UsersModule

@Module({
  imports: [
    UsersModule, // Tambahkan UsersModule di sini
    PassportModule,
    JwtModule.register({
      secret: 'your_jwt_secret_key', // Gantilah dengan kunci rahasia yang sesuai
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
