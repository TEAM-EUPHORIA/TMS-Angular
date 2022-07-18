import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Login/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(public ls : LoginService,
    private route : Router) { }
    upCommingReview : number = 1;
    completedReview : number = 2;

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
  toReviewList(){
    var obj : any ={
      upCommingReviewId : this.upCommingReview,
      completedReviewId : this.completedReview
    }
    this.route.navigate(['/ReviewList'],{state:{statusId : obj}});
  }
}
