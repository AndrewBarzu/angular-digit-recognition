import { Component, OnInit } from '@angular/core';
import {NetworkService} from '../network.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  arr = Array;
  width = 20;
  height = 20;
  image = [];
  modes = {draw: 1, erase: 0};
  public mode = 'draw';
  prediction: any;
  constructor(public service: NetworkService) {
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
    this.image[x][y] = this.modes[this.mode];
  }

  reset(): void{
    this.image = [];
    for (let i = 0; i < this.height; i++){
      this.image[i] = [];
      for (let j = 0; j < this.width; j++){
        this.image[i][j] = 0;
      }
    }
  }

  change_mode(): void{
    this.mode = this.mode === 'draw' ? 'erase' : 'draw';
  }

  capitalise(str: string): string{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  send(): void{
    const image = [];
    for (let i = 0; i < this.height; i++)
    {
      for (let j = 0; j < this.width; j++)
      {
        image[this.width * i + j] = this.image[j][i];
        if (this.image[i][j] === 1) {
          if (i < this.height - 1 && this.image[j][i + 1] !== 1) {
            image[this.width * (i + 1) + j] = 0.2;
          }
          if (j < this.width - 1 && this.image[j + 1][i] !== 1) {
            image[this.width * i + j + 1] = 0.2;
          }
          if (i > 0  && this.image[j][i + 1] !== 1) {
            image[this.width * (i - 1) + j] = 0.2;
          }
          if (j > 0 && this.image[j + 1][i] !== 1) {
            image[this.width * i + j - 1] = 0.2;
          }
        }
      }
    }
    this.service.predict(image)
      .subscribe((data: any) => this.prediction = data);
  }
}
