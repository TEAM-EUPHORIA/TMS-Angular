import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginInterceptor } from './Login/login.interceptor';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourselistComponent } from './Course/Course/courselist/courselist.component';
import { CoursecrudComponent } from './Course/Course/coursecrud/coursecrud.component';
import { DepartmentlistComponent } from './Department/departmentlist/departmentlist.component';
import { DepartmentcrudComponent } from './Department/departmentcrud/departmentcrud.component';
import { UploadassignmentComponent } from './Course/Assignment/uploadassignment/uploadassignment.component';
import { TopiccrudComponent } from './Course/Topic/topiccrud/topiccrud.component';
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
import { SidebarComponent } from './Shared/sidebar/sidebar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { QuillModule } from 'ngx-quill';
import { TopicviewComponent } from './Course/Topic/topicview/topicview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GivecoursefeedbackComponent } from './Feedback/Course/givecoursefeedback/givecoursefeedback.component';
import { ViewcoursefeedbackComponent } from './Feedback/Course/viewcoursefeedback/viewcoursefeedback.component';
import { ViewtraineefeedbackComponent } from './Feedback/Trainee/viewtraineefeedback/viewtraineefeedback.component';
import { GivetraineefeedbackComponent } from './Feedback/Trainee/givetraineefeedback/givetraineefeedback.component';

import { DatePipe } from '@angular/common';
import { AssignmentquesComponent } from './Course/Assignment/assignmentques/assignmentques.component';
import { AssignmentlistComponent } from './Course/Assignment/assignmentlist/assignmentlist.component';
import { ViewassignmentComponent } from './Course/Assignment/viewassignment/viewassignment.component';
import { ReviewViewComponent } from './Review/review-view/review-view.component';
import { PageNotFoundComponent } from './Shared/page-not-found/page-not-found.component';

export function tokenGetter() {
  return localStorage.getItem("Token");
}

@NgModule({
  declarations: [
    AppComponent,
    CoursecrudComponent,
    CourselistComponent,
    CoursecrudComponent,
    DepartmentlistComponent,
    DepartmentcrudComponent,
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
    HomeComponent,
    SidebarComponent,
    FooterComponent,
    GivecoursefeedbackComponent,
    ViewcoursefeedbackComponent,
    ViewtraineefeedbackComponent,
    GivetraineefeedbackComponent,
    ViewassignmentComponent,
    AssignmentquesComponent,
    ReviewViewComponent,
    PageNotFoundComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    QuillModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001"],
        disallowedRoutes: []
      }
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    },
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
