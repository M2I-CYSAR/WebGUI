import { Component, Renderer2, NgZone, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Flippers } from './dashboard.flippers';
import { CanvasImage } from './dashboard.canvasimage';
import { Joystick } from './dashboard.joystick';
import { Arm } from './dashboard.arm';
import { RosConnection } from '../ros-connection';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  constructor(private ngZone: NgZone) {}

  @ViewChild('flipperCanvas') flipperCanvas: ElementRef | undefined;
  flipperCTX: CanvasRenderingContext2D | undefined;
  @ViewChild('joystickCanvas') joystickCanvas: ElementRef | undefined;
  joystickCTX: CanvasRenderingContext2D | undefined;
  @ViewChild('armCanvas') armCanvas: ElementRef | undefined;
  armCTX: CanvasRenderingContext2D | undefined;
  
  flippers = new Flippers();
  joystick = new Joystick();
  arm = new Arm();
  ros = new RosConnection();

  streams = [
    "http://[2610:130:110:1525:47e7:9414:7e67:15e4]:5000/?action=stream",
    "http://[2610:130:110:1525:47e7:9414:7e67:15e4]:5001/?action=stream",
    "http://[2610:130:110:1525:47e7:9414:7e67:15e4]:5002/?action=stream"
  ];

  ngAfterViewInit() {
    this.flipperCTX = this.flipperCanvas!.nativeElement.getContext('2d');
    this.joystickCTX = this.joystickCanvas!.nativeElement.getContext('2d');
    this.armCTX = this.armCanvas!.nativeElement.getContext('2d');

    this.joystick.context = this.joystickCTX;
    this.flippers.context = this.flipperCTX;
    this.arm.context = this.armCTX;

    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.update();
      }, 100);
    });
    
    this.ros.subscribe("/flipper_position", "cysar/msg/FlipperPosition", (msg : any) => { this.flippers.set(msg); });
    this.ros.subscribe("/joystick", "cysar/msg/Joystick", (msg : any) => { this.joystick.set(msg) });
    this.ros.subscribe("/arm_position", "cysar/msg/ArmPosition", (msg : any) => { this.arm.set(msg) });

    this.update();
  }

  update(): void {
    this.flippers.update();
    this.joystick.update();
    this.arm.update();
  }

  errorStream(streamID : number): void {
    this.streams[streamID] = "assets/NoSignal.png"
  }
}
