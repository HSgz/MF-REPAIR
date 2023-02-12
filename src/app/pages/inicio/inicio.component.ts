import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../../common/services/firebase.service';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styles: [],
})
export class InicioComponent {
  private _firebaseService = inject(FirebaseService);
  private _route = inject(Router);
  toggleButton = false

  login() {
    this.toggleButton = !this.toggleButton
  
    this._firebaseService
      .login(environment.user)
      .then((resp) => {
        this._route.navigate(['/formulario/registro']);
      })
      .catch(err => console.log(err));
  }

}
