import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseCrudComponent } from './Course/Course/course-crud/course-crud.component';
import { CourselistComponent } from './Course/Course/courselist/courselist.component';
import { CoursecrudComponent } from './Course/Course/coursecrud/coursecrud.component';
import { DepartmentlistComponent } from './Department/departmentlist/departmentlist.component';
import { DepartmentcrudComponent } from './Department/departmentcrud/departmentcrud.component';
import { GivefeedbackComponent } from './Feedback/Course/givefeedback/givefeedback.component';
import { ViewfeedbackComponent } from './Feedback/Course/viewfeedback/viewfeedback.component';
import { UploadassignmentComponent } from './Course/Assignment/uploadassignment/uploadassignment.component';
import { AssignmentlistComponent } from './Course/Assignment/assignmentlist/assignmentlist.component';
import { TopiccrudComponent } from './Course/Topic/topiccrud/topiccrud.component';
import { TopicviewComponent } from './Course/Topic/topicview/topicview.component';
import { CourseviewComponent } from './Course/Course/courseview/courseview.component';
import { CoursetraineeComponent } from './Course/Course/coursetrainee/coursetrainee.component';
import { AttendancelistComponent } from './Course/Attendance/attendancelist/attendancelist.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseCrudComponent,
    CourselistComponent,
    CoursecrudComponent,
    DepartmentlistComponent,
    DepartmentcrudComponent,
    GivefeedbackComponent,
    ViewfeedbackComponent,
    UploadassignmentComponent,
    AssignmentlistComponent,
    TopiccrudComponent,
    TopicviewComponent,
    CourseviewComponent,
    CoursetraineeComponent,
    AttendancelistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
