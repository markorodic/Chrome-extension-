import { promptFirebaseAuth } from './authentication.js';
import { setStoredUserData } from './storage.js';
import * as messageType from '../messageTypeConstants.js';
import { createJsPlaygroundIssue } from './api/api.js';

export function initBackgroundListeners(State) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    switch (request.messageType) {
      case messageType.VIEW_IS_LOGGED_IN:
        sendResponse({
          messageType: messageType.BG_LOGIN_CHECK,
          loginState: State.isLoggedIn(),
        });
        break;

      case messageType.VIEW_PROMPT_AUTH:
        sendResponse({ messageType: messageType.BG_LOGIN_PENDING });
        authenticateUser(State);
        break;

      case messageType.FORM_SUBMISSION:
        sendResponse('form submission message receieved');
        submitIssue(State, request.formData);
        break;

      default:
        console.warn('event name not recognized');
        break;
    }
  });
}

function submitIssue(State, formData) {
  const { title, body } = formData;
  const { token } = State.getState();
  console.log(token);
  console.log(`making GH query: ${title} - ${body}`);
  createJsPlaygroundIssue(token, title, body);
}

function authenticateUser(State) {
  promptFirebaseAuth()
    .then(userData => {
      State.setState(userData);

      setStoredUserData(userData).then(_ => {
        console.log('sending message from ');
        chrome.runtime.sendMessage({
          messageType: messageType.BG_LOGIN_SUCCESS,
          userData,
        });
      });
    })
    .catch(err => {
      chrome.runtime.sendMessage({
        messageType: messageType.BG_LOGIN_FAILURE,
        err,
      });
    });
}
