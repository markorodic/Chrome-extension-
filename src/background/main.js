/** Gets Github Authentication token
 *
 */
import {
  getStoredUserData,
  // clearLocalStorage,
} from './storage.js';
import { initBackgroundListeners } from './bgEventListeners.js';
import { initState } from './state.js';

const State = initState();
console.log(State.getState());

initBackgroundListeners(State);

// clearLocalStorage();

getStoredUserData().then(userData => {
  console.log(userData);
  console.log(State.getState());
  if (userData && userData.token) {
    State.setState(userData);
    console.log(State.getState());
  }
});
