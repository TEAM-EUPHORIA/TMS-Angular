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



const routes: Routes = [
  { path: '', redirectTo:'Home',pathMatch:'full' },
  { path: 'Home', component: HomeComponent },
  { path: 'Login', component: LoginComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'Profile', component: UserprofileComponent },
  
  ///         <User>
  //User profile dynamic
  { path: ':list/Profile/:id', component: UserprofileComponent },
  //User List Routing link
  { path: 'Co-Ordinator', component: UserlistComponent },
  { path: 'Trainer', component: UserlistComponent },
  { path: 'Trainee', component: UserlistComponent },
  { path: 'Reviewer', component: UserlistComponent },

  { path: 'AssignCourse/:courseId', component: CoursetraineeComponent },
  { path: 'Upcoming-Reviews', component: ReviewlistComponent },


  { path: 'Update-Co-Ordinator/:id', component: UsercrudComponent },
  { path: 'Update-Trainer/:id', component: UsercrudComponent },
  { path: 'Update-Trainee/:id', component: UsercrudComponent },
  { path: 'Update-Reviewer/:id', component: UsercrudComponent },

  { path: 'Add-Co-Ordinator', component: UsercrudComponent },
  { path: 'Add-Trainer', component: UsercrudComponent },
  { path: 'Add-Trainee', component: UsercrudComponent },
  { path: 'Add-Reviewer', component: UsercrudComponent },
  //Update User Routing link
  { path: 'Update-Co-Ordinator/:id', component: UsercrudComponent },
  { path: 'Update-Trainer/:id', component: UsercrudComponent },
  { path: 'Update-Trainee/:id', component: UsercrudComponent },
  { path: 'Update-Reviewer/:id', component: UsercrudComponent },
  //Department routing 
  { path: 'DepartmentList', component: DepartmentlistComponent },
  { path: 'CourseView/:courseId', component: CourseviewComponent },
  { path: 'TopicView/:courseId/:topicId', component: TopicviewComponent },
  { path: 'AddTopic/:courseId', component: TopiccrudComponent },
  { path: 'Course/:courseId/Topic/:topicId', component: TopiccrudComponent },
  { path: 'GiveCourseFeedback/:courseId', component: GivecoursefeedbackComponent },
  { path: 'EditCourseFeedback/:courseId/:traineeId', component: GivecoursefeedbackComponent },
  { path: 'ViewCourseFeedback/:courseId', component: ViewcoursefeedbackComponent },
  { path: 'GiveTraineeFeedback/:traineeId', component: GivetraineefeedbackComponent },
  { path: 'ViewTraineeFeedback/:courseId', component: ViewtraineefeedbackComponent },
  { path: 'Attendance', component: AttendancelistComponent },

  { path: 'AddDepartment', component: DepartmentcrudComponent },
  { path: 'EditDepartment/:deptId', component: DepartmentcrudComponent },
  ///         <User>

  ///       <Course>
  //Courses Routing Link
  { path: 'CourseList', component: CourselistComponent },
  { path: 'CourseView', component: CourseviewComponent },
  { path: 'CourseView/:courseId', component: CourseviewComponent },
  { path: 'AddCourse', component: CoursecrudComponent },
  { path: 'EditCourse/:courseId', component: CoursecrudComponent },
  { path: 'CourseView/:courseId', component: CourseviewComponent },
  { path: 'CourseView/:courseId/TopicView/:topicId', component: TopicviewComponent },
  
  //Topic Routing Link
  { path: 'AddTopic/:courseId', component: TopiccrudComponent },
  { path: 'Course/:courseId/Topic/:topicId', component: TopiccrudComponent },
  //Assignments Routing Link
  { path: 'UploadAssignment', component: UploadassignmentComponent },
  { path: 'ViewAssignment', component: ViewassignmentComponent},
  //Attendance Routing Link
  { path: 'AttendanceList/:courseId/:topicId', component: AttendancelistComponent },
  //Assigning course to Trainee
  { path: 'AssignCourse/:courseId/:deptId', component: CoursetraineeComponent },
  // CourseFeedback Routing Link
  { path: 'GiveCourseFeedback/:courseId', component: GivecoursefeedbackComponent },
  { path: 'EditCourseFeedback/:courseId/:traineeId', component: GivecoursefeedbackComponent },
  { path: 'ViewCourseFeedback/:courseId/:traineeId', component: ViewcoursefeedbackComponent },
  ///           <Course>
  //TraineeFeedback Routing Link
  { path: 'GiveTraineeFeedback/:courseId/:traineeId', component: GivetraineefeedbackComponent },
  { path: 'ViewTraineeFeedback/:courseId/:traineeId/:trainerId', component: ViewtraineefeedbackComponent },

  ///           <Reviews>
  //Review List routes
  { path: 'Upcoming-Review', component: ReviewlistComponent },
  { path: 'Completed-Review', component: ReviewlistComponent },
  //Schedule Review and edit review routing link
  { path: 'ScheduleReview', component: ReviewcrudComponent },
  { path: 'ScheduleReview/:id', component: ReviewcrudComponent },
  //MoM upload and update Routing Link
  { path: 'ViewMOM/:reviewId,:traineeId', component: ViewmomComponent },
  { path: 'UploadMOM/:reviewId', component: GivemomComponent },
  { path: 'EditMOM/:reviewId/:traineeId', component: GivemomComponent },
  ///           <Reviews>
  { path: 'Home', component: HomeComponent},
  
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
