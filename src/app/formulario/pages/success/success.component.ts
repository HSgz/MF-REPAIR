import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../common/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styles: [
  ]
})
export class SuccessComponent {

  private _firebaseService = inject(FirebaseService)
  private _router = inject(Router)

  redirect(){
    this._firebaseService.logout()
    this._router.navigate(['/inicio'])
  }

}
