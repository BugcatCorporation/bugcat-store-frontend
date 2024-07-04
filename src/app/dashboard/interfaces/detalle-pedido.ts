// src/app/dashboard/interfaces/detalle-pedido.ts
export interface DetallePedido {
  iddetallepedido: number;
  cantidad: number;
  precio: number;
  productoId: number;
  pedidoId: number;
  producto?: any;
}

export interface DetallePedidoCreacion {
  cantidad: number;
  precio: number;
  productoId: number;
  pedidoId: number;
}
