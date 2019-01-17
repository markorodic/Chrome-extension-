/** Gets Github Authentication token
 *
 */
import { getStoredUserData, clearLocalStorage } from './storage.js';
import { initBackgroundListeners } from './bgEventListeners.js';
import { initState } from './state.js';

const State = initState();
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
