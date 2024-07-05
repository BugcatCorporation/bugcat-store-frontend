import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { UtilidadService } from '../../../shared/utilidad.service';

@Component({
  selector: 'app-modal-usuario',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent  implements OnInit {

  formularioUsuario: FormGroup;
  tituloAccion: string = "Nuevo Usuario";
  botonAccion: string = "Agregar"

  constructor(
    private modalActual: MatDialogRef<ModalUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public datosUsuario: Usuario,
    private fb: FormBuilder,
    private UsuarioService: UsuarioService,
    private utilidadService: UtilidadService
  ) {
    this.formularioUsuario = this.fb.group({
      idusuario: [""],
      nombre: ["", Validators.required],
      email: ["", Validators.required],
      username: ["", [Validators.required]],
      contrasena: ["", [Validators.required]],
      direccion: ["", [Validators.required]],
      telefono: ["", Validators.required],
      activo: [true, [Validators.required, this.booleanValidator]]
    })

    if (this.datosUsuario != null) {
      this.tituloAccion = "Editar Usuario";
      this.botonAccion = "Actualizar";
    }

    console.log(this.datosUsuario);
  }

  ngOnInit(): void {
    if (this.datosUsuario != null) {
      this.formularioUsuario.patchValue({
        idusuario: this.datosUsuario.idusuario,
        nombre: this.datosUsuario.nombre,
        email: this.datosUsuario.email,
        username: this.datosUsuario.username,
        contrasena: this.datosUsuario.contrasena,
        direccion: this.datosUsuario.direccion,
        telefono: this.datosUsuario.telefono,
        activo: this.datosUsuario.activo
      })
    }
  }

  numberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return !isNaN(value) && value !== null && value !== '' ? null : { invalidNumber: true };
  }

  booleanValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value === true || value === false ? null : { invalidBoolean: true };
  }

  guardarEditarUsuario() {
    if (this.formularioUsuario.invalid) {
      this.utilidadService.mostrarAlerta("Formulario inválido", "error");
      return;
    }

    const Usuario: Usuario = {
      idusuario: this.formularioUsuario.value.idusuario,
      nombre: this.formularioUsuario.value.nombre,
      email: this.formularioUsuario.value.email,
      username: this.formularioUsuario.value.username,
      contrasena: this.formularioUsuario.value.contrasena,
      direccion: this.formularioUsuario.value.direccion,
      telefono: this.formularioUsuario.value.telefono,
      activo: this.formularioUsuario.value.activo,
    }

    if (this.datosUsuario == null) {
      this.UsuarioService.crearUsuario(Usuario).subscribe({
        next: (data) => {
          if (data != null) {
            this.utilidadService.mostrarAlerta("Usuario creado correctamente", "success");
            this.modalActual.close(true);
          } else {
            this.utilidadService.mostrarAlerta("Error al crear el Usuario", "error");
          }
        }
      })
    } else {
      this.UsuarioService.actualizarUsuario(this.datosUsuario.idusuario!, Usuario).subscribe({
        next: (data) => {
          if (data != null) {
            this.utilidadService.mostrarAlerta("Usuario actualizado correctamente", "success");
            this.modalActual.close(true);
          } else {
            this.utilidadService.mostrarAlerta("Error al actualizar el Usuario", "error");
          }
        }
      })
    }
  }
}
