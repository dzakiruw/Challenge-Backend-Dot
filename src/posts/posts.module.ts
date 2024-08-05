import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],  // Impor FirebaseModule di sini jika diperlukan
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
