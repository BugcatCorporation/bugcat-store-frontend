import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2'
import { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {
  

  constructor(private snackBar: MatSnackBar) { }

  mostrarAlerta(mensaje: string, tipo: string){
    this.snackBar.open(mensaje, tipo, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    })
  }

  mostrarAlertaSweet(mensaje: string, tipo: SweetAlertIcon){
    Swal.fire({
      title: mensaje,
      icon: tipo,
      confirmButtonText: 'Aceptar'
    })
  }

  
}
