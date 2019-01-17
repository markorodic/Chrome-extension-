function addIssue(event) {
  event.preventDefault();
  console.log(document);

  response = {};

  const repository = document.getElementById('repository-selection');
  const repositoryValue = repository.options[repository.selectedIndex].value;
  var errorCheckboxValue = document.getElementsByClassName('hide')[0].checked;
  const consoleError = document.getElementsByClassName('console-error')[0]
    .innerHTML;
  var titleTextValue = document.getElementById('issue-form-title').value;
  var bodyTextValue = document.getElementById('issue-form-body').value;

  response.repository = repositoryValue;
  response.error = errorCheckboxValue ? consoleError : '';
  response.title = titleTextValue;
  response.issue = bodyTextValue;

  return false;
}

function authenticate() {
  console.log('logged in');
}

window.addEventListener('load', function(evt) {
  console.log(document.getElementById('login-github-btn'));
  document.getElementById('add-issue').addEventListener('submit', addIssue);
  document
    .getElementById('login-github-btn')
    .addEventListener('click', authenticate);
});
