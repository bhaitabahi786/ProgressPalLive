import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../myService/supabase.service';
import { AddTaskComponent } from '../add-task/add-task.component';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-task-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    JsonPipe,
    AddTaskComponent,
    EditTaskComponent,
    NavbarComponent
],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.css',
})
export class TaskPageComponent implements OnInit {
  TaskList: any[] = [];
  groupedTasks: { [date: string]: any[] } = {};
  addTaskClick: boolean = false;

  logCheck: boolean = false

  dateArr: any[] = [];

  constructor(private supabaseService: SupabaseService) { }

  ngOnInit(): void {
    
    this.fetchData();
    
  }

  getSessionTask() { }

  async fetchData() {
    try {
      
      const data = await this.supabaseService.fetchDataS();
      this.logCheck = this.supabaseService.isLoggedIn;
      // console.log("success : taskpage",data);
      this.TaskList = data as any[];
      this.groupTasksByDate();
      // console.log("lists : ",this.groupedTasks)
      // this.dateKeys = this.dateTaskKeys
      // console.log("dateKeys : ",this.dateKeys)
      
    } catch (error) {
      console.log('error : ', error);
     
    }
  }

  groupTasksByDate() {
    // console.log("lists fff: ",this.groupedTasks)
    this.groupedTasks = this.TaskList.reduce((group, task) => {
      const date = task.date;
      if (!group[date]) {
        group[date] = [];
      }
      group[date].push(task);
      return group;
    }, {});
  }

  get dateTaskKeys(): string[] {
    // console.log("lists ddd: ",this.groupedTasks);
    this.dateArr = Object.keys(this.groupedTasks);
    // console.log("lists : ",this.dateArr.sort());
    return this.dateArr.sort();
  }

  // logic for completing the task

  async completedOrNot(compTask: any) {
    // console.log("compTask ",compTask);

    if (compTask.completed) {
      compTask.completed = false;
      try {
        const data = await this.supabaseService.completedOrNotS(compTask);
        // console.log("susccess", data);
      } catch (error) {
        console.log('error : ', error);
      }
      // console.log("compTask false",compTask);
    } else {
      compTask.completed = true;
      try {
        const data = await this.supabaseService.completedOrNotS(compTask);
        // console.log("susccess", data);
      } catch (error) {
        console.log('error : ', error);
      }
      // console.log("compTask true",compTask);
    }
  }

  progressBarUpdate(progGroupTask: any) {
    // console.log("progGroupTask ",progGroupTask.length);

    const TotTask = progGroupTask.length;
    const Tcomplete = progGroupTask.filter(
      (taskcomp: any) => taskcomp.completed
    ).length;
    // console.log("progGroupTask ",Tcomplete);
    return TotTask > 0 ? `${(Tcomplete / TotTask) * 100}%` : '0%';
  }

  // edir task logic

  editTask: any[] = [];

  editTaskCall(taskId: any) {
    this.editTask = taskId;
  }

  // Delete function

  async deleteTask(delData: any) {
    const data = await this.supabaseService.deleteTaskS(delData);

    if (this.supabaseService.isTaskDeleted) {
      this.fetchData();
    }
  }
}
