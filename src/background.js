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
    
    // makeGithubRequest(token).then(data => {
    //   console.log(data);
    // });
  
    makeIssueRequest(token).then(data => {
      console.log(data)
    })
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
  const baseUrl = `https://api.github.com/graphql?access_token=${token}`

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
    }` 
  }

  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", baseUrl, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        resolve(resp);
      }
    }
    xhr.send(JSON.stringify(query));
  })
}


function makeIssueRequest(token, repo) {
  const baseUrl = `https://api.github.com/graphql?access_token=${token}`

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
    }`
  }

  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", baseUrl, true);
    // xhr.setRequestHeader("Accept", "application/vnd.github.starfire-preview+json")
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        resolve(resp);
      }
    }
    xhr.send(JSON.stringify(mutation));
  })
}

