import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-navigation-map',
  templateUrl: './navigation-map.component.html',
  styleUrls: ['./navigation-map.component.scss']
})
export class NavigationMapComponent implements OnInit {

  rol: any;

  constructor(
    private _auth: AuthService
  ) {

    this.rol = _auth.getRol();

  }

  ngOnInit(): void {
  }

  

}
