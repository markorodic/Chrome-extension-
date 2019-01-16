chrome.runtime.sendMessage({ message: 'am I logged in?' }, response => {
  console.log(response);
});
