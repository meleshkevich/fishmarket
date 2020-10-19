import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB6yO4O3WM3lhx9cdKLQKjNx1rhDp4keRM",
    authDomain: "fishmarket-im.firebaseapp.com",
    databaseURL: "https://fishmarket-im.firebaseio.com",
    projectId: "fishmarket-im"   
  });

  const base = Rebase.createClass(firebaseApp.database());

  //named export
  export {firebaseApp};

  // default export
  export default base;
  