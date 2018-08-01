import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor() {
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyBm7BTuCy2_EdGb375h8L01sbet2AuQteY',
      authDomain: 'ng-recipe-book-13445.firebaseapp.com'
    });
  }
}
