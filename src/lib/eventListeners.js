function checkLoggedIn(stateRef) {
  console.log('succ called isLoggedIN');
  return stateRef.loggedIn;
}

export function initBackgroundListeners(stateRef) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.messageType) {
      case 'isLoggedIn':
        const loggedIn = checkLoggedIn(stateRef);
        sendResponse({ loggedIn });
        break;
      default:
        console.warn('event name not recognized');
        break;
    }

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
