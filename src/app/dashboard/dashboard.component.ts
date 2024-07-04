import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../shared/material/material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { jwtDecode } from 'jwt-decode';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MaterialModule, RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  username: string | undefined;
  authorities: any[] | undefined;
  autoridad: string | undefined;
  menuItems!: any[];

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

    this.filterMenuItemsBasadoEnRoles();
  }

  filterMenuItemsBasadoEnRoles(): void {
    const roles: any = this.autoridad;
    this.menuItems = [
      { path: '/dashboard/resumen', icon:'dashboard', title: 'Resumen', allowedRoles: ['Administrador']},
      { path: '/dashboard/usuarios', icon:'group', title: 'Usuarios', allowedRoles: ['Administrador']},
      { path: '/dashboard/productos', icon:'collections_bookmark',title: 'Productos', allowedRoles: ['Administrador']},
      { path: '/dashboard/venta', icon:'currency_exchange',title: 'Venta', allowedRoles: ['Administrador', 'Usuario']},
      { path: '/dashboard/categorias', icon:'edit_note',title: 'Categorias', allowedRoles: ['Administrador']},
      { path: '/dashboard/reportes', icon:'assessment',title: 'Reportes', allowedRoles: ['Administrador', 'Usuario']},
    ].filter(item => item.allowedRoles.includes(roles));
  }

  salir(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
