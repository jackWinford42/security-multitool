import {LOCATION_CHANGE} from 'react-router-redux';

let prevPathname = '';

export default () => next => action => {
  if (action.type === LOCATION_CHANGE) {
    const newAction = {
      ...action,
      payload: {
        ...action.payload,
        prevPathname,
      },
    };
    prevPathname = action.payload.pathname;
    return next(newAction);
  }
  return next(action);
};