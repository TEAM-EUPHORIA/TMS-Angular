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



const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Profile', component: UserprofileComponent },

  ///         <User>
  //User profile dynamic
  { path: ':list/Profile/:id', component: UserprofileComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard] } },
  //User List Routing link
  { path: 'Co-Ordinator', component: UserlistComponent, canActivate: [HeadGuard] },
  { path: 'Trainer', component: UserlistComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard] } },
  { path: 'Trainee', component: UserlistComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard] } },
  { path: 'Reviewer', component: UserlistComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard] } },

  { path: 'AssignCourse/:courseId', component: CoursetraineeComponent, canActivate: [MasterGuard],data:{guard :[CoordinatorGuard,TrainerGuard]} },

  { path: 'Add-Co-Ordinator', component: UsercrudComponent, canActivate: [HeadGuard] },
  { path: 'Add-Trainer', component: UsercrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'Add-Trainee', component: UsercrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'Add-Reviewer', component: UsercrudComponent, canActivate: [CoordinatorGuard] },
  //Update User Routing link
  { path: 'Update-Co-Ordinator/:id', component: UsercrudComponent, canActivate: [HeadGuard] },
  { path: 'Update-Trainer/:id', component: UsercrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'Update-Trainee/:id', component: UsercrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'Update-Reviewer/:id', component: UsercrudComponent, canActivate: [CoordinatorGuard] },
  //Department routing 
  { path: 'DepartmentList', component: DepartmentlistComponent, canActivate: [MasterGuard], data: { guard: [HeadGuard, CoordinatorGuard] } },
  { path: 'AddDepartment', component: DepartmentcrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'EditDepartment/:deptId', component: DepartmentcrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'CourseView/:courseId', component: CourseviewComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TrainerGuard, TraineeGuard] } },
  { path: 'TopicView/:courseId/:topicId', component: TopicviewComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TrainerGuard, TraineeGuard] } },
  { path: 'AddTopic/:courseId', component: TopiccrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'Course/:courseId/Topic/:topicId', component: TopiccrudComponent, canActivate: [CoordinatorGuard] },

  ///         <User>
  { path: 'Attendance', component: AttendancelistComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TrainerGuard] } },

  ///       <Course>
  //Courses Routing Link
  { path: 'CourseList', component: CourselistComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TrainerGuard, TraineeGuard] } },
  { path: 'CourseView', component: CourseviewComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TraineeGuard, TrainerGuard] } },
  { path: 'CourseView/:courseId', component: CourseviewComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TraineeGuard, TrainerGuard] } },
  { path: 'AddCourse', component: CoursecrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'EditCourse/:courseId', component: CoursecrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'CourseView/:courseId/TopicView/:topicId', component: TopicviewComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TraineeGuard, TrainerGuard] } },

  //Topic Routing Link
  { path: 'AddTopic/:courseId', component: TopiccrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'Course/:courseId/Topic/:topicId', component: TopiccrudComponent, canActivate: [CoordinatorGuard] },
  //Assignments Routing Link
  { path: 'UploadAssignment', component: UploadassignmentComponent, canActivate: [MasterGuard], data: { guard: [TrainerGuard, TraineeGuard] } },
  { path: 'ViewAssignment', component: ViewassignmentComponent },
  //Attendance Routing Link
  { path: 'AttendanceList/:courseId/:topicId', component: AttendancelistComponent, canActivate: [MasterGuard], data:{guard:[CoordinatorGuard,TrainerGuard]} },

  //Assigning course to Trainee

  { path: 'AssignCourse/:courseId/:deptId', component: CoursetraineeComponent, canActivate: [MasterGuard], data:{guard:[CoordinatorGuard, TrainerGuard]} },
  // CourseFeedback Routing Link
  { path: 'GiveCourseFeedback/:courseId', component: GivecoursefeedbackComponent, canActivate: [TraineeGuard] },
  { path: 'EditCourseFeedback/:courseId/:traineeId', component: GivecoursefeedbackComponent, canActivate: [TraineeGuard] },

  { path: 'ViewCourseFeedback/:courseId/:traineeId', component: ViewcoursefeedbackComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TraineeGuard] } },

  ///           <Course>
  //TraineeFeedback Routing Link
  { path: 'GiveTraineeFeedback/:traineeId', component: GivetraineefeedbackComponent, canActivate: [TrainerGuard] },
  { path: 'ViewTraineeFeedback/:courseId', component: ViewtraineefeedbackComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TrainerGuard] } },
  { path: 'EditTraineeFeedback/:courseId/:traineeId/:trainerId', component: GivetraineefeedbackComponent, canActivate: [TraineeGuard] },
  { path: 'ViewTraineeFeedback/:courseId/:traineeId/:trainerId', component: ViewtraineefeedbackComponent },

  ///           <Reviews>
  //Review List routes
  { path: 'Reviews', component: ReviewlistComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, TraineeGuard, ReviewerGuard] } },
  { path: 'Reviews', component: ReviewlistComponent },
  { path: 'Completed-Review', component: ReviewlistComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, ReviewerGuard, TraineeGuard] } },
  { path: 'Scheduled-Reviews', component: ReviewlistComponent, canActivate: [CoordinatorGuard] },
  //Schedule Review and edit review routing link
  { path: 'ScheduleReview', component: ReviewcrudComponent, canActivate: [CoordinatorGuard] },
  { path: 'ScheduleReview/:id', component: ReviewcrudComponent, canActivate: [CoordinatorGuard] },
  //MoM upload and update Routing Link
  { path: 'ViewMOM/:reviewId,:traineeId', component: ViewmomComponent, canActivate: [MasterGuard], data: { guard: [CoordinatorGuard, ReviewerGuard, TraineeGuard] } },
  { path: 'UploadMOM/:reviewId', component: GivemomComponent, canActivate:  [MasterGuard], data: { guard: [CoordinatorGuard, ReviewerGuard, TraineeGuard] } },
  { path: 'EditMOM/:reviewId/:traineeId', component: GivemomComponent, canActivate: [TraineeGuard] },
  ///           <Reviews>
  { path: 'Home', component: HomeComponent },

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
