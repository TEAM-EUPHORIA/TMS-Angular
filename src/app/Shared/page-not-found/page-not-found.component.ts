import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  constructor(private router : Router) { }

  title : any;
  test1 = "PageNotFound";
  test2 = "InvalidRequest";
  Error = false

  ngOnInit(): void {
   this.title = this.router.url.split("/");
   if(this.test1.matchAll(this.title))
    this.Error = true;   
  }

}
