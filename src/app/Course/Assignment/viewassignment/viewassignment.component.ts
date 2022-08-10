import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewassignment',
  templateUrl: './viewassignment.component.html',
  styleUrls: ['./viewassignment.component.css'],
})
export class ViewassignmentComponent {
  constructor(public sanitizer: DomSanitizer, private router: Router) {
    //get the assignment from assignment list
    this.Assignment =
      this.router.getCurrentNavigation()?.extras.state?.['assignment'];
  }

  //Storing the assignment data
  Assignment: any;
}
