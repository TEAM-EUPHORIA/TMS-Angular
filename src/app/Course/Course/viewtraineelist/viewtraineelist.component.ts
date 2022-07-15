import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forEachChild } from 'typescript';

@Component({
  selector: 'app-viewtraineelist',
  templateUrl: './viewtraineelist.component.html',
  styleUrls: ['./viewtraineelist.component.css']
})
export class ViewtraineelistComponent implements OnInit {

  constructor(private router : Router, private route : ActivatedRoute , private http : HttpClient) { this.obje = this.router.getCurrentNavigation()?.extras.state?.['vid']}; 
obje : any;
temp : any;
courseId !: number;
roleId : any;
data : any;
  ngOnInit(): void {
    // this.courseId = this.obje.courseId;
    this.courseId = this.obje.courseId;
    this.temp = this.obje.feedbacks;
    this.roleId = 4
    console.warn(this.courseId,this.roleId,this.temp);
    var route = `Course/getCourseUser/${this.courseId}`
    this.http.get("https://localhost:5001/" + route).subscribe(res => {
      this.data = res;
    });
    this.checkFeedbacks(this.data);
    console.warn(this.data)
  }
  checkFeedbacks(obj : any){
    
  }
  
togivetraineefeedback(id : number, name : string){
  var objec : any ={
    traineeId : id,
    courseId : this.courseId,
    traineeName : name
  }
  // console.warn(objec);
  this.router.navigate(['/GiveTraineeFeedback'], {state : {rid : objec}})

}
}

