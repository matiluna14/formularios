import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  constructor(private fb: FormBuilder) { }

  nuevoFavorito: FormControl = this.fb.control('', Validators.required);

  miFormulario: FormGroup = this.fb.group({
    nombre: ['' , [Validators.required, Validators.minLength(4)], ],
    favoritos: this.fb.array([ ['Metal Gear', , ], ['Death Stranding', , ], Validators.required, ])
  })


  campoNombreValido(){
    return  (this.miFormulario.controls['nombre'].errors && this.miFormulario.controls['nombre'].touched)
  }

  guardar(){

    if(this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
  }


  get favoritosArray(){
    return this.miFormulario.get('favoritos') as FormArray;
  }

  agregarFavorito(){
    if( this.nuevoFavorito.invalid ){
      return;
    }

    this.favoritosArray.push( this.fb.control( this.nuevoFavorito.value, Validators.required  ) );
    this.nuevoFavorito.reset();
  }

  borrarFavorito(indice: number){
    this.favoritosArray.removeAt(indice);
  }
  
}
