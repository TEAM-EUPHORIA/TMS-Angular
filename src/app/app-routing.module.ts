import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursecrudComponent } from './Course/Course/coursecrud/coursecrud.component';
import { DepartmentcrudComponent } from './Department/departmentcrud/departmentcrud.component';
import { DepartmentlistComponent } from './Department/departmentlist/departmentlist.component';
import { TopiccrudComponent } from './Course/Topic/topiccrud/topiccrud.component';
import { LoginComponent } from './Login/login/login.component';
import { ReviewcrudComponent } from './Review/Review/reviewcrud/reviewcrud.component';
import { ReviewlistComponent } from './Review/Review/reviewlist/reviewlist.component';
import { HomeComponent } from './Shared/home/home.component';
import { CourselistComponent } from './Course/Course/courselist/courselist.component';
import { CourseviewComponent } from './Course/Course/courseview/courseview.component';
import { TopicviewComponent } from './Course/Topic/topicview/topicview.component';
import { DashboardComponent } from './User/dashboard/dashboard.component';
import { UserlistComponent } from './User/userlist/userlist.component';
import { UsercrudComponent } from './User/usercrud/usercrud.component';
import { GivecoursefeedbackComponent } from './Feedback/Course/givecoursefeedback/givecoursefeedback.component';
import { ViewcoursefeedbackComponent } from './Feedback/Course/viewcoursefeedback/viewcoursefeedback.component';
import { GivetraineefeedbackComponent } from './Feedback/Trainee/givetraineefeedback/givetraineefeedback.component';
import { ViewtraineefeedbackComponent } from './Feedback/Trainee/viewtraineefeedback/viewtraineefeedback.component';
import { CoursetraineeComponent } from './Course/Course/coursetrainee/coursetrainee.component';
import { UserprofileComponent } from './User/userprofile/userprofile.component';
import { AttendancelistComponent } from './Course/Attendance/attendancelist/attendancelist.component';
import { ViewmomComponent } from './Review/MOM/viewmom/viewmom.component';
import { GivemomComponent } from './Review/MOM/givemom/givemom.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Co-Ordinator', component: UserlistComponent },
  { path: 'Trainer', component: UserlistComponent },
  { path: 'Trainee', component: UserlistComponent },
  { path: 'Reviewer', component: UserlistComponent },
  { path: 'Update-Co-Ordinator/:id', component: UsercrudComponent },
  { path: 'Update-Trainer/:id', component: UsercrudComponent },
  { path: 'Update-Reviewer/:id', component: UsercrudComponent },
  { path: 'AssignCourse/:courseId', component: CoursetraineeComponent },
  { path: 'Upcoming-Reviews', component: ReviewlistComponent },
  { path: 'EditUser/:userId', component: UsercrudComponent },
  // { path: 'Update-Co-Ordinator/:id', component: UsercrudComponent },
  // { path: 'Update-Trainer/:id', component: UsercrudComponent },
  // { path: 'Update-Trainee/:id', component: UsercrudComponent },
  // { path: 'Update-Reviewer/:id', component: UsercrudComponent },
  // { path: 'Add-Co-Ordinator/:id', component: UsercrudComponent },
  // { path: 'Add-Trainer/:id', component: UsercrudComponent },
  // { path: 'Add-Trainee/:id', component: UsercrudComponent },
  { path: 'AddUser', component: UsercrudComponent },
  { path: 'ReviewList/:reviewId', component: ReviewlistComponent },
  { path: 'ScheduleReview', component: ReviewcrudComponent },
  { path: 'ViewMOM', component: ViewmomComponent },
  {path: 'UploadMOM/:reviewId/:traneeId',component:GivemomComponent},
  { path: 'Profile', component: UserprofileComponent },
  { path: ':list/Profile', component: UserprofileComponent },
  { path: 'Completed-Reviews', component: ReviewlistComponent },
  { path: 'CourseList', component: CourselistComponent },
  { path: 'AddCourse', component: CoursecrudComponent },
  { path: 'EditCourse', component: CoursecrudComponent },
  { path: 'DepartmentList', component: DepartmentlistComponent },
  { path: 'CourseView', component: CourseviewComponent },
  { path: 'TopicView', component: TopicviewComponent },
  { path: 'AddTopic/:courseId', component: TopiccrudComponent },
  { path: 'EditTopic', component: TopiccrudComponent },
  { path: 'GiveCourseFeedback', component: GivecoursefeedbackComponent },
  { path: 'EditCourseFeedback', component: GivecoursefeedbackComponent },
  { path: 'ViewCourseFeedback', component: ViewcoursefeedbackComponent },
  { path: 'GiveTraineeFeedback', component: GivetraineefeedbackComponent },
  { path: 'ViewTraineeFeedback', component: ViewtraineefeedbackComponent },
  { path: 'Attendance', component: AttendancelistComponent },

  { path: 'AddDepartment', component: DepartmentcrudComponent },
  { path: 'EditDepartment/:deptId', component: DepartmentcrudComponent },
  { path: 'CourseView', component: CourseviewComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
