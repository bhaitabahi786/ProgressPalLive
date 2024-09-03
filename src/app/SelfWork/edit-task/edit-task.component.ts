import { CommonModule, JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../myService/supabase.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, CommonModule, JsonPipe],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {

  isOtherGroup: boolean = false;

  @Input() taskEditData: any = {};

  constructor(private supabaseService: SupabaseService) { }

  otherSelected(event: any) {
    console.log("ebvent : ", event.target.value);

    if (event.target.value === "others") {
      this.isOtherGroup = true
    } else {
      this.isOtherGroup = false
    }

  }

  async updateTask() {

    if (this.isOtherGroup) {
      this.taskEditData.group = this.taskEditData.otherGroup;
    }

    try {

      const data = await this.supabaseService.updateTaskS(this.taskEditData);
      console.log('Task updated successfully ', data);
    }
    catch (error) {
      console.error('Error updating task:', error);
    }

  }

}
