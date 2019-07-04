import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';


// Importando a camera
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-perfil-modal',
  templateUrl: './perfil-modal.page.html',
  styleUrls: ['./perfil-modal.page.scss'],
})
export class PerfilModalPage implements OnInit {
  perfil;
  constructor(public modalController: ModalController, private camera: Camera) { 
    this.perfil = {
      'avatar':'',
      'nome':'',
      'idade':'',
      'likes':0
    }
  }

  ngOnInit() {
  }

  add() {
    this.modalController.dismiss(this.perfil)
  }

  take_picture() {
    const options: CameraOptions = {
      quality: 10,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     this.perfil.avatar = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      alert(err);
     // Handle error
    });
  }
}
