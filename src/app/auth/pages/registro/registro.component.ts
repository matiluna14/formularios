import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private vs: ValidatorService,
              private emailValidator: EmailValidatorService) { }






  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)] ],
    email:  ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.emailValidator] ],
    username: ['', [Validators.required, this.vs.noPuedeSerWiltord ] ],
    password: ['', [Validators.required, Validators.minLength(6)] ],
    password2: ['', [Validators.required] ]
  }, {
    validators: [this.vs.camposIguales('password', 'password2')]
  })



  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Matias Luna',
      email: 'test@test.com',
      username: 'cristiano ronaldo',
      password: '123456',
      password2: '123456'
    })
  }


  campoValido(campo: string){
    return ( this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched );
  }


  get emailErrorsMsg(): string {
    const error = this.miFormulario.get('email')?.errors;

    if( error?.['required'] ){
      return 'El correo es obligatorio';
    }else if( error?.['pattern'] ){
      return 'El formato del correo es incorrecto'
    }else if( error?.['emailExistente']){
      return 'Ya existe un usuario con ese correo'
    }
    return '';
  }

  submitFormulario(){

    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }
}
