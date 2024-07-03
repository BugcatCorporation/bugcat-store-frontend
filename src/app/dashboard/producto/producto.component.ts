import { Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { Producto } from '../interfaces/producto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoService } from '../services/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';

@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent {
  columnasTabla: string[] = ["ID","nombre","descripcion","precio","stock","imagen","acciones"]
  data!: MatTableDataSource<Producto>;
  lstProducto: Producto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productoService: ProductoService, private dialog: MatDialog) { 
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.productoService.getProductos().subscribe(productos => {
      this.lstProducto = productos;
      this.data = new MatTableDataSource(this.lstProducto);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      console.log(this.lstProducto);
    })
  }

  nuevoProducto(){
    this.dialog.open(ModalProductoComponent, {
      disableClose: true
    }).afterClosed().subscribe(data => {
      if(data == true){
        this.obtenerProductos();
      }
    })
  }

  editarCategoria(producto: Producto){
    this.dialog.open(ModalProductoComponent, {
      disableClose: true,
      data: producto
    }).afterClosed().subscribe(resultado => {
      if(resultado == true){
        this.obtenerProductos();

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
