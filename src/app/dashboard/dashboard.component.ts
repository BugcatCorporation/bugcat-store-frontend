import { Component } from '@angular/core';
import { MaterialModule } from '../shared/material/material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService){

  }

  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
