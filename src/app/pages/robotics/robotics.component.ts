import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../websocket.service';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'; 

@Component({
  selector: 'app-robotics',
  templateUrl: './robotics.component.html',
  styleUrls: ['./robotics.component.scss']
})
export class RoboticsComponent implements OnInit {
  status: any;
  response: any;
  position_current: any;
  position_prev: any;
  index: number;

  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  material: THREE.LineBasicMaterial;
  controls: OrbitControls;

  constructor(private webSocketService: WebsocketService) {
    var that = this;
    this.status = 'waiting for connection';
    this.response = '';
    this.position_current = null;
    this.position_prev = [0,0,0];
    this.index = 1;

    this.scene = new THREE.Scene();
    this.scene.add(new THREE.AxesHelper(200));
    this.scene.add(new THREE.AxesHelper(-200));

    this.camera = new THREE.PerspectiveCamera(50, 1, 1, 1000);
    this.camera.position.set(200,200,200);
    this.camera.lookAt(0,0,0);

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setSize(200, 200);
    this.renderer.setClearColor( 0xe3e3e3 );

    this.material = new THREE.LineBasicMaterial({color: 0x0000ff});
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(1,0,0);
    this.controls.minDistance = 0;
    this.controls.maxPolarAngle = Math.PI/2;

    function animate(){
      requestAnimationFrame( animate );
      that.controls.update()
			that.renderer.render( that.scene, that.camera );
    }
    animate();
  }

  ngOnInit(){
    document.getElementById('renderContainer').appendChild(this.renderer.domElement);
    this.renderer.render(this.scene, this.camera);

    //Initialize websocket
    this.webSocketService.listen("message").subscribe((data) => {
      this.status = data;
    })
    this.webSocketService.listen("response").subscribe((data) => {
      this.response = data;
    })
    this.webSocketService.listen("position").subscribe((data) => {
      this.addNewLineToScene(data);
    })
    this.webSocketService.establishDatastream();
  }

  addNewLineToScene(data) {
    this.position_prev = this.position_current;
    this.position_current = data;
    this.scene.getObjectByName('vector'+(this.index-1).toString());

    var points = [
      new THREE.Vector3(this.position_current[0], this.position_current[1], this.position_current[2]), 
      new THREE.Vector3(this.position_prev[0],this.position_prev[1],this.position_prev[2])
    ];
    
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var line = new THREE.Line(geometry, this.material);
    line.name = "vector"+this.index.toString();
    this.index++;

    this.scene.add(line);
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
  }

  command(c: string){
    console.log("Sending command: " + c);
    this.webSocketService.emit('cmd', c);
  }

}