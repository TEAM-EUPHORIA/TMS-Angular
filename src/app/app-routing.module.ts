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

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'Login', component: LoginComponent},
  { path: 'Dashboard', component: DashboardComponent},
  { path: 'Co-Ordinator', component: UserlistComponent},
  { path: 'Trainer', component: UserlistComponent},
  { path: 'Trainee', component: UserlistComponent},
  { path: 'Reviewer', component: UserlistComponent},
  { path: 'Update-Co-Ordinator/:id', component: UsercrudComponent},
  { path: 'Update-Trainer/:id', component: UsercrudComponent},
  { path: 'Update-Trainee/:id', component: UsercrudComponent},
  { path: 'Update-Reviewer/:id', component: UsercrudComponent},
  { path: 'Upcoming-Reviews', component: ReviewlistComponent },
  { path: 'Completed-Reviews', component: ReviewlistComponent },
  { path: 'Courses', component: CourselistComponent },
  { path: 'DepartmentList', component: DepartmentlistComponent },
  { path: 'CourseView', component: CourseviewComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
