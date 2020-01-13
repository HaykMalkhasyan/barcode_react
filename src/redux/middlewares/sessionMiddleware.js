import history from "../../history"

export const SESSION_FORBIDDEN = 'SESSION_FORBIDDEN';

export default function sessionMiddleware() {
    return ({getState, dispatch}) => {
        return next => action => {
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }
            if (action.error && action.error.response && action.error.response.status === 403) {
                dispatch({type:SESSION_FORBIDDEN, prevPath:history.location.pathname})
            }
            return  next(action);
        }
    }
}
