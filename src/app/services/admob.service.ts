import { Injectable } from '@angular/core';
//IMPORT PLATFORM SO WE CAN START ADMOB AS SOON AS IT'S READY.
import { Platform } from '@ionic/angular';
//IMPORT WHAT WE NEED FROM ADMOBFREE PLUGIN.
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';
@Injectable({
  providedIn: 'root'
})
export class AdmobService {
  //BANNER CONFIG
  bannerConfig: AdMobFreeBannerConfig = {
    isTesting: false,
    autoShow: true,
    id: "ca-app-pub-2761093371755167/6790980652"//id: "ID GENERATED AT ADMOB ca-app-pub FOR PROD"
    
  };
  //INTERSTITIAL CONFIG
  interstitialConfig: AdMobFreeInterstitialConfig = {
    isTesting: false,
    autoShow: false,    
    id: "ca-app-pub-2761093371755167/6790980652"//id: "ID GENERATED AT ADMOB ca-app-pub FOR PROD"
  };
  //REWARD VIDEO CONFIG.
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    isTesting: false,
    autoShow: false,
    id: "ca-app-pub-2761093371755167/6790980652"//id: "ID GENERATED AT ADMOB ca-app-pub FOR PROD"
  };
  
  constructor(
    public platform: Platform,
    private admobFree: AdMobFree
  ) {
    //CARREGAR ANÚNCIOS NA PLATAFORMA PRONTA PROMESSA.
    platform.ready().then(() => {
      //Banner
      this.admobFree.banner.config(this.bannerConfig);

      //Anuncio de rodapé
      this.admobFree.interstitial.config(this.interstitialConfig);
      this.admobFree.interstitial.prepare().then(() => {
        console.log('Anuncio de rodapé carregado.')
      }).catch(e =>
        console.log('Falha ao carregar anuncio de rodapé: ', e));

      //Video recompensa
      this.admobFree.rewardVideo.config(this.RewardVideoConfig);
      this.admobFree.rewardVideo.prepare().then(() => {
        console.log('Video de recompensa carregado.')
      }).catch(e =>
        console.log('Falha ao carregar anuncio de recompensa: ', e));
    });
  }


  ShowBanner() {
    //Checar e mostrar Banner
    this.admobFree.banner.prepare().then(() => {
      console.log('Banner carregado e exibindo')
    }).catch(e =>
      console.log('Não foi possivel abrir banner: ', e)
    );
  }


  ShowInterstitial() {
    //Checar e carregar anuncio de rodapé
    this.admobFree.interstitial.isReady().then(() => {
      //Pronto para exibir
      this.admobFree.interstitial.show().then(() => {
        console.log('Anuncio de rodapé esta sendo exibido')
      })
        .catch(e => console.log('Não foi possível mostrar anúncio: ', e));
    })
      .catch(e => console.log('Não foi possível carregar anúncio: ', e));
  }


  ShowRewardVideo() {
    //Carregar anuncio de recompensa.
    this.admobFree.rewardVideo.isReady().then(() => {
      //Exibe anuncio de recompensa
      this.admobFree.rewardVideo.show().then(() => {
        console.log('Anuncio exibindo.')
      })
        .catch(e => console.log('Problema ao exibir video: ', e));
    })
      .catch(e => console.log('Problema ao carregar video: ', e));
  }
}