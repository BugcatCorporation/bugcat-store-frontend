import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Producto } from '../../interfaces/producto';
import { ProductoService } from '../../services/producto.service';
import { UtilidadService } from '../../../shared/utilidad.service';

@Component({
  selector: 'app-modal-producto',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './modal-producto.component.html',
  styleUrl: './modal-producto.component.css'
})
export class ModalProductoComponent implements OnInit {

  formularioProducto: FormGroup;
  tituloAccion: string = "Nuevo Producto";
  botonAccion: string = "Agregar"

  constructor(
    private modalActual: MatDialogRef<ModalProductoComponent>,
    @Inject(MAT_DIALOG_DATA) public datosProducto: Producto,
    private fb: FormBuilder,
    private productoService: ProductoService,
    private utilidadService: UtilidadService
  ) {
    this.formularioProducto = this.fb.group({
      idcategoria: [""],
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required],
      precio: [null, [Validators.required, this.numberValidator]],
      stock: [null, [Validators.required, this.numberValidator]],
      imagen: ["", Validators.required],
      activo: [true, [Validators.required, this.booleanValidator]]
    })

    if (this.datosProducto != null) {
      this.tituloAccion = "Editar Producto";
      this.botonAccion = "Actualizar";
    }

    console.log(this.datosProducto);
  }

  ngOnInit(): void {
    if (this.datosProducto != null) {
      this.formularioProducto.patchValue({
        idcategoria: this.datosProducto.idproducto,
        nombre: this.datosProducto.nombre,
        descripcion: this.datosProducto.descripcion,
        precio: this.datosProducto.precio,
        stock: this.datosProducto.stock,
        imagen: this.datosProducto.imagen,
        activo: this.datosProducto.activo
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

  guardarEditarProducto() {
    if (this.formularioProducto.invalid) {
      this.utilidadService.mostrarAlerta("Formulario inválido", "error");
      return;
    }

    const producto: Producto = {
      idproducto: this.formularioProducto.value.idproducto,
      nombre: this.formularioProducto.value.nombre,
      descripcion: this.formularioProducto.value.descripcion,
      precio: this.formularioProducto.value.precio,
      stock: this.formularioProducto.value.stock,
      imagen: this.formularioProducto.value.imagen,
      activo: this.formularioProducto.value.activo,
    }

    if (this.datosProducto == null) {
      this.productoService.crearProducto(producto).subscribe({
        next: (data) => {
          if (data != null) {
            this.utilidadService.mostrarAlerta("Producto creado correctamente", "success");
            this.modalActual.close(true);
          } else {
            this.utilidadService.mostrarAlerta("Error al crear el producto", "error");
          }
        }
      })
    } else {
      this.productoService.actualizarProducto(this.datosProducto.idproducto!, producto).subscribe({
        next: (data) => {
          if (data != null) {
            this.utilidadService.mostrarAlerta("Producto actualizado correctamente", "success");
            this.modalActual.close(true);
          } else {
            this.utilidadService.mostrarAlerta("Error al actualizar el producto", "error");
          }
        }
      })
    }
  }
}
