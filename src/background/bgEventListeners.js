import { promptFirebaseAuth } from './authentication.js';
import { setStoredUserData } from './storage.js';
import * as messageType from '../messageTypeConstants.js';

export function initBackgroundListeners(State) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.messageType) {
      case messageType.VIEW_IS_LOGGED_IN:
        sendResponse({
          messageType: messageType.BG_LOGIN_CHECK,
          loginState: State.isLoggedIn(),
        });
        break;

      case messageType.VIEW_AUTHENTICATE_USER:
        sendResponse({ messageType: messageType.BG_LOGIN_PENDING });
        authenticateUser();
        break;

      default:
        console.warn('event name not recognized');
        break;
    }
  });
}

function authenticateUser() {
  promptFirebaseAuth()
    .then(userData => {
      chrome.runtime.sendMessage({
        messageType: messageType.BG_LOGIN_SUCCESS,
        userData,
      });

      setStoredUserData(userData);
    })
    .catch(err => {
      chrome.runtime.sendMessage({
        messageType: messageType.BG_LOGIN_FAILURE,
        err,
      });
    });
}
