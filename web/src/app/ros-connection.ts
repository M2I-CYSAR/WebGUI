import * as ROSLIB from 'roslib';


export class RosConnection {
  constructor() {
    this.ros = new ROSLIB.Ros({
      url : 'ws://10.26.198.197:9090'
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

