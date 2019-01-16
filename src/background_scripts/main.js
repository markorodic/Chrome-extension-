'use strict';
/** Gets Github Authentication token
 *
 */

// eslint-disable-next-line
getGithubUserData()
  .then(_ => {
    console.log(userData.token);
    // eslint-disable-next-line
    makeIssueRequest(userData.token);
  })
  .catch(err => {
    console.log(err);
  });

console.log('sending message');
chrome.runtime.sendMessage({ greeting: 'hello' }, function(response) {
  console.log(response);
});
