import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/app/services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() isLogout = new EventEmitter<void>()
  constructor(public firebaseService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
  }
  
  get userInfo(){
    if(sessionStorage.length != 0) return true;
    return false;
  }
  
  logout(){
    this.firebaseService.logout()
    this.isLogout.emit()
    this.router.navigate(["/main"]);
    this.firebaseService.isLoggedIn = false;
    sessionStorage.clear();
    alert("You have successfully logged out");
  }

}
