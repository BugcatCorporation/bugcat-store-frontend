import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../services/producto.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Importar después de jsPDF

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.productoService.getProductos().subscribe((data: Producto[]) => {
      this.productos = data;
    });
  }

  generatePDF(): void {
    const doc = new jsPDF();
    const col = ["ID", "Nombre", "Descripción", "Precio", "Stock", "Activo"];
    const rows: any[] = [];

    this.productos.forEach(producto => {
      const temp = [producto.idproducto, producto.nombre, producto.descripcion, producto.precio, producto.stock, producto.activo ? 'Sí' : 'No'];
      rows.push(temp);
    });

    (doc as any).autoTable({
      head: [col],
      body: rows,
      startY: 10
    });

    doc.save('productos.pdf');
  }
}
