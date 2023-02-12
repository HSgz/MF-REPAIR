import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent {

  public menu = false
  public logo = 'https://firebasestorage.googleapis.com/v0/b/mf-repair-ef27e.appspot.com/o/users%2Fc-1675743283324?alt=media&token=8773ef23-4ddc-4e5f-980f-ee86bc4cdbee'

  toggle(){
    this.menu = !this.menu
  }

  touchLogo(){
    this.menu = false
  }
 
}
