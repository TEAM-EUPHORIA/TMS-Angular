import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(public auth : LoginService,
    private route : Router) { }


  ngOnInit(): void {
    console.warn(this.auth.IsloggedIn, "Logged");
    console.warn(this.auth.IsHead, "Head");
    console.warn(this.auth.IsCoordinator, "Coordinator");
    console.warn(this.auth.IsTrainee, "Trainee");
    console.warn(this.auth.IsTrainer, "Trainer");
  }
  
  LogOut(){
    localStorage.clear();
    this.route.navigate(['/']);
    window.location.reload();
  }
  toggleNavbar() {

    var sidebar = document.querySelector(".sidebar")

    var nav = document.querySelector(".content")

    sidebar?.classList.toggle('open')

    nav?.classList.toggle('open')

  }
}
