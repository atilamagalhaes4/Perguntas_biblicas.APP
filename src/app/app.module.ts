import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PostProvider } from 'src/assets/providers/post-provider';
import { HttpClientModule } from '@angular/common/http';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { base64Imagem } from 'src/assets/base64/base64';
import { IonicStorageModule } from '@ionic/storage'
import { SqliteStorage } from 'src/assets/providers/sqlite-storage';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';
import { AdmobService } from './services/admob.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy 
    },
    PostProvider,
    SocialSharing,
    base64Imagem,
    SqliteStorage,
    ScreenOrientation,
    SplashScreen,
    StatusBar,
    AdMobFree,
    AdmobService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
