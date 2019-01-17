/**
 * Constants are namespaced and follow naming convention of "[origin]/[event-name]"
 */
export default {
  VIEW_IS_LOGGED_IN,
  VIEW_AUTHENTICATE_USER,
  BG_LOGIN_PENDING,
  BG_LOGIN_SUCCESS,
  BG_LOGIN_FAILURE,
};

// VIEW origin
const VIEW_IS_LOGGED_IN = 'view/is_logged_in';
const VIEW_AUTHENTICATE_USER = 'view/authenticate_user';

// BACKGROUND origin
const BG_LOGIN_PENDING = 'background/login_pending';
const BG_LOGIN_SUCCESS = 'background/login_success';
const BG_LOGIN_FAILURE = 'background/login_failure';
