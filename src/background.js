'use strict';

/** Gets Github Authentication token
 *
 */
// chrome.storage.sync.set({ key: myToken }, function() {
//   console.log('Value is set to ' + myToken);
// });
getGithubUserData().then(userData => {
  console.log('GOT USER DATE', userData);
});
// .catch(err => {
//   console.log(err);
// }); // === userData;

function getGithubUserData() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['ghToken'], function(result) {
      // || (!result.ghToken.token && !result.ghToken.user)
      // eslint-disable-next-line
      if (!!result) {
        // Case: no gh-token found in storage, prompt firebase for auth
        promptFirebaseAuth()
          .then(userData => {
            resolve(userData);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        resolve(result['ghToken']);
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
    console.log('invoking authentication with Firebase!!');
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

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function(result) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.
        // TODO: other things on result that are interesting:
        // expirationTime
        // refreshToken
        const userData = {
          token: result.credential.accessToken,
          displayName: result.user.displayName,
        };

        console.log(userData);

        chrome.storage.sync.set({ ghToken: userData }, function() {
          console.log('saved userData:', JSON.stringify(userData));
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

function makeGithubRequest(token) {
  const baseUrl = `https://api.github.com/graphql?access_token=${token}`;

  let query = {
    query: `{
      viewer {
        name
         repositories(last: 4) {
           nodes {
             name
           }
         }
       }
    }`,
  };

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseUrl, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        resolve(resp);
      }
    };
    xhr.send(JSON.stringify(query));
  });
}

function makeIssueRequest(token, repo) {
  const baseUrl = `https://api.github.com/graphql?access_token=${token}`;

  // let mutation = {
  //   mutation: `{
  //     Mutation.createIssue(input: {
  //       assigneeIds: "MDQ6VXNlcjczNjQ4MDA=",
  //       labelIds: "MDU6TGFiZWwzMTgxMjg3NzA=",
  //       projectIds: "MDc6UHJvamVjdDIwNzU3MDc=",
  //       repositoryId: "MDEwOlJlcG9zaXRvcnk1MDYwNDk5Nw==",
  //       title: "YOOO graphQL is boss"
  //     }) {
  //       clientMutationId,
  //       issue
  //      }
  //   }`
  // }

  let mutation = {
    mutation: `{
      addReaction(input:{subjectId:"MDU6SXNzdWUyMzEzOTE1NTE=",content:HOORAY}) {
        reaction {
          content
        }
        subject {
          id
        }
      }
    }`,
  };

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', baseUrl, true);
    // xhr.setRequestHeader("Accept", "application/vnd.github.starfire-preview+json")
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        resolve(resp);
      }
    };
    xhr.send(JSON.stringify(mutation));
  });
}
