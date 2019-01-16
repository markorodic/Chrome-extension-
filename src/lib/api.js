const baseUrl = `https://api.github.com/graphql?access_token=`;

// creates an Issue in thechutrain/js-playground repo
// source: https://github.com/thechutrain/js-playground/issues
export const exQuery1 = `mutation {
  createIssue(input: {
    assigneeIds: "MDQ6VXNlcjczNjQ4MDA=",
    labelIds: "MDU6TGFiZWwzMTgxMjg3NzA=",
    projectIds: "MDc6UHJvamVjdDIwNzU3MDc=",
    repositoryId: "MDEwOlJlcG9zaXRvcnk1MDYwNDk5Nw==",
    title: "Marko is too kind"
  }) {
    clientMutationId
  }
}`;

export const exQuery2 = `{
  viewer {
    name
     repositories(last: 4) {
       nodes {
         name
       }
     }
   }
}`;

export function makeQuery(token, mutation, opts = {}) {
  const ghUrl = `${baseUrl}${token}`;
  const fetchOptions = {
    method: opts.method ? opts.method : 'POST',
    body: JSON.stringify({ query: mutation }),
  };

  /** Note: some github graphql queries require additional header param
   *  since they are still in development
   *  source: https://developer.github.com/v4/previews/#issues-preview
   */
  if (opts.preview) {
    fetchOptions.headers = {
      Accept: 'application/vnd.github.starfire-preview+json',
    };
  }

  return fetch(ghUrl, fetchOptions).then(response => {
    return response.json();
  });
}

// function makeIssueFetch(token) {
//   const baseUrl = `https://api.github.com/graphql?access_token=${token}`;
//   var mutation = `mutation {
//     createIssue(input: {
//       assigneeIds: "MDQ6VXNlcjczNjQ4MDA=",
//       labelIds: "MDU6TGFiZWwzMTgxMjg3NzA=",
//       projectIds: "MDc6UHJvamVjdDIwNzU3MDc=",
//       repositoryId: "MDEwOlJlcG9zaXRvcnk1MDYwNDk5Nw==",
//       title: "Paul is a graphql herooooooooooooooooooooo!"
//     }) {
//       clientMutationId
//     }
//   }`;

//   return fetch(baseUrl, {
//     method: 'POST',
//     headers: {
//       Accept: 'application/vnd.github.starfire-preview+json',
//     },
//     body: JSON.stringify({ query: mutation }),
//   }).then(response => {
//     return response.json();
//   });
// }

function queryFetch(token) {
  const baseUrl = `https://api.github.com/graphql?access_token=${token}`;
  const query = {
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

  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.github.starfire-preview+json',
    },
    body: JSON.stringify(query),
  }).then(response => {
    return response.json();
  });
}

// eslint-disable-next-line
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

// eslint-disable-next-line
function makeIssueRequest(token, repo) {
  const baseUrl = `https://api.github.com/graphql?access_token=${token}`;

  // let mutation = {
  //   mutation: `{
  //     createIssue(input: {
  //       assigneeIds: "MDQ6VXNlcjczNjQ4MDA=",
  //       labelIds: "MDU6TGFiZWwzMTgxMjg3NzA=",
  //       projectIds: "MDc6UHJvamVjdDIwNzU3MDc=",
  //       repositoryId: "MDEwOlJlcG9zaXRvcnk1MDYwNDk5Nw==",
  //       title: "YOOO graphQL is boss"
  //     }) {
  //       issue {
  //         id
  //       }
  //      }
  //   }`,
  // };

  let mutation = {
    mutation: `{
      addReaction(input: {
        subjectId: "MDU6SXNzdWUzOTkxNzg4NjQ=",
        content:HEART
      }) {
        reaction {
          clientMutationId
        }
      }
    }`,
  };

  // let mutation = {
  //   mutation: `{
  //     createIssue(input: {
  //       assigneeIds: "MDQ6VXNlcjczNjQ4MDA=",
  //       labelIds: "MDU6TGFiZWwzMTgxMjg3NzA=",
  //       projectIds: "MDc6UHJvamVjdDIwNzU3MDc=",
  //       repositoryId: "MDEwOlJlcG9zaXRvcnk1MDYwNDk5Nw==",
  //       title: "YOOO graphQL is boss"
  //     }) {
  //       clientMutationId,
  //       issue {
  //        id
  //       }
  //     }
  //   }`,
  // };

  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    // xhr.responseType = 'json';
    xhr.open('POST', baseUrl, true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader(
      'Accept',
      'application/vnd.github.starfire-preview+json'
    );

    // xhr.onload = function() {
    //   console.log(xhr.response);
    // };

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        // JSON.parse does not evaluate the attacker's scripts.
        var resp = JSON.parse(xhr.responseText);
        console.log(JSON.stringify(resp));
        resolve(resp);
      }
    };

    xhr.send(JSON.stringify(mutation));
    // xhr.send(mutation);
  });
}
