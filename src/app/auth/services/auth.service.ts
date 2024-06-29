import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Login } from '../interfaces/login';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { JwtResponse } from '../interfaces/JwtResponse';

import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<JwtResponse | null>;
  private currentUser: Observable<JwtResponse | null>;
  private apiUrl = environment.endpoint

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    this.currentUserSubject = new BehaviorSubject<JwtResponse | null>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // login(usuario: string, password: string): boolean {
  //   if (usuario === 'Aguero' && password === '12345') {
  //     sessionStorage.setItem('Usuario', 'Aguero');
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  login(credenciales: Login): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(`${this.apiUrl}/login`, credenciales)
      .pipe(map(response => {
        localStorage.setItem("currentUser", JSON.stringify(response));
        this.currentUserSubject.next(response);

        //Decodificar el token para extraer idEntidad
        const decodedToken = jwtDecode<any>(response.token!);
        if (decodedToken.idEntidad) {
          localStorage.setItem('idEntidad', decodedToken.idEntidad.toString());
        }

        return response;
      }))
  }

  esAutenticado(): boolean {
    return !!this.currentUserSubject.value;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    
    this.currentUserSubject.next(null);
    sessionStorage.clear();
  }

  isLogged(): boolean {
    return !!sessionStorage.getItem("Usuario")
  }

}
