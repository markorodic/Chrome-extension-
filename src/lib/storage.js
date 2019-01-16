export function getStoredUserData() {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(['userData'], ({ userData }) => {
      if (userData) {
        resolve(userData);
      } else {
        resolve({});
      }
    });
  });
}

export function setStoredUserData(userData) {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.set({ userData }, () => {
      resolve(userData);
    });
  });
}

export function clearLocalStorage() {
  chrome.storage.sync.set({ userData: null });
}
