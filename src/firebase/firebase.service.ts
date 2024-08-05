import * as admin from 'firebase-admin';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService {
  private db: admin.firestore.Firestore;

  constructor(private configService: ConfigService) {
    const firebaseParams = {
      type: this.configService.get<string>('FIREBASE_TYPE'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      privateKeyId: this.configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      privateKey: this.configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n'),
      clientEmail: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      clientId: this.configService.get<string>('FIREBASE_CLIENT_ID'),
      authUri: this.configService.get<string>('FIREBASE_AUTH_URI'),
      tokenUri: this.configService.get<string>('FIREBASE_TOKEN_URI'),
      authProviderX509CertUrl: this.configService.get<string>('FIREBASE_AUTH_PROVIDER_X509_CERT_URL'),
      clientC509CertUrl: this.configService.get<string>('FIREBASE_CLIENT_X509_CERT_URL'),
    };

    admin.initializeApp({
      credential: admin.credential.cert(firebaseParams),
    });

    this.db = admin.firestore();
  }

  getDb() {
    return this.db;
  }
}
