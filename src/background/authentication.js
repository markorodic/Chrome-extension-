/**
 *  prompts Firebase Authentication to get Github authentication credentials
 *  also saves the github token in chrome.storage
 *  @returns {Promise}
 */

export function promptFirebaseAuth() {
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

    // TODO: should only get initialized once!!!
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    const provider = new firebase.auth.GithubAuthProvider();
    provider.addScope('public_repo').addScope('repo');

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        // TODO: other things on result that are interesting:
        // expirationTime
        // refreshToken
        const userData = {};
        userData.token = result.credential.accessToken;
        userData.displayName = result.user.displayName;
        userData.username = result.additionalUserInfo.username;
        userData.loggedIn = true;

        resolve(userData);
        // TODO: remove couple where saving inside
        // chrome.storage.sync.set({ ghToken: userData }, function() {
        //   resolve(userData);
        // });
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
