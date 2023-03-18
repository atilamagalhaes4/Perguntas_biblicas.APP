import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class SqliteStorage {

    
  constructor(
    private storage: Storage
  ) { }

  
setValue(key: string, value: any) {
    this.storage.set(key, value).then((res) => {
        console.log("Set value ",JSON.stringify(res));
    }).catch((error) => {
        console.log(JSON.stringify(error));
    });
  }

  getKeyValue(key: string){
    this.storage.get(key).then((res) => {
        console.log("Get value ",res)
        return {questoesRealizadas: res.questoesRealizadas,questoesAcertadas: res.questoesAcertadas};
    }).catch((err) => {
      console.log(JSON.stringify(err));
    });
  }
  
  // Remove valores pela chave
  deleteKey(key: string) {
    this.storage.remove(key).then(() => {
      alert('Deleted ' + key);
    }).catch((err) => {
      alert(err);
    });
  }

  // pegar todas as chaves
  allStoredKeys() {
    this.storage.keys().then((res) => {
        console.log(res);
    });
  }
}