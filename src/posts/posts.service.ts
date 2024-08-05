import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreatePostDto } from './create-post.dto';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const db = this.firebaseService.getDb();
    const postRef = db.collection('posts').doc();
    const post = { id: postRef.id, ...createPostDto };
    await postRef.set(post);
    return post;
  }

  async findAll(): Promise<Post[]> {
    const db = this.firebaseService.getDb();
    const snapshot = await db.collection('posts').get();
    return snapshot.docs.map(doc => doc.data() as Post);
  }

  async findOne(id: string): Promise<Post> {
    const db = this.firebaseService.getDb();
    const postRef = db.collection('posts').doc(id);
    const doc = await postRef.get();
    return doc.exists ? (doc.data() as Post) : null;
  }
}
