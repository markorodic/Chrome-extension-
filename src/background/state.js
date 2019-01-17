const defaultState = {
  token: '',
  displayName: '',
  username: '',
  // loggedIn: false,
};

// TODO: remove singleton name
export function initState() {
  let state = Object.freeze(defaultState);

  function getState() {
    return state;
  }

  function isLoggedIn() {
    // Note: can just determine logged in status based on whether there is a
    // token or not for now.
    return state.token !== '';
  }

  function setState(userData = {}) {
    const newState = {};
    for (let key in state) {
      if (userData.key) {
        newState[key] = userData[key];
      } else {
        newState[key] = state[key];
      }
    }
    state = Object.freeze(newState);

    return state;
  }

  return {
    getState,
    isLoggedIn,
    setState,
  };
}
