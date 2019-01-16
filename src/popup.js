function checkLoggedIn() {
  // return new Promise((resolve, reject))
  chrome.runtime.sendMessage({ messageType: 'isLoggedIn' }, response => {
    console.log(response);
    if (response.loggedIn) {
      console.log(`Logged in, hello: ${response.username}`);
    } else {
      console.log('please sign in');
    }
  });
}
