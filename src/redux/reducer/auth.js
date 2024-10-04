const initialState = {
  userData: {},
  tokenLogin: "",
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA": {
      return {
        ...state,
        userData: action.value,
      };
    }
    case "TOKEN_LOGIN_USER": {
      return {
        ...state,
        tokenLogin: action.value,
      };
    }
    case "RESET":
      return initialState;
    default:
      return state;
  }
};
