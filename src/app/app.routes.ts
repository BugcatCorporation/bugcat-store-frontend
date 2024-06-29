import { Routes } from '@angular/router';
import { LoginComponent } from './auth/pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth/guards/auth.guard';
import { VentaComponent } from './dashboard/venta/venta.component';
import { CategoriaComponent } from './dashboard/categoria/categoria.component';
import { ProductoComponent } from './dashboard/producto/producto.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'dashboard', component: DashboardComponent,
        canActivate: [authGuard],
        children: [
            {path: 'venta', component: VentaComponent},
            {path: 'categorias', component: CategoriaComponent},
            {path: 'productos', component: ProductoComponent}
        ]
    },
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: '**', redirectTo: '/login', pathMatch: 'full'}
];
