import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursecrudComponent } from './Course/Course/coursecrud/coursecrud.component';
import { LoginComponent } from './Login/login/login.component';

const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  { path: "addcourse", component: CoursecrudComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
