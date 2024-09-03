import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../../myService/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  standalone: true,
  imports: [],
  templateUrl: './log-out.component.html',
  styleUrl: './log-out.component.css'
})
export class LogOutComponent implements OnInit {

  constructor(private supabaseService: SupabaseService, private router: Router) { }

  ngOnInit(): void {
    
    this.supabaseService.logoutS();
    this.router.navigateByUrl('');
  }

}
