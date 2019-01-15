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
    console.log('successful log in')
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const token = result.credential.accessToken;
    userData.userToken = token;
    // The signed-in user info.
    const user = result.user;
    userData.user = user;
    // 
    makeGithubRequest(token).then(data => {
      console.log(data);
    });
  
  })
  .catch(function(error) {
    console.log('Error', error)

    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    // ...
  });

function makeGithubRequest(token) {
  const apiEndPoint = `user/repos`
  const baseUrl = `https://api.github.com/${apiEndPoint}?access_token=${token}`;
  
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseUrl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        resolve(resp);
      }
    }
    xhr.send();
  })
}

