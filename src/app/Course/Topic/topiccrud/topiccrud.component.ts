import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Quill from 'quill';
import { baseurl } from 'src/app/URL';
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
  Title !: string;
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
  Topic: any
  quill: any;
  constructor(private topicService: TopicService, private router: Router, private route: ActivatedRoute, private http: HttpClient) { }
  id!: number;
  topicname!: string;
  topicduration!: string;
  topic: any = {
    name: '',
    courseId: '',
    duration: '',
    content: '',
  };

  getQuill() {
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
    var config = {
      "theme": "snow",
      modules: {
        toolbar: toolbarOptions
      },
    };
    return new Quill('#editor', config);
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.params["courseId"]
    this.topicId = this.route.snapshot.params["topicId"]
    this.quill = this.getQuill()
    if (this.courseId != undefined && this.topicId != undefined) {
      this.http.get(baseurl + `Course/${this.courseId}/topics/${this.topicId}`).subscribe({
        next: (res: any) => {
          this.topic = res
          this.topic.content = JSON.parse(this.topic.content)
          this.quill.setContents(this.topic.content)
        },
        error(err) {
          console.warn(err["error"])
        },
      })
    }
  }
  OnSubmit() {
    if (this.topicId == undefined) {
      this.PostTopic();
    } else {
      this.UpdateTopic();
    }
  }

  private UpdateTopic() {
    this.setTopicContent();
    this.topicService.UpdateTopic(this.topic).subscribe({
      next: (res: any) => {
        window.location.replace(`/CourseView/${this.topic.courseId}`);
      },
      error(err) {
        console.warn(err["error"]);
      },
    });
  }

  PostTopic() {
    this.setTopicContent();
    // console.log(this.topic); // to be removed
    this.topicService.CreateTopic(this.topic).subscribe({
      next: (res: any) => {
        this.ToCourseView(this.courseId);
      },
      error(err: any) {
        console.log(err["error"])
      },
    })
  }
  private setTopicContent() {
    var data = JSON.stringify(this.quill.getContents());
    this.topic.content = data;
    this.topic.courseId = this.courseId;
  }

  getTopicById(cid: number, tid: number) {
    this.topicService.getTopicByCourseIdTopicID(cid, tid).subscribe(res => {
      this.topic = res;
    })
  }

  ToCourseView(id : number){
    var course : any;
    this.http.get("https://localhost:5001/Course/"+ id).subscribe(res => {
      course = res;
      this.router.navigate(['/CourseView'], { state: { courseView : course } });
    });
  }

}
