export class CanvasImage {
  isLoaded: boolean;
  image: HTMLImageElement = new Image();
  
  constructor(data: string) {
    this.isLoaded = false;
    this.image.src = data;
    this.image.onload = () => {
      this.isLoaded = true;
    };
  }

  draw(context : CanvasRenderingContext2D, x : number, y : number, scale : number) : void {
    context.drawImage(this.image, x, y, this.image.width * scale, this.image.height * scale);
  }

  drawRotated(context : CanvasRenderingContext2D, x : number, y : number, angle : number, scale : number) : void { 
    const TO_RADIANS = Math.PI / 180;
    context.save(); 
    context.translate(x, y);
    context.scale(-scale, -scale);
    context.rotate((180-angle) * TO_RADIANS);
    context.drawImage(this.image, -(this.image.width/2), -(this.image.height/2));
    context.restore(); 
  }
}