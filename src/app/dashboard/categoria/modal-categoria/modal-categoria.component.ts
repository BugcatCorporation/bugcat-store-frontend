import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MaterialModule } from '../../../shared/material/material.module';
import { Categoria } from '../../interfaces/categoria';

@Component({
  selector: 'app-modal-categoria',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './modal-categoria.component.html',
  styleUrl: './modal-categoria.component.css'
})
export class ModalCategoriaComponent {
  // formularioCategoria: FormGroup;
  tituloAccion: string = "Nueva Categoria";
  botonAccion: string = "Agregar";
  listaCategorias: Categoria[] = [];
}
