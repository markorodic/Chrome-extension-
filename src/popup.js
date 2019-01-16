chrome.runtime.sendMessage({ messageType: 'isAuthenticated' }, response => {
  if (response.loggedIn) {
    console.log(`Logged in, hello: ${response.username}`);
  } else {
    console.log('please sign in');
  }
});
