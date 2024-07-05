import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = `${environment.endpoint}/api/usuarios`;
  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuarioPorId(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  crearUsuario(Usuario:Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.apiUrl,Usuario);
  }
  actualizarUsuario(id: number, usuario: Usuario) : Observable<Usuario>{
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }
}
