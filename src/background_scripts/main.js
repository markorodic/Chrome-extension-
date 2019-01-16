'use strict';
/** Gets Github Authentication token
 *
 */

// eslint-disable-next-line
getGithubUserData()
  .then(_ => {
    // eslint-disable-next-line
    makeIssueRequest(userData.token);
  })
  .catch(err => {
    console.log(err);
  });
