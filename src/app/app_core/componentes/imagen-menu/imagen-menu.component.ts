import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-imagen-menu',
  templateUrl: './imagen-menu.component.html',
  styleUrls: ['./imagen-menu.component.scss']
})
export class ImagenMenuComponent implements OnInit {
  @Input()
  titulo:string;

  constructor() { }

  ngOnInit() {
    console.log(this.titulo);
  }

}
