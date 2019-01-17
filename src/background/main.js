/** Gets Github Authentication token
 *
 */
import { getStoredUserData, clearLocalStorage } from './storage.js';
import { initBackgroundListeners } from './bgEventListeners.js';
import { initState } from './state.js';
import { createJsPlaygroundIssue } from './api/api.js';

const State = initState();
window.State = State;

// createJsPlaygroundIssue(
//   '1b3bd572380a613bfa74735e8f2af861b1259245',
//   'HELP ME!!!'
// );

console.log(State.getState());

initBackgroundListeners(State);

// clearLocalStorage();

getStoredUserData().then(userData => {
  if (userData && userData.token) {
    State.setState(userData);
  }
  const strState = JSON.stringify(State.getState());
  console.log(`State: ${strState}`);
});
