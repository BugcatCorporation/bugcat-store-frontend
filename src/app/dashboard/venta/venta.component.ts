import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PedidoService } from '../services/pedido.service';
import { ProductoService } from '../services/producto.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Pedido, PedidoCreacion } from '../interfaces/pedido';
import { Producto } from '../interfaces/producto';
import { DetallePedido, DetallePedidoCreacion, DetallePedidoPrePro } from '../interfaces/detalle-pedido';
import { MatCardModule } from '@angular/material/card';
import { MaterialModule } from '../../shared/material/material.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [ MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  ventas: Pedido[] = [];
  form: FormGroup;
  dataSource: MatTableDataSource<DetallePedido>; // Cambiado a DetallePedido
  editing: boolean = false;
  selectedPedidoId: number | null = null;
  data!: MatTableDataSource<Producto>;
  lstProducto: Producto[] = [];
  detallesPedido: DetallePedido[] = [];

  displayedColumns: string[] = ['productoNombre', 'precio']; // Definición de columnas

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private productoService: ProductoService,
    private dialog: MatDialog
  ) {
    this.form = this.fb.group({
      fechaPedido: ['', Validators.required],
      estado: ['', Validators.required],
      total: ['', Validators.required],
      direccionEnvio: ['', Validators.required],
      usuarioId: ['', Validators.required],
      detalles: this.fb.array([])
    });
    this.dataSource = new MatTableDataSource(this.detallesPedido);
  }

  ngOnInit(): void {
    this.loadVentas();
    this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(productos => {
      this.lstProducto = productos;
      this.data = new MatTableDataSource(this.lstProducto);
      this.data.paginator = this.paginator;
      this.data.sort = this.sort;
      console.log(this.lstProducto);
    });
  }

  loadVentas(): void {
    this.pedidoService.getPedidos().subscribe((data: Pedido[]) => {
      this.ventas = data;
    });
  }

  addOrUpdateVenta(): void {
    if (this.form.valid) {
      const pedidoCreacion: PedidoCreacion = this.form.value;
      if (this.editing && this.selectedPedidoId !== null) {
        this.pedidoService.actualizarPedido(this.selectedPedidoId, pedidoCreacion).subscribe(() => {
          this.loadVentas();
          this.form.reset();
          this.editing = false;
          this.selectedPedidoId = null;
        });
      } else {
        this.pedidoService.crearPedido(pedidoCreacion).subscribe(() => {
          this.loadVentas();
          this.form.reset();
        });
      }
    }
  }

  editVenta(pedido: Pedido): void {
    this.form.patchValue({
      fechaPedido: pedido.fechaPedido,
      estado: pedido.estado,
      total: pedido.total,
      direccionEnvio: pedido.direccionEnvio,
      usuarioId: pedido.usuarioId,
      detalles: pedido.detalles.map(detalle => ({
        cantidad: detalle.cantidad,
        precio: detalle.precio,
        productoId: detalle.productoId,
        pedidoId: detalle.pedidoId
      }))
    });
    this.editing = true;
    this.selectedPedidoId = pedido.idpedido;
  }

  cancelEdit(): void {
    this.form.reset();
    this.editing = false;
    this.selectedPedidoId = null;
  }

  deleteVenta(id: number): void {
    this.pedidoService.eliminarPedido(id).subscribe(() => {
      this.loadVentas();
    });
  }

  comprarProducto(producto: Producto): void {
    if (!producto.precio || !producto.idproducto) {
      console.error('Producto sin precio o id definido:', producto);
      return;
    }

    const detalle: DetallePedido = {
      iddetallepedido: this.detallesPedido.length + 1,
      cantidad: 1,
      precio: producto.precio,
      productoId: producto.idproducto,
      pedidoId: 0, // El id del pedido puede ser actualizado cuando se cree el pedido
      producto: producto
    };

    this.detallesPedido.push(detalle);
    console.log('Producto agregado:', producto);

    // Actualizar el MatTableDataSource
    this.dataSource.data = this.detallesPedido;
  }

}
