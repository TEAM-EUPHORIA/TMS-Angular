import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
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
    name: new FormControl(['',
      Validators.required,
      Validators.maxLength(25),
      Validators.minLength(3)
    ]),
    duration: new FormControl('', [
      Validators.required,
      Validators.maxLength(15),
      Validators.minLength(3),
      Validators.pattern("^([01]?[0-9]|2[0-3])\\s(([h][r][s])|([h][r]))\\s[0-9][0-9]\\s(([m][i][n][s])|([m][i][n]))$")
    ])
  });
  Topic: any
  quill: any;
  CourseName: string | any = '';
  constructor(private topicService: TopicService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private toastService: HotToastService) { }
  id!: number;
  name!: string;
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
    this.CourseName = localStorage.getItem('courseName')
    if (this.router.url.includes('Add')) this.Title = 'Add'
    else this.Title = 'Update'
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
    if (this.courseId != 0 && this.topicId != undefined) {
      this.UpdateTopic();
    } else {
      this.PostTopic();
    }
  }

  private UpdateTopic() {
    this.setTopicContent();
    this.topicService.UpdateTopic(this.topic).subscribe({
      next: (res: any) => {
        this.toastService.success("Topic was updated successfully.")
        this.navigateToCourseView()
      },
      error: (err: any) => {
        this.toastService.error("Topic name already exists")
        this.serverSideErrorMsgs(err);
      }
    })
  }

  PostTopic() {
    this.setTopicContent();
    console.log(this.topic)
    this.topicService.CreateTopic(this.topic).subscribe({
      next: (res: any) => {
        this.toastService.success("Topic was created successfully.")
        this.navigateToCourseView();
      },
      error: (err: any) => {
        console.log(err);
        this.toastService.error("Topic name alraedy exists.")
        this.serverSideErrorMsgs(err);
      }
    })
  }
  private serverSideErrorMsgs(err: any) {
    console.warn(err["error"]);
    const errors = err["error"];
    Object.keys(errors).forEach(prop => {
      console.log(this.topicform.get(prop))
      const formControl = this.topicform.get(prop);
      if (formControl) {
        formControl.setErrors({
          serverError: errors[prop]
        });
        console.warn(this.topicform.controls['name'].getError('serverError'));
      }
    });
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
  private navigateToCourseView() {
    window.location.replace('/Courses/Course/' + this.courseId);
  }
}
