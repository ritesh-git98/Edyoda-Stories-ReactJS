import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import axios from "axios";
import { baseUrl } from "../CommonResource/Common";

export const callAllVideos = () => {
    return (dispatch) => {
      axios
        .get(`${baseUrl}/findAllVideos`)
        .then((res) => {
          dispatch({
            type: "ALL_VIDEOS",
            payload: res.data,
          });
        });
    };
  };
export const userLoggedIn = payload => {
  return {
    type: "USER_LOGIN",
    payload
  };
};
export const educatorLoggedIn = payload => {
  return {
    type: "EDUCATOR_LOGIN",
    payload
  };
};
export const storeUserData = payload => {
  return {
    type: "USER_DATA",
    payload
  };
};

const initialState = {
  userData: JSON.parse(window.localStorage.getItem("userData")) || {},
  userLogin: window.localStorage.getItem("userLogged") || false,
  educatorLogin: window.localStorage.getItem("educatorLogged") || false,
  allVideoStore: []
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "USER_LOGIN":
      window.localStorage.setItem("userLogged", payload);
      return { ...state, userLogin: window.localStorage.getItem("userLogged") };

    case "EDUCATOR_LOGIN":
      window.localStorage.setItem("educatorLogged", payload);
      return {
        ...state,
        educatorLogin: window.localStorage.getItem("educatorLogged")
      };

    case "USER_DATA":
      window.localStorage.setItem("userData", JSON.stringify(payload));
      return {
        ...state,
        userData: JSON.parse(window.localStorage.getItem("userData"))
      };

    case "ALL_VIDEOS":
      return {
        ...state,
        allVideoStore: payload
      };

    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunk));
// store.subscribe(() => console.log(store.getState()));
export default store;
