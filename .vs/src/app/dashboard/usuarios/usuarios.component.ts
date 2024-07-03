import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from '../interfaces/usuario';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UsuarioService } from '../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalUsuarioComponent } from './modal-usuario/modal-usuario.component';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  columnasTabla:string[] = ["ID","nombre","email","username","admin","contrasena","direccion","telefono","fechacreacion","activo"]
  data!: MatTableDataSource<Usuario>;
  lstUsuario: Usuario[]= [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService, private dialog: MatDialog) { 
    this.obtenerUsuarios();    
    // console.log(this.data);
  }

  obtenerUsuarios(){
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.lstUsuario = usuarios;
      this.data = new MatTableDataSource(this.lstUsuario);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      console.log(this.lstUsuario);
    })
  }

  nuevoUsuario(){
    this.dialog.open(ModalUsuarioComponent, {
      disableClose: true
    }).afterClosed().subscribe(data => {
      if(data == true){
        this.obtenerUsuarios();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.data.filter = filterValue.trim().toLowerCase();
    if(this.data.paginator){
      this.data.paginator.firstPage();
    }
  }
}
