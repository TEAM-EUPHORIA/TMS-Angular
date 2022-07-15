import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quill } from 'quill';
import { TopicService } from '../topic.service';

@Component({
  selector: 'app-topiccrud',
  templateUrl: './topiccrud.component.html',
  styleUrls: ['./topiccrud.component.css']
})
export class TopiccrudComponent implements OnInit {
  courseId!: number;
  topicId!: number;
  config: any;
  quill!: Quill;
  Title!: string;
  topicform = new FormGroup({
    Topicname: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
      Validators.minLength(3)
    ]),
    duration: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(7)
    ])
  });
  Topic :any
  constructor(private topicService: TopicService, private router: Router, private route: ActivatedRoute) 
  { this.Topic = this.router.getCurrentNavigation()?.extras.state?.['aid'] }
  inav!:number;
  id!: number;
  topicname!:string;
  topicduration!:string;
  topic: any = {
    name: '',
    courseId: '',
    duration: '',
    content: '',
  };

  ngOnInit(): void {
    // var i = this.route.snapshot.params[('courseId')];
    // this.id = this.route.snapshot.params['topicId'];
    this.courseId = this.Topic.courseId;
    this.topicId = this.Topic.topicId;
    console.log(this.courseId, this.topicId)
    this.getTopicById(this.courseId,this.topicId);

    console.log("topic id "+this.id)
    this.inav=this.courseId;
    if (this.id == null || this.id == undefined) {
      this.Title = "Add";
    }
    else {
      this.Title = "Edit"
    }
    // this.courseId = Number.parseInt(courseId);
    var toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block', 'image'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ];
    this.config = {
      "theme": "snow",
      modules: {
        toolbar: toolbarOptions
      },
    };
    this.quill = new Quill('#editor', {
      theme: 'snow'});
    
  }
  OnSubmit(){
    if(this.topicId !=0){
      this.PostTopic();
    }else{
      this.topicService.UpdateTopic(this.topic).subscribe((res) =>{
      })
    }
  }

  PostTopic() {
 
    console.log(this.topic);
    var data = JSON.stringify(this.quill.getContents());
    this.topic.name=this.topicname;
    this.topic.duration=this.topicduration;
    this.topic.content = data;
    this.topic.courseId = this.courseId;
    this.topicService.CreateTopic(this.topic).subscribe(res => {
    })
    setTimeout(() => {
      this.router.navigateByUrl("/CourseView/"+ this.inav)
    }, 5000)
  }
  getTopicById(cid: number, tid: number) {
    this.topicService.getTopicByCourseIdTopicID(cid, tid).subscribe(res => {
      this.topic=res;
      console.log(res);
    })
  }

}
