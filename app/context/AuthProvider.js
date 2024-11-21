import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const initialState = {
  user: null,
  email: null,
  username: null,
  loading: true,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "RESTORE_TOKEN":
      return {
        ...state,
        user: action.token,
        email: action.email,
        username: action.username,
        loading: false,
      };
    case "LOGIN":
      return {
        ...state,
        user: action.token,
        email: action.email,
        username: action.username,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        email: null,
        username: null,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken");
        const email = await AsyncStorage.getItem("email");
        const username = await AsyncStorage.getItem("username");

        if (userToken) {
          dispatch({
            type: "RESTORE_TOKEN",
            token: userToken,
            email: email,
            username: username,
          });
        } else {
          dispatch({
            type: "RESTORE_TOKEN",
            token: null,
            email: null,
            username: null,
          });
        }
      } catch (error) {
        console.error("Failed to load user token:", error);
        dispatch({
          type: "RESTORE_TOKEN",
          token: null,
          email: null,
          username: null,
        });
      }
    };

    getUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "http://backend.nepalgadgetstore.com/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", response.data);

      const user = response.data.refresh;
      const username = response.data.username;
      const emaila = response.data.email;

      await AsyncStorage.setItem("userToken", user);

      if (username !== undefined && username !== null) {
        await AsyncStorage.setItem("username", username);
      } else {
        await AsyncStorage.removeItem("username");
      }

      if (emaila !== undefined && emaila !== null) {
        await AsyncStorage.setItem("email", emaila);
      } else {
        await AsyncStorage.removeItem("email");
      }

      dispatch({
        type: "LOGIN",
        token: user,
        email: emaila,
        username: username,
      });
      router.replace("/(tabs)/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post("http://backend.nepalgadgetstore.com/register", {
        username,
        email,
        password,
      });
      router.replace("/signin");
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("email");
      await AsyncStorage.removeItem("username");
      dispatch({ type: "LOGOUT" });
      router.replace("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const changePassword = async (password) => {
    try {
      const response = await axios.post(
        "http://backend.nepalgadgetstore.com/changepassword",
        {
          password,
        }
      );
      const newToken = response.data.token;
      await AsyncStorage.setItem("userToken", newToken);
      dispatch({
        type: "LOGIN",
        token: newToken,
        email: state.email,
        username: state.username,
      });
    } catch (error) {
      console.error("ChangePassword failed:", error);
      throw error;
    }
  };

  const searchProduct = async (name) => {
    try {
      const response = await axios.post(
        "http://backend.nepalgadgetstore.com/search",
        {
          title: name,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error("No Product Found");
      } else {
        console.error("An error occurred:", error.message);
      }
      return null;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        email: state.email,
        username: state.username,
        loading: state.loading,
        login,
        register,
        logout,
        changePassword,
        searchProduct,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
