import { Component } from '@angular/core';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { StatusBar } from '@awesome-cordova-plugins/status-bar/ngx';
import { SplashScreen } from '@awesome-cordova-plugins/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  /*
  ionic cordova platform add android@11
  https://www.freakyjolly.com/ionic-admob-free-native-tutorial/
  https://stackoverflow.com/questions/73385204/cordova-11-splash-screen-what-goes-in-splashscreen-xml
  */

  constructor(
    private screenOrientation: ScreenOrientation,
    private splashScreen: SplashScreen,
    private platform: Platform,
    private statusbar: StatusBar,
  ) {
    this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
  }
  ngOnInit(){
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusbar.backgroundColorByHexString("#f2f2f2");
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }
}
