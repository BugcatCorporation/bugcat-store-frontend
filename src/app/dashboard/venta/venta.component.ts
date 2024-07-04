import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../shared/material/material.module';
import { Pedido, PedidoCreacion } from '../interfaces/pedido';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { PedidoService } from '../services/pedido.service';
import { DetallePedidoService } from '../services/detallepedido.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-venta',
  standalone: true,
  imports: [MaterialModule,CommonModule,ReactiveFormsModule],
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css']
})
export class VentaComponent implements OnInit {
  ventas: Pedido[] = [];
  displayedColumns: string[] = ['idpedido', 'fechaPedido', 'estado', 'total', 'direccionEnvio', 'acciones'];
  form: FormGroup;
  dataSource: MatTableDataSource<Pedido>;
  editing: boolean = false;
  selectedPedidoId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private pedidoService: PedidoService,
    private detallePedidoService: DetallePedidoService
  ) {
    this.form = this.fb.group({
      fechaPedido: ['', Validators.required],
      estado: ['', Validators.required],
      total: ['', Validators.required],
      direccionEnvio: ['', Validators.required],
      usuarioId: ['', Validators.required],
      detalles: this.fb.array([])
    });
    this.dataSource = new MatTableDataSource(this.ventas); // Inicializar dataSource
  }

  ngOnInit(): void {
    this.loadVentas();
  }

  loadVentas(): void {
    this.pedidoService.getPedidos().subscribe((data: Pedido[]) => {
      this.ventas = data;
      this.dataSource.data = this.ventas; // Actualizar dataSource
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
}
