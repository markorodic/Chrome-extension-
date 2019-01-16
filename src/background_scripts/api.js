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
      xhr.setRequestHeader("Accept", "application/vnd.github.starfire-preview+json")
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
