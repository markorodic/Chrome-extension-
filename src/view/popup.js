/* global VIEW_IS_LOGGED_IN onDocumentLoaded */

isUserLoggedIn().then(({ loggedIn }) => {
  if (loggedIn) {
    renderIssueScreen();
  } else {
    renderLoginScreen();
  }
});

onDocumentLoaded();
// -------- function declarations ------
function isUserLoggedIn() {
  return new Promise(resolve => {
    chrome.runtime.sendMessage(
      { messageType: VIEW_IS_LOGGED_IN },
      ({ loginState }) => {
        loginState ? resolve({ loggedIn: true }) : resolve({ loggedIn: false });
      }
    );
  });
}

// ======== VIEW FUNCTIONS =============
function renderLoginScreen() {
  const loginScreenElement = document.getElementById('login-screen');
  const issueScreenElement = document.getElementById('issue-screen');
  const postSuccessScreen = document.getElementById('post-success-screen');

  loginScreenElement.classList.remove('hidden');
  issueScreenElement.classList.add('hidden');
  postSuccessScreen.classList.add('hidden');
}

function renderIssueScreen() {
  const loginScreenElement = document.getElementById('login-screen');
  const issueScreenElement = document.getElementById('issue-screen');
  const postSuccessScreen = document.getElementById('post-success-screen');

  loginScreenElement.classList.add('hidden');
  issueScreenElement.classList.remove('hidden');
  postSuccessScreen.classList.add('hidden');
}

function renderSuccessScreen() {
  const loginScreenElement = document.getElementById('login-screen');
  const issueScreenElement = document.getElementById('issue-screen');
  const postSuccessScreen = document.getElementById('post-success-screen');

  loginScreenElement.classList.add('hidden');
  issueScreenElement.classList.add('hidden');
  postSuccessScreen.classList.remove('hidden');
}
