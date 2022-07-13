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
import { UsercrudComponent } from './User/usercrud/usercrud.component';
import { UserlistComponent } from './User/userlist/userlist.component';
import { UserprofileComponent } from './User/userprofile/userprofile.component';
import { DashboardComponent } from './User/dashboard/dashboard.component';
import { ReviewlistComponent } from './Review/Review/reviewlist/reviewlist.component';
import { ReviewcrudComponent } from './Review/Review/reviewcrud/reviewcrud.component';
import { GivemomComponent } from './Review/MOM/givemom/givemom.component';
import { ViewmomComponent } from './Review/MOM/viewmom/viewmom.component';
import { LoginComponent } from './Login/login/login.component';
import { HomeComponent } from './Shared/home/home.component';

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
    AttendancelistComponent,
    UsercrudComponent,
    UserlistComponent,
    UserprofileComponent,
    DashboardComponent,
    ReviewlistComponent,
    ReviewcrudComponent,
    GivemomComponent,
    ViewmomComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
