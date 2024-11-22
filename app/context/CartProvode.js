import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const CartContext = createContext();

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.item.id
      );

      if (existingItemIndex >= 0) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex].quantity += 1;
        return {
          ...state,
          cartItems: updatedCartItems,
          totalAmount: state.totalAmount + action.item.price,
          totalQuantity: state.totalQuantity + 1,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, action.item],
          totalAmount: state.totalAmount + action.item.price,
          totalQuantity: state.totalQuantity + 1,
        };
      }
    case "REMOVE_FROM_CART":
      const existingItemIndex1 = state.cartItems.findIndex(
        (item) => item.id === action.id
      );
      if (existingItemIndex1 >= 0) {
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex1].quantity -= 1;
        if (updatedCartItems[existingItemIndex1].quantity === 0) {
          updatedCartItems.splice(existingItemIndex1, 1);
        }
        return {
          ...state,
          cartItems: updatedCartItems,
          totalAmount: state.totalAmount - action.item.price,
          totalQuantity: state.totalQuantity - 1,
        };
      } else {
        return state;
      }
    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
        totalAmount: 0,
        totalQuantity: 0,
      };
    default:
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    AsyncStorage.getItem("cartItems").then((cartItems) => {
      if (cartItems) {
        dispatch({ type: "ADD_TO_CART", item: JSON.parse(cartItems) });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (item) => {
    dispatch({ type: "ADD_TO_CART", item });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    Toast.show({
      type: "success",
      text1: "Cart Cleared",
      text2: "Your cart has been cleared.",
    });
  };

  return (
    <CartContext.Provider
      value={{ addToCart, removeFromCart, clearCart, ...state }}
    >
      {children}
    </CartContext.Provider>
  );
};
