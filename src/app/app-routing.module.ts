import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursecrudComponent } from './Course/Course/coursecrud/coursecrud.component';
import { DepartmentcrudComponent } from './Department/departmentcrud/departmentcrud.component';
import { DepartmentlistComponent } from './Department/departmentlist/departmentlist.component';
import { LoginComponent } from './Login/login/login.component';
import { ReviewcrudComponent } from './Review/Review/reviewcrud/reviewcrud.component';
import { ReviewlistComponent } from './Review/Review/reviewlist/reviewlist.component';
import { DashboardComponent } from './User/dashboard/dashboard.component';
import { UsercrudComponent } from './User/usercrud/usercrud.component';
import { UserlistComponent } from './User/userlist/userlist.component';
import { UserprofileComponent } from './User/userprofile/userprofile.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent },
  { path: "addcourse", component: CoursecrudComponent },
  { path: 'ScheduleReview', component: ReviewcrudComponent },
  { path: 'ReviewList', component: ReviewlistComponent },
  { path: 'Department', component: DepartmentcrudComponent },
  { path: 'DepartmentList', component: DepartmentlistComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'AddUser', component: UsercrudComponent },
  { path: 'UserList', component: UserlistComponent },
  { path: 'UserProfile', component: UserprofileComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
