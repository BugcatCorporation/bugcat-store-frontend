import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../shared/material/material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  username: string | undefined;
  authorities: any[] | undefined;
  autoridad: string | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService){

  }

  ngOnInit(): void {
    const currentUser = localStorage.getItem('currentUser');

    if (currentUser) {
      try {
        const currentUserObj = JSON.parse(currentUser);
        const token = currentUserObj.token;

        const decodedToken: any = jwtDecode(token);

        this.username = decodedToken.sub; 
        this.authorities = JSON.parse(decodedToken.authorities);

        if(this.authorities!.length > 1) {
          this.autoridad = "Administrador"
        } else {
          this.autoridad = "Usuario"
        }

      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.error('No se encontró un token en el localStorage.');
    }

  }

  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
