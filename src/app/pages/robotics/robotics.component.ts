import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../websocket.service';
import * as THREE from 'three';

@Component({
  selector: 'app-robotics',
  templateUrl: './robotics.component.html',
  styleUrls: ['./robotics.component.scss']
})
export class RoboticsComponent implements OnInit {
  status: any;
  response: any;
  position: any;

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  material: THREE.LineBasicMaterial;

  position_current: any;
  position_prev: any;

  constructor(private webSocketService: WebsocketService) {
    this.status = 'waiting for connection';
    this.response = '';
    this.position_current = 'no position yet';

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(200, 200);
    this.renderer.setClearColor( 0xffffff );
    this.scene = new THREE.Scene();
    var axesHelper = new THREE.AxesHelper(199);
    this.scene.add(axesHelper);

    this.camera = new THREE.PerspectiveCamera(50, 1, 1, 1000)
    this.camera.position.set(200,200,200);
    this.camera.lookAt(0,0,0);
    this.material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

    this.position_current = null;
    this.position_prev = null;
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

      this.scene.remove(this.scene.getObjectByName('vector'));

      var points = [];
      points.push( new THREE.Vector3(this.position_current[0], this.position_current[1], this.position_current[2]))
      if (this.position_prev != null)
        points.push( new THREE.Vector3(this.position_prev[0],this.position_prev[1],this.position_prev[2]))
      console.log(points);
      var geometry = new THREE.BufferGeometry().setFromPoints( points );
  
      var line = new THREE.Line( geometry, this.material );
      line.name = "vector";
  
      this.scene.add( line );
      this.renderer.render( this.scene, this.camera );
    })
    this.webSocketService.establishDatastream();
    document.getElementById('renderContainer').appendChild(this.renderer.domElement);
  }

  command(c: string){
    console.log("Sending command: " + c);
    this.webSocketService.emit('cmd', c);
  }

}