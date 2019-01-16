'use strict';
/** Gets Github Authentication token
 *
 */

// eslint-disable-next-line
getGithubUserData()
  .then(userData => {
    console.log(userData.token);
    // eslint-disable-next-line
    // makeIssueRequest(userData.token);
    // makeGithubRequest(userData.token);

    // USING FETCH:
    makeIssueFetch(userData.token).then(data => {
      console.log(data);
    });

    // FETCH WORKS:
    // queryFetch(userData.token).then(data => {
    //   console.log(data);
    // });
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

// clearLocalStorage();
