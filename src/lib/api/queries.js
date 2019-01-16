// creates an Issue in thechutrain/js-playground repo
// source: https://github.com/thechutrain/js-playground/issues
export const createIssue = `mutation {
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

export const addReaction = `mutation: {
    addReaction(input: {
      subjectId: "MDU6SXNzdWUzOTkxNzg4NjQ=",
      content:HEART
    }) {
      reaction {
        clientMutationId
      }
    }
  }`;

export const readRepositories = `{
    viewer {
      name
       repositories(last: 4) {
         nodes {
           name
         }
       }
     }
  }`;
