// src/app/services/pedido.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, PedidoCreacion } from '../interfaces/pedido';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl = `${environment.endpoint}/api/pedido`;

  constructor(private http: HttpClient) { }

  crearPedido(pedido: PedidoCreacion): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }
  
  eliminarPedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
