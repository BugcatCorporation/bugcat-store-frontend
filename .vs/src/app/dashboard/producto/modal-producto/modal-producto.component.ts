import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material.module';
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
 tituloAccion: String = "Nuevo Producto";
 botonAccion: String = "Agregar";

 constructor(
  private modalActual: MatDialogRef<ModalProductoComponent>,
  @Inject(MAT_DIALOG_DATA)
  public datosProducto: Producto,
  private fb: FormBuilder,
  private productoService: ProductoService,
  private utilidadService: UtilidadService
 ){
    this.formularioProducto = this.fb.group({
      idproducto:[""],
      nombre: ["", Validators.required],
      descripcion:["",Validators.required],
      precio: ["", Validators.required],
      stock: ["", Validators.required],
      imagen: ["", Validators.required],
      activo:["", Validators.required]
    })
    if(
      this.datosProducto != null){
        this.tituloAccion = "Editar Producto";
        this.botonAccion = "Actualizar"
      }
      console.log(this.datosProducto);
 }
 ngOnInit(): void {
   if (this.datosProducto != null ) {
    this.formularioProducto.patchValue({
      idproducto:this.datosProducto.idproducto,
      nombre:this.datosProducto.nombre,
      descripcion:this.datosProducto.descripcion,
      precio:this.datosProducto.precio,
      stock:this.datosProducto.stock,
      imagen:this.datosProducto.imagen,
      activo:this.datosProducto.activo
    })
   }
 }
  guardarEditarProducto(){
    const producto : Producto ={
      idproducto: this.formularioProducto.value.idproducto,
      nombre:this.formularioProducto.value.nombre,
      descripcion:this.formularioProducto.value.descripcion,
      precio:this.formularioProducto.value.precio,
      stock:this.formularioProducto.value.stock,
      imagen:this.formularioProducto.value.imagen,
      activo:this.formularioProducto.value.activo
    }
    if (this.datosProducto == null) {
      this.productoService.crearProducto(producto).subscribe({
        next:(data) =>{
          if(data != null){
            this.utilidadService.mostrarAlerta("Producto Creado correctamente", "success");
            this.modalActual.close(true);
          }else{
            this.utilidadService.mostrarAlerta("Error al crear un producto", "error");
          }
        }
      })
    }else{
      this.productoService.actualizarProducto(this.datosProducto.idproducto!, producto).subscribe(
        {
          next:(data) => {
            if (data != null) {
              this.utilidadService.mostrarAlerta("Producto actualizado correctamente", "succes");
              this.modalActual.close(true);
            }else{
              this.utilidadService.mostrarAlerta("Error al actualizar un producto", "error");
            }
          }
        }
      )
    }
  }

}
