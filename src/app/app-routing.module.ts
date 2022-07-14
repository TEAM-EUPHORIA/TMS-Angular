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

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'Login', component: LoginComponent },
  { path: 'addcourse', component: CoursecrudComponent },
  { path: 'Review', component: ReviewcrudComponent },
  { path: 'ReviewList', component: ReviewlistComponent },
  { path: 'addDepartment', component: DepartmentcrudComponent },
  { path: 'DepartmentList', component: DepartmentlistComponent },
  { path: 'AddCourse', component: CoursecrudComponent },
  { path: 'AddTopic', component: TopiccrudComponent },
  { path: 'CourseList', component: CourselistComponent },
  { path: 'CourseView', component: CourseviewComponent},
  { path: 'TopicView', component: TopicviewComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
