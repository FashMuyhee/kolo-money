import {
  SET_THEME,
  SET_SYSTEM_THEME, SET_SYSTEM_BIOMETRIC, SET_EMAIL_VERIFY, SET_USER
} from './type';


export const toggleTheme = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_THEME,
    });
  };
};

export const switchSystemTheme = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_SYSTEM_THEME,
    });
  };
};

export const toggleBiometricLogin = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_SYSTEM_BIOMETRIC,
    });
  };
};

export const setEmailVerify = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_EMAIL_VERIFY,
    });
  };
};

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch({
      type: SET_USER,
      payload:user
    });
  };
};
