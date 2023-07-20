import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { collection } from '@firebase/firestore';
import { FirebaseService } from 'src/app/app/services/firebase.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  users: Array<{ email: string, password: string }> = [];

  signUpForm: FormGroup;
  signInForm: FormGroup;

  public isSignedIn = false;

  constructor(private firestore: AngularFirestore, public firebaseService : FirebaseService, private router: Router, private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.signInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if(sessionStorage.getItem('user')!== null)
    this.isSignedIn= true
    else
    this.isSignedIn = false
  }

  async onSignup(uid:string, email:string,password:string){
    await this.firebaseService.signup(email,password)
    .then(() => {
      this.isSignedIn = true
      this.users.push({email: email, password: password});
      sessionStorage.setItem('token',JSON.stringify(this.users));
      this.router.navigate(["/home"]);
      alert("You have successfully registered");
    }).catch((error) => {
      switch (error.code) {
        case "auth/email-already-exists":
        {
            alert("E-mail already exists!");
            break;
        }
        case "auth/invalid-password":
        {
           alert("Invalid password!");
           break;
        }
           default:
        {
            alert("Bad E-mail format, or this E-mail is already in use!");
            break;
        }
      }
    });
    await this.firestore.collection('users').doc(uid).set({
      email: email,
      password: password
    });
  }
  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email, password)
    .then(() => {
              this.isSignedIn = true
              this.users.push({email: email, password: password});
              sessionStorage.setItem('token',JSON.stringify(this.users));
              this.router.navigate(["/home"]);
              alert("You have successfully logged in!");
    }).catch((error) => {
      switch (error.code) {
        case "auth/invalid-email":
          {
            alert("Invalid E-mail!");
            break;
         }
        case "auth/wrong-password":
          {
            alert("Wrong password!");
            break;
         }
        case "auth/user-not-found":
        {
           alert("User not found!");
           break;
        }
           default:
        {
            alert("Unexpected error!");
            break;
        }
      }
    });
  }

}
