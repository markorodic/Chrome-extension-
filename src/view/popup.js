/* global VIEW_IS_LOGGED_IN, VIEW_PROMPT_AUTH */
function isUserLoggedIn() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { messageType: VIEW_IS_LOGGED_IN },
      ({ loginState }) => {
        loginState ? resolve({ loginState }) : reject({ loginState });
      }
    );
  });
}

isUserLoggedIn().then(loggedIn => {
  if (loggedIn) {
    renderLoginScreen();
  } else {
    renderIssueScreen();
  }
});

function renderLoginScreen() {
  const loginScreenElement = document.getElementById('login-screen');
  const issueScreenElement = document.getElementById('issue-screen');

  loginScreenElement.classList.add('hidden');
  issueScreenElement.classList.remove('hidden');
}

function renderIssueScreen() {
  const loginScreenElement = document.getElementById('login-screen');
  const issueScreenElement = document.getElementById('issue-screen');

  loginScreenElement.classList.remove('hidden');
  issueScreenElement.classList.add('hidden');
}

function authenticateUser() {
  console.log('button pressed login');
  chrome.runtime.sendMessage({ messageType: VIEW_PROMPT_AUTH }, response => {
    console.log(response);
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(request);
});

onDocumentLoaded();

function onDocumentLoaded() {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    console.log('dom was loaded');
    registerPopupListeners();
  } else {
    console.log('DOM content has not yet been loaded');
    document.addEventListener('DOMContentLoaded', registerPopupListeners);
  }
}

function registerPopupListeners() {
  console.log('firing register listeners');
  const loginButtonElement = document.getElementById('login-btn');
  loginButtonElement.addEventListener('click', authenticateUser);
}
