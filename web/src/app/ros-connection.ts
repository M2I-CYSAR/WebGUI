import * as ROSLIB from 'roslib';


export class RosConnection {
  constructor() {
    this.ros = new ROSLIB.Ros({
      url : 'ws://[2610:130:110:1525:47e7:9414:7e67:15e4]:9090'
    });
    
    this.ros.on('connection', function() {
    console.log('ROS: Connected to websocket server.');
    });

    this.ros.on('error', function(error : any) {
    console.log('ROS: Error connecting to websocket server: ', error);
    });

    this.ros.on('close', function() {
    console.log('ROS: Connection to websocket server closed.');
    });
  }

  subscribe(topic : string, type : string, callback: (message: ROSLIB.Message) => void) {
    var listener = new ROSLIB.Topic({
      ros : this.ros,
      name : topic,
      messageType : type
    });

    listener.subscribe(callback);
  }

  ros : ROSLIB.Ros;
}

