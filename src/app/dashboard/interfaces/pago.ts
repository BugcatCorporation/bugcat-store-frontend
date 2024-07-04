// src/app/interfaces/pago.ts
export interface Pago {
    idpago: number;
    metodoPago: string;
    monto: number;
    fechaPago: Date;
    pedidoId: number;
  }
  