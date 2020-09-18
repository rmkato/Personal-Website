import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../websocket.service';
import * as THREE from 'three';

@Component({
  selector: 'app-robotics',
  templateUrl: './robotics.component.html',
  styleUrls: ['./robotics.component.scss']
})
export class RoboticsComponent implements OnInit {
  input_text: string; 
  status: any;
  response: any;
  position: any;

  renderer = null;
  scene = null;
  camera = null;
  material = null;

  position_current = null;
  position_prev = null;

  constructor(private webSocketService: WebsocketService) {
    this.input_text = '';
    this.status = 'waiting for connection';
    this.response = '';
    this.position_current = 'no position yet';

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(200, 200);
    this.renderer.setClearColor( 0xffffff );
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(200, 1, 0.1, 2000);
    this.camera.position.set(0,0,500);
    this.camera.lookAt(0,0,0);
    this.material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  }

  ngOnInit(){
    //Initialize websocket
    this.webSocketService.listen("message").subscribe((data) => {
      this.status = data;
    })
    this.webSocketService.listen("response").subscribe((data) => {
      this.response = data;
    })
    this.webSocketService.listen("position").subscribe((data) => {
      this.position_prev = this.position_current;
      this.position_current = data;
      console.log('position: '+'('+this.position_current[0]+', '+this.position_current[1]+', '+this.position_current[2]+')');

      this.scene.remove(this.scene.getObjectByName('vector'));

      var points = [];
      points.push( new THREE.Vector3(this.position_current[0], this.position_current[1], this.position_current[2]))
      if (this.position_prev != null)
        points.push( new THREE.Vector3(this.position_prev[0],this.position_prev[1],this.position_prev[2]))
      var geometry = new THREE.BufferGeometry().setFromPoints( points );
  
      var line = new THREE.Line( geometry, this.material );
      line.name = "vector";
  
      this.scene.add( line );
      this.renderer.render( this.scene, this.camera );
    })
    this.webSocketService.establishDatastream();
    document.getElementById('renderContainer').appendChild(this.renderer.domElement);
  }

  sendMsg(){
    this.webSocketService.emit("message", this.input_text);
  }

  command(c: string){
    console.log("Sending command: " + c);
    this.webSocketService.emit('cmd', c);
  }

}
