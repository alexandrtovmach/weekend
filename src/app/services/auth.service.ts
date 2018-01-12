import { WindowRef } from '@agm/core/utils/browser-globals';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
@Injectable()
export class AuthService {

  constructor() { }
  get WindowRef(){
    return window;
  }
  signinUserByPhoneNumber(contact: string, captchaResolved: any) {
    // const previusUser =  firebase.auth().currentUser;
    // console.log(previusUser);
    // return firebase.auth().currentUser.linkWithPhoneNumber(contact, captchaResolved);
    return firebase.auth().signInWithPhoneNumber(contact, captchaResolved);
    }
}
