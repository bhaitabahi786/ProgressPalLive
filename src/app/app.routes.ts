import { RouterModule, Routes } from '@angular/router';
import { AddTaskComponent } from './SelfWork/add-task/add-task.component';
import { NgModule } from '@angular/core';
import { TaskPageComponent } from './SelfWork/task-page/task-page.component';
import { SignUpComponent } from './SelfWork/Auth/sign-up/sign-up.component';
import { LogOutComponent } from './SelfWork/Auth/log-out/log-out.component';

export const routes: Routes = [
    // { path: '', component: TaskListComponent },
    { path: 'task_list', component: TaskPageComponent },
    { path: '', component: SignUpComponent },
    { path: 'logout', component: LogOutComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }

