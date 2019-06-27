import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PerfilModalPage } from '../perfil-modal/perfil-modal.page';
import { Storage } from '@ionic/storage';
import { ToastController, AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  perfis = [];
  perfil_KEY = "perfil";
  constructor(public modalController: ModalController, private storage: Storage, public alertController: AlertController,
    public toastController: ToastController, private http: HttpClient, public loadingController: LoadingController) {
    this.storage.get(this.perfil_KEY).then((perfil) => {
      if (perfil) {
        this.perfis = perfil
      }
      });
    }

  likes(perfis) {
        perfis.likes = perfis.likes + 1;
        this.salvar();
      }

  salvar() {
        this.storage.set(this.perfil_KEY, this.perfis);
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
                // Atualizar formulário
                this.perfis = perfil

                // Remover o item selecionado da lista
                var i = this.perfis.indexOf(perfil);
                this.perfis.splice(i, 1);

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
