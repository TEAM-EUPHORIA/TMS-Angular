import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewassignment',
  templateUrl: './viewassignment.component.html',
  styleUrls: ['./viewassignment.component.css']
})
export class ViewassignmentComponent implements OnInit {

  constructor(public sanitizer : DomSanitizer, private router : Router) { this.Assignment = this.router.getCurrentNavigation()?.extras.state?.['assignment']}
  
  Assignment : any;

  ngOnInit(): void {
  }

}
