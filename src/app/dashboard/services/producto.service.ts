import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Producto } from '../interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = `${environment.endpoint}/api/producto`;

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.apiUrl);
  }

  getProductoPorId(id: number): Observable<Producto>{
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  crearProducto(producto:Producto): Observable<Producto>{
    return this.http.post<Producto>(this.apiUrl,producto);
  }
  actualizarProducto(id: number, producto: Producto) : Observable<Producto>{
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }
  
}
