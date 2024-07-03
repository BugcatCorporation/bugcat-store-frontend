import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl = `${environment.endpoint}/api/categoria`;

  constructor(private http: HttpClient) { }

  getCategorias(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.apiUrl);
  }

  getCategoriaPorId(id: number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.apiUrl}/${id}`);
  }

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }

  actualizarCategoria(id: number, categoria: Categoria) : Observable<Categoria>{
    return this.http.put<Categoria>(`${this.apiUrl}/${id}`, categoria);
  }
}
