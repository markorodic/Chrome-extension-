function addIssue(event) {
  event.preventDefault();
  console.log(document);

  const repository = document.getElementById('repository-selection');
  const repositoryValue = repository.options[repository.selectedIndex].value;
  var errorCheckboxValue = document.getElementsByClassName('hide')[0].checked;
  var titleTextValue = document.getElementById('issue-form-title').value;
  var bodyTextValue = document.getElementById('issue-form-body').value;

  return false;
}

function authenticate() {
  console.log('logged in');
}

window.addEventListener('load', function(evt) {
  console.log(document.getElementById('login-github-btn'));
  // document.getElementById('add-issue').addEventListener('submit', addIssue);
  document.getElementById('login-github-btn').addEventListener('click', authenticate);
  });
});
