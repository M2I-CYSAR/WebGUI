import { Component } from '@angular/core';
import { RosConnection } from '../ros-connection';

@Component({
  selector: 'app-debug',
  templateUrl: './debug.component.html',
  styleUrls: ['./debug.component.css']
})
export class DebugComponent {
  ros = new RosConnection();

  joystick : string = "{}";
  flippers : string = "{}";
  drivetrain : string = "{}";
  arm : string = "{}";

  constructor() {
    this.ros.subscribe("/joystick", "cysar/msg/Joystick", (msg : any) => { 
      this.joystick = JSON.stringify(msg, null, 2);
    });

    this.ros.subscribe("/flipper_position", "cysar/msg/FlipperPosition", (msg : any) => { 
      this.flippers = JSON.stringify(msg, null, 2);
    });

    this.ros.subscribe("/drive_train", "cysar/msg/DriveTrain", (msg : any) => { 
      this.drivetrain = JSON.stringify(msg, null, 2);
    });

    this.ros.subscribe("/arm_position", "cysar/msg/ArmPosition", (msg : any) => { 
      this.arm = JSON.stringify(msg, null, 2);
    });
  }
}
