/** Gets Github Authentication token
 *
 */
import {
  getStoredUserData,
  setStoredUserData,
  clearLocalStorage,
} from './storage.js';
import { initBackgroundListeners } from './eventListeners.js';
import { State } from './state.js';

console.log('main.js');

// initialize empty state
let state = new State();

// initalize background listeners

getStoredUserData().then(userData => {
  // TODO: save that data into userData.js
  if (userData && userData.token) {
    state = state.setUserData(userData);
  }
  console.log(state);
});

initBackgroundListeners();
