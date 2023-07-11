import { Component, HostBinding, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public show:boolean = false;
  isFixedNavbar: any;
  @HostBinding('class.navbar-opened') navbarOpened = false;

  opened = false;

  constructor(public firebaseService: FirebaseService, private router: Router) {}

  ngOnInit(): void {
  }
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if(offset > 10) {
      this.isFixedNavbar = true;
    } else {
      this.isFixedNavbar = false;
    }
  }

  toggleNavbar() {
    this.navbarOpened = !this.navbarOpened;
  }
  get userInfo(){
    if(sessionStorage.length != 0) return true;
    return false;
  }
  

}
