import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilidadService } from '../../../shared/utilidad.service';
import Swal from 'sweetalert2';
import { Login } from '../../interfaces/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mostrarLoading: boolean = false;
  formulario: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private utilidadService: UtilidadService){
    this.formulario = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  iniciarSesion(){
    const usuario = this.formulario.get('usuario');
    const password = this.formulario.get('password');

    if(usuario && password){
      const credenciales: Login = {
        username: usuario.value,
        contrasena: password.value
      }
      
      console.log(credenciales)
      this.authService.login(credenciales).subscribe(data => {
        console.log(data);
        this.mostrarLoading = true;
        this.router.navigate(['/dashboard']);
      }, error => {
        console.log("Login error", error);
        this.utilidadService.mostrarAlerta('Usuario o contraseña incorrectos', 'Error');
      })

    } else {
      this.utilidadService.mostrarAlerta('Usuario o contraseña incorrectos', 'Error');
    }
  }

}