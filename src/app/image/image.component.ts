import { Component, OnInit } from '@angular/core';
import {NetworkService} from '../network.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  arr = Array;
  width = 200;
  height = 200;
  image = [];
  prediction: any;

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private paint: boolean;

  private clickX: number[] = [];
  private clickY: number[] = [];
  private clickDrag: boolean[] = [];

  constructor(public service: NetworkService) {
  }

  private createUserEvents(): void {
    const canvas = this.canvas;

    canvas.addEventListener('mousedown', this.pressEventHandler);
    canvas.addEventListener('mousemove', this.dragEventHandler);
    canvas.addEventListener('mouseup', this.releaseEventHandler);
    canvas.addEventListener('mouseout', this.cancelEventHandler);

    canvas.addEventListener('touchstart', this.pressEventHandler);
    canvas.addEventListener('touchmove', this.dragEventHandler);
    canvas.addEventListener('touchend', this.releaseEventHandler);
    canvas.addEventListener('touchcancel', this.cancelEventHandler);

    document.getElementById('clear')
      .addEventListener('click', this.clearEventHandler);
  }

  private redraw(): void {
    const clickX = this.clickX;
    const context = this.context;
    const clickDrag = this.clickDrag;
    const clickY = this.clickY;
    for (let i = 0; i < clickX.length; ++i) {
      context.beginPath();
      if (clickDrag[i] && i) {
        context.moveTo(clickX[i - 1], clickY[i - 1]);
      } else {
        context.moveTo(clickX[i] - 1, clickY[i]);
      }

      context.lineTo(clickX[i], clickY[i]);
      context.stroke();
    }
    context.closePath();
  }
  private addClick(x: number, y: number, dragging: boolean): void {
    this.clickX.push(x);
    this.clickY.push(y);
    this.clickDrag.push(dragging);
  }

  public clearCanvas(): void {
    this.context.fillStyle = 'white';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.clickX = [];
    this.clickY = [];
    this.clickDrag = [];
  }

  private clearEventHandler = () => {
    this.clearCanvas();
  }

  private releaseEventHandler = () => {
    this.paint = false;
    this.redraw();
  }

  private cancelEventHandler = () => {
    this.paint = false;
  }

  private pressEventHandler = (e: MouseEvent | TouchEvent) => {
    const bounds = this.canvas.getBoundingClientRect();
    let mouseX = (e as TouchEvent).changedTouches ?
      (e as TouchEvent).changedTouches[0].pageX :
      (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches ?
      (e as TouchEvent).changedTouches[0].pageY :
      (e as MouseEvent).pageY;
    mouseX -= bounds.left;
    mouseY -= bounds.top;

    this.paint = true;
    this.addClick(mouseX, mouseY, false);
    this.redraw();
  }

  private dragEventHandler = (e: MouseEvent | TouchEvent) => {
    const bounds = this.canvas.getBoundingClientRect();
    let mouseX = (e as TouchEvent).changedTouches ?
      (e as TouchEvent).changedTouches[0].pageX :
      (e as MouseEvent).pageX;
    let mouseY = (e as TouchEvent).changedTouches ?
      (e as TouchEvent).changedTouches[0].pageY :
      (e as MouseEvent).pageY;
    mouseX -= bounds.left;
    mouseY -= bounds.top;

    if (this.paint) {
      this.addClick(mouseX, mouseY, true);
      this.redraw();
    }

    e.preventDefault();
  }

  ngOnInit(): void {
    const canvas = document.getElementById('canvas') as
      HTMLCanvasElement;
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.lineJoin = 'round';
    context.strokeStyle = 'black';
    context.lineWidth = 30;
    context.fillStyle = 'gray';

    this.canvas = canvas;
    this.context = context;

    this.clearCanvas();
    this.redraw();
    this.createUserEvents();
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

  send(): void{
    const canvas = document.getElementById('canvas2') as HTMLCanvasElement;
    canvas.getContext('2d').clearRect(0, 0, 20, 20);
    canvas.getContext('2d').drawImage(this.canvas, 0, 0, 20, 20);
    const rawData = canvas.getContext('2d').getImageData(0, 0, 20, 20).data;
    const image = [];
    for (let i = 0; i < 1600; i += 4){
        const R = 255 - rawData[i];
        const G = 255 - rawData[i + 1];
        const B = 255 - rawData[i + 2];
        image[i / 4] = (R + G + B) / (255 * 3);
    }
    this.service.predict(image)
      .subscribe((data: any) => this.prediction = data);
  }
}
