import { promptFirebaseAuth } from './authentication.js';

function checkLoggedIn(stateRef) {
  return stateRef.loggedIn;
}

export function initBackgroundListeners(stateRef) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.messageType) {
      case 'isLoggedIn':
        const loggedIn = checkLoggedIn(stateRef);
        sendResponse({ loggedIn });
        break;
      case 'authenticateUser':
        console.log('authUser');

        promptFirebaseAuth()
          .then(userData => {
            // store in chrome
            sendResponse(userData);
          })
          .catch(err => {
            sendResponse(err);
          });

        break;
      default:
        console.warn('event name not recognized');
        break;
    }
  });
}
