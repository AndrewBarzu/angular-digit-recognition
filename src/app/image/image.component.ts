import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  arr = Array;
  width = 25;
  height = 25;
  image = [];
  click = 0;

  constructor() {
    for (let i = 0; i < this.height; i++){
      this.image[i] = [];
      for (let j = 0; j < this.width; j++){
        this.image[i][j] = 0;
      }
    }
  }

  ngOnInit(): void {
  }

  draw(x: number, y: number): void{
    this.image[x][y] = this.image[x][y] === 0 ? 255 : 0;
  }

  mouseDown(): boolean{
    return this.click > 0;
  }
}
