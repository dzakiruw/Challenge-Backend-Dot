import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly firebaseService: FirebaseService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const db = this.firebaseService.getDb();
    const userRef = db.collection('users').doc();
    const user = { id: userRef.id, ...createUserDto };
    await userRef.set(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    const db = this.firebaseService.getDb();
    const snapshot = await db.collection('users').get();
    return snapshot.docs.map(doc => doc.data() as User);
  }

  async findOne(id: string): Promise<User> {
    const db = this.firebaseService.getDb();
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();
    return doc.exists ? (doc.data() as User) : null;
  }

  async findOneByUsername(username: string): Promise<User> {
    const db = this.firebaseService.getDb();
    const snapshot = await db.collection('users').where('username', '==', username).get();
    if (snapshot.empty) {
      return null;
    }
    return snapshot.docs[0].data() as User;
  }
}
