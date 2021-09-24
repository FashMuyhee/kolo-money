import {
  SET_SYSTEM_THEME,
  SET_THEME, SET_SYSTEM_BIOMETRIC, SET_EMAIL_VERIFY, SET_USER
} from './type';

const initialState = {
  isDark: false,
  isSystemTheme: false,
  isBiometric: false,
  isEmailVerified: false,
  isSkipUpload: false,
  user:{}
};

export default AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        isDark: !state.isDark,
      };
    case SET_SYSTEM_THEME:
      return {
        ...state,
        isSystemTheme: !state.isSystemTheme,
      };
    case SET_SYSTEM_BIOMETRIC:
      return {
        ...state,
        isBiometric: !state.isBiometric,
      };
    case SET_EMAIL_VERIFY:
      return {
        ...state,
        isEmailVerified: !state.isEmailVerified,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
