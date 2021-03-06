/**
 * Constants are namespaced and follow naming convention of "[origin]/[event-name]"
 */
// VIEW origin
// Question: can I get rid of view prefix, if all can just be prefixed with IS_?
export const VIEW_IS_LOGGED_IN = 'view/is_logged_in';
export const VIEW_PROMPT_AUTH = 'view/prompt_authentication_of_user';
export const FORM_SUBMISSION = 'view/issue_form_submission';

// BACKGROUND origin
export const BG_LOGIN_PENDING = 'background/login_pending';
export const BG_LOGIN_SUCCESS = 'background/login_success';
export const BG_LOGIN_FAILURE = 'background/login_failure';
export const BG_LOGIN_CHECK = 'background/login_check';
