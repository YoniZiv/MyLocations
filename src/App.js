import React, { Component } from 'react';
import './App.css';
import { Footer } from "./Components/Footer/footer";
import { Main } from "./Components/Main/main";
import { AppNav } from "./Components/AppNav/app-nav";
import FBManager from './firebase/firebase';

class App extends Component {

  constructor() {
    super();

    this.state = {};

    FBManager.init();

    //this.auth();
  }

  // auth() {
  //   const config = {
  //     apiKey: "AIzaSyC5BDPrqUgVJI9o34s57710i70cGu9zcaM",
  //     authDomain: "kalbasa-9e650.firebaseapp.com",
  //     databaseURL: "https://kalbasa-9e650.firebaseio.com",
  //     projectId: "kalbasa-9e650",
  //     storageBucket: "kalbasa-9e650.appspot.com",
  //     messagingSenderId: "117995123916"
  //   };
  //
  //   this.firebase = Firebase.initializeApp(config);
  //
  //   this.login();
  //
  //   //this.add();
  // }
  //
  // login() {
  //   this.firebase.auth().signInWithEmailAndPassword('yoni@500tech.com', '12345678').then((res) => {
  //     console.log(res);
  //
  //     this.add();
  //   }).catch((error) => {});
  // }
  //
  // add() {
  //   const database = this.firebase.database();
  //
  //   database.ref('data2').set({
  //     foo: 'bar4'
  //   });
  // }

  render() {
    return (
        <div className="App">
          <AppNav />
          <Main />
          <Footer />
        </div>
    );
  }
}

export
default
App;
//<Header title="Hello" subTitle="World"/>
