const defaultState = {
  token: '',
  tokenExpiration: '',
  displayName: '',
  username: '',
  loggedIn: false,
};

export function State(prevState = defaultState) {
  this.token = prevState.token;
  this.tokenExpiration = prevState.tokenExpiration;
  this.displayName = prevState.displayName;
  this.username = prevState.username;
  this.loggedIn = prevState.loggedIn;
}

State.prototype.setUserData = function(userData) {
  const newState = new State();
  newState.token = userData.token;
  newState.tokenExpiration = userData.tokenExpiration;
  newState.displayName = userData.displayName;
  newState.username = userData.username;
  newState.loggedIn = userData.loggedIn;

  return newState;
};
