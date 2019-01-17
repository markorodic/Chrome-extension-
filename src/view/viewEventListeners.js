/* global  VIEW_PROMPT_AUTH FORM_SUBMISSION renderIssueScreen */

// eslint-disable-next-line
function onDocumentLoaded() {
  registerChromeMessageListeners();

  if (
    document.attachEvent
      ? document.readyState === 'complete'
      : document.readyState !== 'loading'
  ) {
    console.log('dom was loaded');
    registerViewEventListeners();
  } else {
    console.log('DOM content has not yet been loaded');
    document.addEventListener('DOMContentLoaded', registerViewEventListeners);
  }
}

function registerViewEventListeners() {
  console.log('registered events!!!');
  const loginButtonElement = document.getElementById('login-github-btn');
  loginButtonElement.addEventListener('click', authenticateUser);

  const addIssueBtn = document.querySelector('.issue-form-button');
  addIssueBtn.addEventListener('click', submitIssue);
}

function registerChromeMessageListeners() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request);
    renderIssueScreen();
    // if (request.messageType.BG_LOGIN_SUCCESS) {
    //   console.log('RENDERING ISSUE SCREEN');
    //   const issueScreenElement = document.getElementById('issue-screen');
    //   console.log(issueScreenElement);
    //   console.log('will be null');

    //   renderIssueScreen();
    // }
  });
}

function authenticateUser() {
  console.log('button pressed login');
  chrome.runtime.sendMessage({ messageType: VIEW_PROMPT_AUTH }, response => {
    console.log(response);
  });
}

function submitIssue(event) {
  event.preventDefault();

  const formData = {};

  const repository = document.getElementById('repository-selection');
  const repositoryValue = repository.options[repository.selectedIndex].value;
  var errorCheckboxValue = document.getElementsByClassName('hide')[0].checked;
  const consoleError = document.getElementsByClassName('console-error')[0]
    .innerHTML;
  var titleTextValue = document.getElementById('issue-form-title').value;
  var bodyTextValue = document.getElementById('issue-form-body').value;

  formData.repository = repositoryValue;
  formData.error = errorCheckboxValue ? consoleError : '';
  formData.title = titleTextValue;
  formData.issue = bodyTextValue;

  chrome.runtime.sendMessage(
    { messageType: FORM_SUBMISSION, formData },
    response => {
      console.log(response);
    }
  );
  renderSuccessScreen();

  return false;
}
