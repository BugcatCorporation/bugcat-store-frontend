import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material.module';
import { Categoria } from '../../interfaces/categoria';
import { CategoriaService } from '../../services/categoria.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-categoria',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule,CommonModule],
  templateUrl: './modal-categoria.component.html',
  styleUrl: './modal-categoria.component.css'
})
export class ModalCategoriaComponent {
  formularioCategoria: FormGroup;
  tituloAccion: string = "Nueva Categoria";
  botonAccion: string = "Agregar";
  listaCategorias: Categoria[] = [];

  constructor(
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<ModalCategoriaComponent>,
    private snackBar: MatSnackBar
  ) {
    this.formularioCategoria = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      descripcion: new FormControl('')
    });
  }

  onSubmit() {
    if (this.formularioCategoria.valid) {
      const nuevaCategoria: Categoria = this.formularioCategoria.value;
      this.categoriaService.crearCategoria(nuevaCategoria).subscribe({
        next: (categoria) => {
          this.snackBar.open('Categoría creada exitosamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close(true); // Cierra el modal y envía `true` como resultado
        },
        error: () => {
          this.snackBar.open('Error al crear la categoría', 'Cerrar', { duration: 3000 });
        }
      });
    }
  }
}
