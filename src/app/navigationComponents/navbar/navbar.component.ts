/**
 * Created by sirine on 6/13/17.
 */
import {Component} from '@angular/core';
import {AuthentificationService} from '../../services/authentificationService'
@Component({
  selector: 'navbar',
  styleUrls: ['./navbar.component.css'],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor (private authentificationService: AuthentificationService) {}

  credentials= {}
  success= false
  errorMessage = {}
  signIn(){
    console.log(this.credentials)
    this.authentificationService.signIn(this.credentials).subscribe(
      data => this.success = data,
      error =>  this.errorMessage = <any>error);
  }
}
