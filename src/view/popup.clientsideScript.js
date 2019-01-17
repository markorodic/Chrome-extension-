/* global FORM_SUBMISSION */

function addIssue(event) {
  event.preventDefault();
  console.log(document);

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

  sendFormData(formData);

  return false;
}

function sendFormData(formData) {
  console.log('form data sending');
  chrome.runtime.sendMessage(
    { messageType: FORM_SUBMISSION, formData },
    response => {
      console.log(response);
    }
  );
}

window.addEventListener('load', function(evt) {
  console.log(document.getElementById('login-github-btn'));
  document.getElementById('add-issue').addEventListener('submit', addIssue);
});
