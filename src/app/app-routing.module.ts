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
import { UploadassignmentComponent } from './Course/Assignment/uploadassignment/uploadassignment.component';
import { ViewassignmentComponent } from './Course/Assignment/viewassignment/viewassignment.component';
import { MasterGuard } from './Login/Guards/master.guard';
import { HeadGuard } from './Login/Guards/head.guard';
import { CoordinatorGuard } from './Login/Guards/coordinator.guard';
import { ReviewerGuard } from './Login/Guards/reviewer.guard';
import { TraineeGuard } from './Login/Guards/trainee.guard';
import { TrainerGuard } from './Login/Guards/trainer.guard';
import { ReviewViewComponent } from './Review/review-view/review-view.component';



const routes: Routes = [
  { path: "", redirectTo: "Home", pathMatch: "full" },
  { path: "Home", component: HomeComponent },
  { path: "home", component: HomeComponent },
  // login
  { path: "Login", component: LoginComponent },
  { path: "login", component: LoginComponent },
  // dashboard
  { path: "Dashboard", component: DashboardComponent },
  { path: "dashboard", component: DashboardComponent },
  // user
  //User Lit Routing link
  { path: 'Co-Ordinator', component: UserlistComponent, canActivate: [HeadGuard] },
  { path: 'Trainer', component: UserlistComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard] } },
  { path: 'Trainee', component: UserlistComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard] } },
  { path: 'Reviewer', component: UserlistComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard] } },
  // add usrs
  { path: ':list/Add-Co-Ordinator', component: UsercrudComponent, canActivate: [HeadGuard] },
  { path: ':list/Add-Trainer', component: UsercrudComponent, canActivate: [CoordinatorGuard] },
  { path: ':list/Add-Trainee', component: UsercrudComponent, canActivate: [CoordinatorGuard] },
  { path: ':list/Add-Reviewer', component: UsercrudComponent, canActivate: [CoordinatorGuard] },

  //Update User Routing link
  { path: ':list/Update-Co-Ordinator/:id', component: UsercrudComponent, canActivate: [HeadGuard] },
  { path: ':list/Update-Trainer/:id', component: UsercrudComponent, canActivate: [CoordinatorGuard] },
  { path: ':list/Update-Trainee/:id', component: UsercrudComponent, canActivate: [CoordinatorGuard] },
  { path: ':list/Update-Reviewer/:id', component: UsercrudComponent, canActivate: [CoordinatorGuard] },

  //User profile dynamic
  { path: 'Profile', component: UserprofileComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard, TraineeGuard, TrainerGuard, ReviewerGuard] } },
  { path: ':list/Profile/:id', component: UserprofileComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard] } },

  //Department routing
  { path: 'DepartmentList', component: DepartmentlistComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard] } },
  { path: 'AddDepartment', component: DepartmentcrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'EditDepartment/:deptId', component: DepartmentcrudComponent, canActivate: [CoordinatorGuard] },

  //Course Routing Link
  // list
  { path: 'Courses', component: CourselistComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TrainerGuard, TraineeGuard] } },
  // view
  { path: ':List/Course/:courseId', component: CourseviewComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TraineeGuard, TrainerGuard] } },
  // add
  { path: 'AddCourse', component: CoursecrudComponent, canActivate: [CoordinatorGuard] },
  // edit
  { path: 'EditCourse/:courseId', component: CoursecrudComponent, canActivate: [CoordinatorGuard] },
  //Assigning course to Trainee
  { path: 'CourseTrainees/:courseId/:deptId', component: CoursetraineeComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TrainerGuard] } },

  //Topic Routing Link
  // view
  { path: 'Course/:courseId/Topic/:topicId', component: TopicviewComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TraineeGuard, TrainerGuard] } },
  // add
  { path: 'Course/:courseId/Add/Topic', component: TopiccrudComponent, canActivate: [CoordinatorGuard] },
  // edit
  { path: 'Course/:courseId/Edit/Topic/:topicId', component: TopiccrudComponent, canActivate: [CoordinatorGuard] },

  //Assignments Routing Link
  // view
  { path: 'ViewAssignment', component: ViewassignmentComponent },

  //Attendance Routing Link
  { path: 'Course/:courseId/Topic/:topicId/Attendances', component: AttendancelistComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TrainerGuard] } },
  // CourseFeedback Routing Link
  // add
  { path: 'Course/:courseId/Feedback/Add', component: GivecoursefeedbackComponent, canActivate: [TraineeGuard] },
  // view
  { path: 'Course/:courseId/Feedback/:traineeId', component: ViewcoursefeedbackComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TraineeGuard] } },
  //TraineeFeedback Routing Link
  { path: 'Course/:courseId/CourseTrainee/:traineeId/Add', component: GivetraineefeedbackComponent, canActivate: [TrainerGuard] },
  { path: 'Course/:courseId/CourseTrainee/:traineeId', component: ViewtraineefeedbackComponent },
  //Review List routes
  { path: 'Reviews', component: ReviewlistComponent, canActivate: [MasterGuard], data: { guard: [ReviewerGuard, TraineeGuard, CoordinatorGuard] } },
  { path: 'Completed-Reviews', component: ReviewlistComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, ReviewerGuard, TraineeGuard] } },
  { path: 'Schedule-Reviews', component: ReviewlistComponent, canActivate: [CoordinatorGuard] },
  //Schedule Review and edit review routing link
  { path: 'Review/Add', component: ReviewcrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'Review/Edit/:id', component: ReviewcrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'Review/:reviewId/view', component: ReviewViewComponent,canActivate:  [MasterGuard], data: { guard: [ReviewerGuard, TraineeGuard, CoordinatorGuard] } },
  //MoM upload and update Routing Link
  { path: 'Review/:reviewId/MOM/Add', component: GivemomComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, ReviewerGuard, TraineeGuard] } },
  { path: 'Review/:reviewId/MOM/:traineeId', component: ViewmomComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, ReviewerGuard, TraineeGuard] } },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
