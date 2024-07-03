import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { CategoriaService } from '../services/categoria.service';
import { MaterialModule } from '../../shared/material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalCategoriaComponent } from './modal-categoria/modal-categoria.component';

@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {

  columnasTabla: string[] = ["ID", "nombre", "descripcion", "acciones"]
  data!: MatTableDataSource<Categoria>;
  lstCategorias: Categoria[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoriaService: CategoriaService, private dialog: MatDialog) { 
    this.obtenerCategorias();
  }

  obtenerCategorias(){
    this.categoriaService.getCategorias().subscribe(categorias => {
      this.lstCategorias = categorias;
      this.data = new MatTableDataSource(this.lstCategorias);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      console.log(this.lstCategorias);
    })
  }

  nuevaCategoria(){
    this.dialog.open(ModalCategoriaComponent, {
      disableClose: true
    }).afterClosed().subscribe(data => {
      if(data == true){
        this.obtenerCategorias();
      }
    })
  }

  editarCategoria(categoria: Categoria){
    this.dialog.open(ModalCategoriaComponent, {
      disableClose: true,
      data: categoria
    }).afterClosed().subscribe(resultado => {
      if(resultado == true){
        this.obtenerCategorias();
        
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
