import * as firebase from 'firebase';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {
  token: string;

  constructor(private router: Router) {
  }

  signUpUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }

  signInUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/']);
        this.getToken();
      })
      .catch(error => console.log(error));
  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then((token) => {
        this.token = token;
      });
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }

  logout() {
    firebase.auth().signOut();
    this.token = null;
  }
}
