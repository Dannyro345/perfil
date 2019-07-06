import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilModalPage } from '../perfil-modal/perfil-modal.page';
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import {PerfilService} from '../services/perfil.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  perfis: any;

  constructor(public modalController: ModalController, public alertController: AlertController,
    public toastController: ToastController, private http: HttpClient,
    public loadingController: LoadingController, private perfilService : PerfilService ) {
    this.perfis = [];

    // Loading
    this.loadingController.create({
      message: 'Carregando',
    }).then((loader) => {
      loader.present();
      this.perfilService.list().subscribe(
        (data) => {
          this.perfis = data;
          loader.dismiss();
        }
      )
    });
  }

  add(perfil) {
    this.loadingController.create({
      message: 'Carregando'
    }).then((loader) => {
      loader.present();
      this.perfilService.add(perfil).subscribe(
        (data) => {
          this.perfis.push(data);
          loader.dismiss();
        }
      )
    });
  }

  likes(perfil) {
    this.loadingController.create({
      message: 'Carregando'
    }).then((loader) => {
      loader.present();
      perfil.likes = perfil.likes + 1;
      this.perfilService.edit(perfil).subscribe(
        (data) => {
          loader.dismiss();
        }
      )
    });
  }

  async remove(perfil) {
    const alert = await this.alertController.create({
      header: 'Confirmação!',
      message: 'Perfil removido com sucesso!!!',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: async () => {
            // Remover o item selecionado da lista
            this.loadingController.create({
              message: 'Carregando'
            }).then((loader) => {
              loader.present();
              this.perfilService.remove(perfil).subscribe(
                (data) => {
                  console.log(data);
                  var i = this.perfis.indexOf(perfil);
                  this.perfis.splice(i, 1);
                  loader.dismiss();
                }
              )
            });

            // #3 - Criando um Toast
            const toast = await this.toastController.create({
              message: 'Perfil removido com sucesso!',
              duration: 3000,
              position: 'top',
              color: 'dark'
            });

            // #4 Exibir a mensagem na tela
            toast.present();
          }
        }
      ]
    });

    await alert.present();



  }

  async modal() {
    const modal = await this.modalController.create({
      component: PerfilModalPage
    });

    modal.onDidDismiss().then((retorno) => {
      this.perfis.push(retorno.data);
    }
    );
    await modal.present();
  }
}
