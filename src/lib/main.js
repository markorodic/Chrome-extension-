/** Gets Github Authentication token
 *
 */
import { clearLocalStorage, getGithubUserData } from './authentication.js';
import { makeQuery, exQuery1 } from './api.js';

// eslint-disable-next-line
getGithubUserData().then(userData => {
  console.log(userData.token);
  makeQuery(userData.token, exQuery1, { preview: true }).then(data => {
    console.log(data);
  });
});

//     // FETCH WORKS:
//     // queryFetch(userData.token).then(data => {
//     //   console.log(data);
//     // });
//   })
//   .catch(err => {
//     console.log(err);
//   });

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (userData.loggedIn) {
//     sendResponse(userData);
//   } else {
//     sendResponse({ loggedIn: false });
//   }
// });

// clearLocalStorage();
