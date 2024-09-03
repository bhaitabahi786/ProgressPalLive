import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    console.log('Supabase client initialized:', this.supabase);
  }

  async addTask(task: any): Promise<any> {
    const { data, error } = await this.supabase.from('tasks').insert([task]);
    if (error) throw error;
    return data;
  }

  async updateTask(taskId: number, updates: any): Promise<any> {
    const { data, error } = await this.supabase.from('tasks').update(updates).eq('id', taskId);
    return { data, error };
  }

  async deleteTask(taskId: number): Promise<any> {
    const { data, error } = await this.supabase.from('tasks').delete().eq('id', taskId);
    return { data, error };
  }

  
  async getTasks() {
    try {
      const { data, error } = await this.supabase.from('tasks').select();
      console.log("fetch data is : ",data)
      if (error) {
        console.error('Error fetching tasks:', error.message);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Error in getTasks method:', error);
      throw error;
    }
  }

}
