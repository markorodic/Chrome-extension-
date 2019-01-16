export function initBackgroundListeners() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // define a switch statement
    // if case is

    console.log('received message & sending response');
    const userData = {
      loggedIn: true,
      username: 'Marko',
    };

    if (userData.loggedIn) {
      sendResponse(userData);
    } else {
      sendResponse({ loggedIn: false });
    }
  });
}
