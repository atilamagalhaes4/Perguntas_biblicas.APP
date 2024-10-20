import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import perguntas from '../../../assets/json/perguntas.json';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { base64Imagem } from 'src/assets/base64/base64';
import { Storage } from '@ionic/storage';
/*import { AdmobService } from 'src/app/services/admob.service';*/

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  tempoAnuncio: number = 0;
  questoesQueJaSairam: any = [];

  /* opcao: pular questao errada acertar mostrar: vezes sem errar qtd acerto qtd de tentativas */
  comecou: boolean = false;
  TodasPerguntas: any = [];

  //Dados array
  id: number = 0;
  pergunta: string = "";
  a: string = "";
  b: string = "";
  c: string = "";
  resposta: string = "";
  versiculo: string = "";
  dificuldade: string = "";

  respostaUsuario: string = "";
  botaoConfirmar: boolean = false;
  mostrar: boolean = false;


  questoesRealizadas: number = 0;
  questoesAcertadas: number = 0;

  constructor(
    private toastController: ToastController,
    private socialSharing: SocialSharing,
    private imagens: base64Imagem,
    private alertController: AlertController,
/*    private admobService: AdmobService,*/
    private storage: Storage
  ) { }

  ngOnInit() {
    //Carregando todas as 290 perguntas
    this.TodasPerguntas = perguntas;
    //Funcao par ou impar pra ver se mostra o pedido de compartilhamento
    var _i = parseInt((Math.random() * (290 - 1) + 1 + "")); if (_i % 2 == 0) this.mostrar = true; else this.mostrar = false;
    this.getKeyValue("dados");
  }

  setValue(key: string, value: any) {
    this.storage.set(key, value).then((res) => {
      console.log("Set value :", JSON.stringify(res));
    }).catch((error) => {
      console.log(JSON.stringify(error));
    });
  }

  getKeyValue(key: string) {
    this.storage.get(key).then((res) => {
      console.log("Get value :", res);
      this.questoesRealizadas = res.questoesRealizadas;
      this.questoesAcertadas = res.questoesAcertadas;
      this.setValue("dados", { questoesRealizadas: res.questoesRealizadas, questoesAcertadas: res.questoesAcertadas });
    }).catch((err) => {
      console.log(JSON.stringify(err));
    });
  }


  vaiComecar() {
    this.comecou = true;
    this.gerarpergunta();
  }

  voltarMenu() {
    this.comecou = false;
  }


  toggle() {
    this.mostrar = !this.mostrar;
  }


  responderPergunta() {
    if (this.respostaUsuario == "") {
      this.presentToast("Confirme alguma opção listada acima.", "light", 'success');
    }
    //Se acertar
    else if (this.respostaUsuario == this.resposta) {
      this.tempoAnuncio++;
      this.questoesRealizadas++;
      this.questoesAcertadas++;
      this.setValue("dados", { questoesRealizadas: this.questoesRealizadas, questoesAcertadas: this.questoesAcertadas });
      this.botaoConfirmar = true;
      this.presentToast(this.versiculo, "success", 'bottom');
      this.gerarpergunta();
      this.respostaUsuario = "";
    }
    // se errar
    else {
      this.tempoAnuncio++;
      this.questoesRealizadas++;
      //      this.questoesAcertadas++; | Se n acertar nao tem o pq aumentar
      this.setValue("dados", { questoesRealizadas: this.questoesRealizadas, questoesAcertadas: this.questoesAcertadas });
      this.botaoConfirmar = true;
      this.presentToast(this.versiculo, "danger", 'bottom');
      this.respostaUsuario = "";
      this.gerarpergunta();
    }

    if (this.tempoAnuncio == 15) {
      console.log("deveria mostrar o anuncio.")
//      this.Interstitial();
      this.tempoAnuncio = 0;
    }
  }


  async presentToast(mensagem: string, cor: string, posicao: any) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: this.versiculo.length * 100,
      cssClass: 'custom-toast',
      color: cor,
      position: posicao,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    await toast.present();
    const { role } = await toast.onDidDismiss();
    this.botaoConfirmar = false;
  }



  gerarpergunta() {
    // Verifica se todas as perguntas já foram usadas
    if (this.questoesQueJaSairam.length >= this.TodasPerguntas.length) {
      // Limpa a lista de perguntas que já saíram
      this.questoesQueJaSairam = [];
    }

    // Variável para armazenar o índice da pergunta
    let _i: number;

    // Gere um novo índice enquanto o índice atual já estiver na lista de perguntas que já saíram
    do {
      _i = Math.floor(Math.random() * this.TodasPerguntas.length);
    } while (this.questoesQueJaSairam.includes(_i));

    // Adicione o índice à lista de perguntas que já saíram
    this.questoesQueJaSairam.push(_i);

    // Use o índice para pegar a pergunta
    this.id = this.TodasPerguntas[_i].id;
    this.pergunta = this.TodasPerguntas[_i].pergunta.replace(/'/g, '"');
    this.a = this.TodasPerguntas[_i].a.replace(/'/g, '"');
    this.b = this.TodasPerguntas[_i].b.replace(/'/g, '"');
    this.c = this.TodasPerguntas[_i].c.replace(/'/g, '"');
    this.resposta = this.TodasPerguntas[_i].resposta;
    this.versiculo = this.TodasPerguntas[_i].versiculo.replace(/'/g, '"');
    this.dificuldade = this.TodasPerguntas[_i].dificil;
  }




  compartilhar() {
    this.mostrar = false;
    this.socialSharing.share("Conhece nosso aplicativo de perguntas bíblicas ?", "Conheça nosso app.",
      this.imagens.logo,
      'https://play.google.com/store/apps/details?id=com.atilamagalhaes4').then((data) => {
        //      this.presentToast(data, "success", 'bottom');
      }).catch((error: string) => {
        //      this.presentToast(error,"danger", 'bottom');
      });
  }


  async paraDebug(mensagem: string, cor: string, posicao: any) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 10000,
      cssClass: 'custom-toast',
      color: cor,
      position: posicao,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
          handler: () => {

          }
        }
      ]
    });
    await toast.present();
    const { role } = await toast.onDidDismiss();
    this.botaoConfirmar = false;
  }


  async presentAlert(mensagem: string) {
    const alert = await this.alertController.create({
      message: mensagem,
      buttons: ['OK'],
    });

    await alert.present();
  }




/*
  //////////////////ADMOB//////////////////////////

  // FUNÇÃO PARA INTERSTICIAL
  Interstitial() {
    this.admobService.ShowInterstitial();
  }
  // FUNÇÃO PARA VIDEOREWARD
  Reward() {
    this.admobService.ShowRewardVideo();
  }
  banner() {
    this.admobService.ShowBanner();
  }*/
}
