import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit{

  constructor(private fb:FormBuilder) { }

  ngOnInit(){

  }


  //[valores de los campos, validaciones sincronas , validaciones asincronas ,]
  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(4)] ],
    precio: [ , [Validators.required, Validators.min(0)] ],
    existencias: [  , [Validators.required, Validators.min(0)] ]
  })

  
  campoNombreValido(){
    return  (this.miFormulario.controls['nombre'].errors && this.miFormulario.controls['nombre'].touched)
  }

  campoPrecioValido(){
    return  (this.miFormulario.controls['precio'].errors && this.miFormulario.controls['precio'].touched)
  }

  campoExistenciasValido(){
    return  (this.miFormulario.controls['existencias'].errors && this.miFormulario.controls['existencias'].touched)
  }


  guardar(){
    if (this.miFormulario.invalid){
      this.miFormulario.markAllAsTouched();
      return;
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }

}


