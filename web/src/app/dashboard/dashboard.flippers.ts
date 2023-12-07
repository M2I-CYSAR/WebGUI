import { CanvasImage } from './dashboard.canvasimage';
import { Message } from 'roslib';

export class Flippers {
  flipperImg : CanvasImage  = new CanvasImage("assets/Flipper.png");
  context : CanvasRenderingContext2D | undefined;

  flipperFL = new Flipper(this.flipperImg, 0, 180, -1,  70,  70, 0.08);
  flipperFR = new Flipper(this.flipperImg, 0,   0,  1, 230,  70, 0.08);
  flipperBL = new Flipper(this.flipperImg, 0, 180, -1,  70, 230, 0.08);
  flipperBR = new Flipper(this.flipperImg, 0,   0,  1, 230, 230, 0.08);
  flippers : Flipper[] = [this.flipperFL, this.flipperFR, this.flipperBL, this.flipperBR];

  constructor() {}

  update() : void {
    if (this.context === undefined) { return; }

    this.context.clearRect(0, 0, 300, 300);
    for (let i = 0; i < this.flippers.length; i++) {
      if (!this.flippers[i].flipperImg.isLoaded) {continue;}
      this.flippers[i].draw(this.context)
    }
  }

  set(msg : any) : void {
    this.flipperFL.angle = msg.front_left * -4;
    this.flipperFR.angle = msg.front_right * -4;
    this.flipperBL.angle = msg.back_left * -4;
    this.flipperBR.angle = msg.back_right * -4;
  }
}

class Flipper {
  flipperImg : CanvasImage;
  angle : number;
  homeAngle : number;
  direction : number;
  xPos : number;
  yPos : number;
  scale : number;
  constructor(flipperImg : CanvasImage, angle : number, homeAngle : number, direction : number, xPos : number, yPos : number, scale : number) {
    this.flipperImg = flipperImg;
    this.angle = angle;
    this.homeAngle = homeAngle;
    this.direction = direction;
    this.xPos = xPos;
    this.yPos = yPos;
    this.scale = scale;
  }

  draw(context : CanvasRenderingContext2D) : void {
    this.flipperImg.drawRotated(context, this.xPos, this.yPos, this.angle * this.direction + this.homeAngle, this.scale);
  }
}