// src/app/interfaces/pedido.ts
import { DetallePedido, DetallePedidoCreacion } from './detalle-pedido';

export interface Pedido {
  idpedido: number;
  fechaPedido: Date;
  estado: string;
  total: number;
  direccionEnvio: string;
  detalles: DetallePedido[];
  usuarioId: number;
}

export interface PedidoCreacion {
  fechaPedido: String;
  estado: string;
  total: number;
  direccionEnvio: string;
  usuarioId: number;
  detalles: DetallePedidoCreacion[];
}
