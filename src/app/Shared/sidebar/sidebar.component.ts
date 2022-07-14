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
