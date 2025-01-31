import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Pastikan UsersService diekspor
})
export class UsersModule {}
