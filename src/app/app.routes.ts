import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/guards/auth.guard';
import { VentaComponent } from './dashboard/venta/venta.component';
import { CategoriaComponent } from './dashboard/categoria/categoria.component';
import { ProductoComponent } from './dashboard/producto/producto.component';
import { ReportesComponent } from './dashboard/reportes/reportes.component';
import { UsuariosComponent } from './dashboard/usuarios/usuarios.component';
import { ResumenComponent } from './dashboard/resumen/resumen.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            {path: 'resumen', component: ResumenComponent},
            {path: 'venta', component: VentaComponent},
            {path: 'usuarios', component: UsuariosComponent},
            {path: 'categorias', component: CategoriaComponent},
            {path: 'productos', component: ProductoComponent},
            {path: 'reportes', component: ReportesComponent}
        ]
    },
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', redirectTo: '/login', pathMatch: 'full'}
];
