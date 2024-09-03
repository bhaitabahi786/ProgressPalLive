import { Component } from '@angular/core';
import { SupabaseService } from '../../services/supabase.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  task: any = {
    date: '',
    name: '',
    description: '',
    priority: 'low',
    group: 'learning',
    otherGroup: ''
  };
  isOtherGroup: boolean = false;

  constructor(private supabaseService: SupabaseService) {}

  checkOtherGroup(event: any) {
    this.isOtherGroup = event.target.value === 'others';
  }

  async addTask() {
    if (this.isOtherGroup) {
      this.task.group = this.task.otherGroup;
    }
    try {
      const data = await this.supabaseService.addTask(this.task);
      console.log('Task added successfully:', data);
      // Reset the form
      this.task = {
        date: '',
        name: '',
        description: '',
        priority: 'low',
        group: 'learning',
        otherGroup: ''
      };
      this.isOtherGroup = false;
    } catch (error) {
      console.error('Error adding task:', error);
    }
  }
}
