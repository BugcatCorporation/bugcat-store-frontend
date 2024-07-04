import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DetallePedido, DetallePedidoCreacion } from '../interfaces/detalle-pedido';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetallePedidoService {

  private apiUrl = `${environment.endpoint}/api/detallepedido`;

  constructor(private http: HttpClient) { }

  getDetalles(): Observable<DetallePedido[]> {
    return this.http.get<DetallePedido[]>(this.apiUrl);
  }

  getDetallePorId(id: number): Observable<DetallePedido> {
    return this.http.get<DetallePedido>(`${this.apiUrl}/${id}`);
  }

  crearDetalle(detalle: DetallePedidoCreacion): Observable<DetallePedido> {
    return this.http.post<DetallePedido>(this.apiUrl, detalle);
  }

  actualizarDetalle(id: number, detalle: DetallePedido): Observable<DetallePedido> {
    return this.http.put<DetallePedido>(`${this.apiUrl}/${id}`, detalle);
  }

  eliminarDetalle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
