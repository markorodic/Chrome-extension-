var config = {
  apiKey: "AIzaSyBZbSuKfgpEdnKBwEd0KynG6N3lBZ4mPxs",
  authDomain: "github-issue-extension.firebaseapp.com",
  databaseURL: "https://github-issue-extension.firebaseio.com",
  projectId: "github-issue-extension",
  storageBucket: "github-issue-extension.appspot.com",
  messagingSenderId: "765664737086"
};
firebase.initializeApp(config);

const provider = new firebase.auth.GithubAuthProvider();
// provider.addScope("repo");

let userData = {
  userToken: "",
  user: ""
};

firebase
  .auth()
  .signInWithPopup(provider)
  .then(function(result) {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const token = result.credential.accessToken;
    userData.userToken = token;
    // The signed-in user info.
    const user = result.user;
    userData.user = user;
    // ...
  })
  .catch(function(error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
  });
// console.log("firebase");
// chrome.identity.getAuthToken({ iteractive: true }, function(token) {
//   return token;
// });
