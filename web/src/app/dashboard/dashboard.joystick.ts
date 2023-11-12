import { CanvasImage } from "./dashboard.canvasimage";
import { Message } from 'roslib';

export class Joystick {
  joystickImg : CanvasImage = new CanvasImage("assets/Joystick.png");;
  context : CanvasRenderingContext2D | undefined;

  stick_left_x : number = 0;
  stick_left_y : number = 0;
  stick_right_x : number = 0;
  stick_right_y : number = 0;
  trigger_left : number = 0;
  trigger_right : number = 0;
  button_a : boolean = false;
  button_b : boolean = false;
  button_x : boolean = false;
  button_y : boolean = false;
  bumper_left : boolean = false;
  bumper_right : boolean = false;
  button_start : boolean = false;
  button_xbox : boolean = false;
  button_back : boolean = false;
  button_left_stick : boolean = false;
  button_right_stick : boolean = false;
  Dpad_up : boolean = false;
  Dpad_down : boolean = false;
  Dpad_left : boolean = false;
  Dpad_right : boolean = false;
  

  constructor() {}

  update() : void {
    if (this.context === undefined) { return; }

    this.context.clearRect(0, 0, 300, 300);

    this.joystickImg.draw(this.context, 0, 0, 0.26);
    
    this.drawCircle(58 + this.stick_left_x * -20, 110 + this.stick_left_y * -20, 9, this.button_left_stick ? "rgba(0,0,0,1)" : "rgba(0,0,0,0.5)");
    this.drawCircle(192 + this.stick_right_x * -20, 165 + this.stick_right_y * -20, 9, this.button_right_stick ?  "rgba(0,0,0,1)" : "rgba(0,0,0,0.5)");

    if (this.button_a) { this.drawCircle(238, 138, 13, "rgba(0,0,0,0.4)"); }
    if (this.button_b) { this.drawCircle(262, 110, 13, "rgba(0,0,0,0.4)"); }
    if (this.button_x) { this.drawCircle(215, 109, 13, "rgba(0,0,0,0.4)"); }
    if (this.button_y) { this.drawCircle(238,  85, 13, "rgba(0,0,0,0.4)"); }
    if (this.button_xbox) { this.drawCircle(148, 112, 18, "rgba(0,255,0,0.3)"); }
    if (this.button_start) { this.drawCircle(181, 112, 7, "rgba(0,0,0,0.5)"); }
    if (this.button_back) { this.drawCircle(114, 112, 7, "rgba(0,0,0,0.5)"); }
    this.drawRectangle(35, 18, 76 * this.trigger_left, 13, "rgba(0,0,0,0.5)");
    if (this.bumper_right) { this.drawRectangle(188, 37, 76, 13, "rgba(0,0,0,0.5)"); }
    this.drawRectangle(264 - 76 * this.trigger_right, 21, 76 * this.trigger_right, 13, "rgba(0,0,0,0.5)");
    if (this.bumper_left) { this.drawRectangle(35, 34, 76, 13, "rgba(0,0,0,0.5)"); }
    if (this.Dpad_up) { this.drawArrow(103, 165, 103, 143, "rgb(0,0,0)"); }
    if (this.Dpad_down) { this.drawArrow(103, 165, 103, 187, "rgb(0,0,0)"); }
    if (this.Dpad_right) { this.drawArrow(103, 165, 125, 165, "rgb(0,0,0)"); }
    if (this.Dpad_left) { this.drawArrow(103, 165, 81, 165, "rgb(0,0,0)"); }
  }

  drawCircle(centerX : number, centerY : number, radius : number, color : string) : void {
    if (this.context === undefined) { return; }

    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    this.context.fillStyle = color;
    this.context.fill();
  }

  drawRectangle(x : number, y : number, width : number, height : number, color : string) : void {
    if (this.context === undefined) { return; }

    this.context.beginPath();
    this.context.rect(x, y, width, height);
    this.context.fillStyle = color;
    this.context.fill();
  }

  drawArrow(fromX : number, fromY : number, toX : number, toY : number, color : string) : void {
    if (this.context === undefined) { return; }

    var magnitude = Math.sqrt(Math.pow(toY - fromY, 2) + Math.pow(toX - fromX, 2))
    var direction = Math.sign(toY - fromY);
    if (direction == 0) { direction = 1; }
    var angle = Math.acos((toX - fromX) / magnitude) * direction;
    const TO_RADIANS = Math.PI/180;
    const ANGLE_BACK = 30*TO_RADIANS;
    const PERCENT_BACK = 0.4;

    this.context.beginPath();
    this.context.moveTo(fromX, fromY);
    this.context.lineTo(toX, toY);
    this.context.lineTo(PERCENT_BACK * magnitude * Math.cos(angle + ANGLE_BACK + Math.PI) + toX, 
                        PERCENT_BACK * magnitude * Math.sin(angle + ANGLE_BACK + Math.PI) + toY);
    this.context.moveTo(toX, toY);
    this.context.lineTo(PERCENT_BACK * magnitude * Math.cos(angle - ANGLE_BACK + Math.PI) + toX, 
                        PERCENT_BACK * magnitude * Math.sin(angle - ANGLE_BACK + Math.PI) + toY);
    this.context.strokeStyle = color;
    this.context.lineWidth = 1;
    this.context.stroke()
  }

  set(msg : any) : void {
    this.stick_left_x = -msg.stick_left_x;
    this.stick_left_y = msg.stick_left_y;
    this.stick_right_x = -msg.stick_right_x;
    this.stick_right_y = msg.stick_right_y;
    this.trigger_left = msg.trigger_left;
    this.trigger_right = msg.trigger_right;
    this.button_a = msg.button_a;
    this.button_b = msg.button_b;
    this.button_x = msg.button_x;
    this.button_y = msg.button_y;
    this.bumper_left = msg.bumper_left;
    this.bumper_right = msg.bumper_right;
    this.button_back = msg.button_back;
    this.button_xbox = msg.button_xbox;
    this.button_start = msg.button_start;
    this.button_left_stick = msg.button_left_stick;
    this.button_right_stick = msg.button_right_stick;
    this.Dpad_up = msg.d_pad_up;
    this.Dpad_down = msg.d_pad_down;
    this.Dpad_left = msg.d_pad_left;
    this.Dpad_right = msg.d_pad_right;
  }
}