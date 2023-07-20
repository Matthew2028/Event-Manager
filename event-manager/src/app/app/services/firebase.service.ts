import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  isLoggedIn = false;
  constructor(
    private firebaseAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) {}
  async signin(email: string, password: string) {
      await this.firebaseAuth.signInWithEmailAndPassword(email,password)
      .then(res => {
        this.isLoggedIn = true;
        sessionStorage.setItem("user", JSON.stringify(res.user))
      })
  }
  async signup(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email,password)
    .then(res => {
      this.isLoggedIn = true;
     sessionStorage.setItem("user", JSON.stringify(res.user))
    })
  }
  logout(){
    this.firebaseAuth.signOut();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    this.isLoggedIn = false;
  }

}
