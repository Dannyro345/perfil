import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilModalPage } from '../perfil-modal/perfil-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  perfis = [];

  constructor(public modalController: ModalController) {
  }

  likes(perfis) {
    perfis.likes = perfis.likes + 1;
  }

  async modal() {
    const modal = await this.modalController.create({
      component: PerfilModalPage
    });

    modal.onDidDismiss().then((retorno) => {
      this.perfis.push(retorno);
    }
    )
    await modal.present();
  }
}
