import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material.module';
import { Categoria } from '../../interfaces/categoria';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from '../../services/categoria.service';
import { UtilidadService } from '../../../shared/utilidad.service';

@Component({
  selector: 'app-modal-categoria',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './modal-categoria.component.html',
  styleUrl: './modal-categoria.component.css'
})
export class ModalCategoriaComponent implements OnInit {
  formularioCategoria: FormGroup;
  tituloAccion: string = "Nueva Categoria";
  botonAccion: string = "Agregar";
  // listaCategorias: Categoria[] = [];

  constructor(
    private modalActual: MatDialogRef<ModalCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA)
    public datosCategoria : Categoria,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private utilidadService: UtilidadService
  ){
    this.formularioCategoria = this.fb.group({
      idcategoria: [""],
      nombre: ["", Validators.required],
      descripcion: ["", Validators.required]
    })

    if(this.datosCategoria != null){
      this.tituloAccion = "Editar Categoria";
      this.botonAccion = "Actualizar";
    }

    console.log(this.datosCategoria);
  }

  ngOnInit():  void {
    if(this.datosCategoria != null){
      this.formularioCategoria.patchValue({
        idcategoria: this.datosCategoria.idcategoria,
        nombre: this.datosCategoria.nombre,
        descripcion: this.datosCategoria.descripcion
      })
    }
  }

  guardarEditarCategoria(){
    const categoria: Categoria = {
      idcategoria: this.formularioCategoria.value.idcategoria,
      nombre: this.formularioCategoria.value.nombre,
      descripcion: this.formularioCategoria.value.descripcion
    }

    if(this.datosCategoria == null){
      this.categoriaService.crearCategoria(categoria).subscribe({
        next: (data) => {
          if(data != null){
            this.utilidadService.mostrarAlerta("Categoria creada correctamente", "success");
            this.modalActual.close(true);
          } else {
            this.utilidadService.mostrarAlerta("Error al crear la categoria", "error");
          }
        }
      })
    } else {
      this.categoriaService.actualizarCategoria(this.datosCategoria.idcategoria!, categoria).subscribe({
        next:(data) => {
          if(data != null){
            this.utilidadService.mostrarAlerta("Categoria actualizada correctamente", "success");
            this.modalActual.close(true);
          } else {
            this.utilidadService.mostrarAlerta("Error al actualizar la categoria", "error");
          }
        }
      })
    }

  }
}
