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

let state = new State();

initBackgroundListeners(state);

getStoredUserData().then(userData => {
  // TODO: save that data into userData.js
  console.log(userData);
  if (userData && userData.token) {
    state = state.setUserData(userData);
  }
});
