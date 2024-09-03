import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  filteredTasks: any[] = [];
  groupedTasks: { [date: string]: any[] } = {};
  filterDate: string = '';

  constructor(private supabaseService: SupabaseService) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  async fetchTasks() {
    try {
      const data = await this.supabaseService.getTasks();
      this.tasks = data;
      this.groupTasksByDate();
      this.filterTasks();
    } catch (error) {
      console.error('Error fetching tasks in component:', error);
    }
  }

  groupTasksByDate() {
    this.groupedTasks = this.tasks.reduce((group, task) => {
      const date = task.date;
      if (!group[date]) {
        group[date] = [];
      }
      group[date].push(task);
      return group;
    }, {});
  }

  filterTasks() {
    if (this.filterDate) {
      this.filteredTasks = this.tasks.filter(task => task.date === this.filterDate);
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  get groupedTaskKeys(): string[] {
    return Object.keys(this.groupedTasks);
  }

  getProgress(tasks: any[]): string {
    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    return totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%';
  }

  toggleComplete(task: any) {
    task.completed = !task.completed;
    this.supabaseService.updateTask(task.id, { completed: task.completed })
      .then(() => {
        this.groupTasksByDate();
        this.filterTasks();
      })
      .catch(error => console.error('Error updating task:', error));
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'low':
        return 'badge-success';
      case 'medium':
        return 'badge-warning';
      case 'high':
        return 'badge-danger';
      default:
        return '';
    }
  }

  editTask(task: any) {
    console.log('Edit task:', task);
  }

  deleteTask(taskId: number) {
    this.supabaseService.deleteTask(taskId)
      .then(() => {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.groupTasksByDate();
        this.filterTasks();
      })
      .catch(error => console.error('Error deleting task:', error));
  }
}


