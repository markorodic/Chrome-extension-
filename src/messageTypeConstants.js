/**
 * Constants are namespaced and follow naming convention of "[origin]/[event-name]"
 */

// VIEW origin
export const VIEW_IS_LOGGED_IN = 'view/is_logged_in';
export const VIEW_AUTHENTICATE_USER = 'view/authenticate_user';

// BACKGROUND origin
export const BG_LOGIN_PENDING = 'background/login_pending';
export const BG_LOGIN_SUCCESS = 'background/login_success';
export const BG_LOGIN_FAILURE = 'background/login_failure';
