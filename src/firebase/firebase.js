import Firebase from 'firebase';

class FBManager {
  constructor() {
    this.authenticated = false;
  }

  init() {
    const config = {
      apiKey: "AIzaSyC5BDPrqUgVJI9o34s57710i70cGu9zcaM",
      authDomain: "kalbasa-9e650.firebaseapp.com",
      databaseURL: "https://kalbasa-9e650.firebaseio.com",
      projectId: "kalbasa-9e650",
      storageBucket: "kalbasa-9e650.appspot.com",
      messagingSenderId: "117995123916"
    };

    this.firebase = Firebase.initializeApp(config);

    this.firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
    });
  }

  register() {

  }

  login = () => {
    this.firebase.auth().signInWithEmailAndPassword('yoni@500tech.com', '12345678').then((res) => {
      console.log('login...', res);

      this.add();
    }).catch((error) => {
    });
  }

  isAuthenticated = () => {
    console.log(this.authenticated);
    return this.authenticated;
  }

  logout() {

  }

  addItem() {

  }

  removeItem() {

  }
}

const instance = new FBManager();

export default instance;