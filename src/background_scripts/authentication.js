'use strict';

let userData = {
  token: '',
  displayName: '',
  username: '',
  loggedIn: false,
};

// eslint-disable-next-line
function getGithubUserData() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['ghToken'], function(result) {
      // eslint-disable-next-line
      if (!result) {
        // Case: no gh-token found in storage, prompt firebase for auth
        promptFirebaseAuth()
          .then(userData => {
            resolve(userData);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        userData = result.ghToken;

        resolve(userData);
      }
    });
  });
}

/**
 *  prompts Firebase Authentication to get Github authentication credentials
 *  also saves the github token in chrome.storage
 *  @returns {Promise}
 */

function promptFirebaseAuth() {
  return new Promise((resolve, reject) => {
    // console.log('invoking authentication with Firebase!!');
    /**
     * Initializes our firebase app
     * NOTE: perhaps we should only do this if we need to authenticate? maybe not
     */
    var config = {
      apiKey: 'AIzaSyBZbSuKfgpEdnKBwEd0KynG6N3lBZ4mPxs',
      authDomain: 'github-issue-extension.firebaseapp.com',
      databaseURL: 'https://github-issue-extension.firebaseio.com',
      projectId: 'github-issue-extension',
      storageBucket: 'github-issue-extension.appspot.com',
      messagingSenderId: '765664737086',
    };
    firebase.initializeApp(config);

    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('public_repo');

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        // TODO: other things on result that are interesting:
        // expirationTime
        // refreshToken
        userData.token = result.credential.accessToken;
        userData.displayName = result.user.displayName;
        userData.username = result.additionalUserInfo.username;
        userData.loggedIn = true;

        // console.log(result);
        // console.log('-------------------')

        chrome.storage.sync.set({ ghToken: userData }, function() {
          resolve(userData);
        });
      })
      .catch(function(error) {
        console.error('FAILED LOGIN WITH GITHUB');
        reject({
          errorCode: error.code,
          errorMessage: error.message,
          email: error.email, // The email of the user's account used.
          credential: error.credential, // The firebase.auth.AuthCredential type that was used.
        });
      });
  });
}
