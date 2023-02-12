import { Injectable, inject, Input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection } from '@firebase/firestore';
import { Users } from '../interface/users.interface';
import { Storage, ref, uploadBytes } from '@angular/fire/storage';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  private _auth = inject(Auth);
  private _firestore = inject(Firestore);
  private _storage = inject(Storage);
  public rutPattern: string = '^[0-9]{8,9}$';
  public emailPattern: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  public TelefonoPattern: string = '^[0-9]{9}$';

  addUser(user: Users) {
    const userRef = collection(this._firestore, 'users');
    return addDoc(userRef, user);
  }

  async unloadImage(file: Blob | ArrayBuffer) {
    const id = new Date().getTime().toString();
    const imgRef = ref(this._storage, `users/c-${id}`);

    const resp = await uploadBytes(imgRef, file);

    return resp;
  }

  login({ email, password }: User) {
    return signInWithEmailAndPassword(this._auth, email, password);
  }

  logout() {
    signOut(this._auth);
  }
}
