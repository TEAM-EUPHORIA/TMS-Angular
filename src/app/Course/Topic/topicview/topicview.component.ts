
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topicview',
  templateUrl: './topicview.component.html',
  styleUrls: ['./topicview.component.css']
})
export class TopicviewComponent implements OnInit {

  constructor() { }

  //temparary variable for data storage
  temp : any;
  
  //checks upload is enabled or not
  uploadKey : boolean = false;

  ngOnInit(): void {
  }

}

