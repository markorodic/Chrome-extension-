function isUserLoggedIn() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ messageType: 'isLoggedIn' }, loggedInState => {
      resolve(loggedInState.loggedIn);
    });
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
  chrome.runtime.sendMessage({ messageType: 'authenticateUser' }, response => {
    console.log(response);
  });
}

registerDocumentEventListeners();

function registerDocumentEventListeners() {
  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    console.log('dom was loaded');
    registerPopupListeners();
  } else {
    console.log('inside else');
    document.addEventListener('DOMContentLoaded', registerPopupListeners);
  }
}

function registerPopupListeners() {
  const loginButtonElement = document.getElementById('login-btn');
  const test = document.querySelector('#login-btn');
  console.log(loginButtonElement, test);
  loginButtonElement.addEventListener(authenticateUser);
}
