import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SupabaseClient, createClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {

  private supabase: SupabaseClient;
  
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    console.log("connection : ",this.supabase);
    
  }

  isTaskAdded: boolean = false;
  isTaskDeleted: boolean = false;

  isLoggedIn: boolean = false;
  IDValue: string = '';
  sessionValue: any = {};

  async fetchDataS() {

    this.userCheck()
    
    try{

      await this.supabase.from('tasks').select()
      
      // console.log("this.IDValue : ",this.IDValue);
      const { data } = await this.supabase.from('tasks').select().eq('user_id',this.IDValue)
      console.log("success : ",data)
      return data
    }
    catch(error){
      console.log("error : ",error)
      return error
    }
  
  
  }

  async completedOrNotS(compTask: any) {
    console.log("compTask ",compTask);

      try {
        const { data } = await this.supabase.from('tasks').update({ completed: compTask.completed }).eq('id', compTask.id);
        // console.log("susccess", data);
      }catch(error) {
        console.log("error : ",error);
      }
  }


  async addTaskS(newTask: any) {

    // console.log("add task list : ",this.task);
    try{
    const data = await this.supabase.from('tasks').insert([newTask]).select();
    console.log('Task added successfully: ', data);
    this.succesRet(data);

    }
    catch(error) {
      console.error('Error adding task:', error);
    }
  }

  succesRet(taskData: any){
    if(taskData.status==201){
      this.isTaskAdded = true;
    }
    if(taskData.status==204){
      this.isTaskDeleted = true;
    }
  }

  //  Update task function

  async updateTaskS(upData: any){
    console.log("update data: ",upData)
    try{

      const data = await this.supabase.from('tasks').update([upData]).eq('id', upData.id);

      console.log('Error updating task:', data);

    }
    catch(error){
      console.error('Error updating task:', error);
    }

  }

  // Delete function 

  async deleteTaskS(delData: any){
    const response = await this.supabase.from('tasks').delete().eq('id', delData.id);
    console.log("task del: ",response);
    this.succesRet(response);

  }

  // signup service 

  signUperror: string = ''

  async signUpS(signUpData: any){

    const { data, error } = await this.supabase.auth.signUp(
      {
        email: signUpData.email,
        password: signUpData.pswd,
        options: {
          data: {
            userName: signUpData.userName
          }
        }
      }
    )
    
    console.log("signup : ",data);
    console.log("signup error: ",error);

    if(error){
      this.signUperror = error.message;
    }else {
      this.signUperror = 'Registeration success Kindly Login.'
    }

  }

  loginError: string = '';

  async loginS(loginData: any){
      
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.pswd,
    })

    console.log("loginS : ",data);
    console.log("loginS error: ",error);

    if(error){
      this.loginError = error.message;
    }
    
  }

  // user session check

  async userCheck() {
     this.supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(event, session);

        if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
          this.isLoggedIn = true;
          this.IDValue = session?.user.id! ;
          this.sessionValue = session;
        } else if (event === 'SIGNED_OUT') {
          this.isLoggedIn = false;
        }
      }
    );
  }

  // logout users

  async logoutS(){
    const { error } = await this.supabase.auth.signOut();
    console.log("logout errro : ",error);
    
  }

}
