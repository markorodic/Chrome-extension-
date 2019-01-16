console.log('main')

/** Gets Github Authentication token
 *
 */
// chrome.storage.sync.set({ key: myToken }, function() {
//   console.log('Value is set to ' + myToken);
// });

getGithubUserData().then(_ => {
    console.log('TGHIS WONT RUN')
    makeIssueRequest(userData.token)
  })
  .catch(err => {
    console.log(err);
  }); 
