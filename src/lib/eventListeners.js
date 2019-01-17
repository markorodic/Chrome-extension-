import { promptFirebaseAuth } from './authentication.js';
import { setStoredUserData } from './storage.js';

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

        sendResponse({ messageType: 'pendingLogin' });

        promptFirebaseAuth()
          .then(userData => {
            chrome.runtime.sendMessage({
              messageType: 'successfulLogin',
              userData,
            });

            setStoredUserData(userData);
          })
          .catch(err => {
            chrome.runtime.sendMessage({ messageType: 'failedLogin' });
          });

        break;
      default:
        console.warn('event name not recognized');
        break;
    }
  });
}
