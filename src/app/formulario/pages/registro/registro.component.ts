import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../../common/components/hero/hero.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FirebaseService } from '../../../common/services/firebase.service';
import { Router } from '@angular/router';
import { CarnetSvgComponent } from '../../../common/components/carnet-svg/carnet-svg.component';
import { DocumentSvgComponent } from '../../../common/components/document-svg/document-svg.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ReactiveFormsModule,
    CarnetSvgComponent,
    DocumentSvgComponent,
  ],
  templateUrl: './registro.component.html',
  styles: [],
})
export class RegistroComponent {
  private _fb = inject(FormBuilder);
  private _firebaseServices = inject(FirebaseService);
  private route = inject(Router);

  miFormulario: FormGroup = this._fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.minLength(3)]],
    rut: [
      '',
      [
        Validators.required,
        Validators.pattern(this._firebaseServices.rutPattern),
      ],
    ],
    telefono: [
      '',
      [
        Validators.required,
        Validators.pattern(this._firebaseServices.TelefonoPattern),
      ],
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(this._firebaseServices.emailPattern),
      ],
    ],
    direccion: ['', [Validators.required, Validators.minLength(3)]],
    comuna: ['', [Validators.required, Validators.minLength(3)]],
    provincia: ['', [Validators.required, Validators.minLength(3)]],
    unloadImage: ['', Validators.required],
    unloadImage2: ['', Validators.required],
    unloadImage3: ['', Validators.required],
  });

  formInvalid(campo: string) {
    return (
      this.miFormulario.get(campo)?.invalid &&
      this.miFormulario.get(campo)?.touched
    );
  }

  enviar() {
    if (this.miFormulario.invalid) {
      return this.miFormulario.markAllAsTouched();
    }

    const {
      nombre,
      apellido,
      rut,
      telefono,
      email,
      direccion,
      comuna,
      provincia,
    } = this.miFormulario.getRawValue();

    try {
      this._firebaseServices.addUser({
        id: new Date().getTime().toString(),
        nombre,
        apellido,
        rut,
        telefono,
        email,
        direccion,
        comuna,
        provincia,
      });
      this.route.navigate(['formulario/success']);
    } catch (error) {
      return this.miFormulario.markAllAsTouched();
    }
  }

  uploadImage(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    const input = event.target;

    if (input.files === null) {
      return;
    }

    const file = input.files[0];

    try {
      this._firebaseServices.unloadImage(file);
    } catch (error) {
      console.log(error);
    }
  }
}
