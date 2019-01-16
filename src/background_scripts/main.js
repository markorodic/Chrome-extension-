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
    // makeGithubRequest(userData.token);
  })
  .catch(err => {
    console.log(err);
  });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (userData.loggedIn) {
//     sendResponse(userData);
//   } else {
//     sendResponse({ loggedIn: false });
//   }
// });
