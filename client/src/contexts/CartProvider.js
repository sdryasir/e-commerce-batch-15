import React, { createContext, useReducer, useContext } from 'react';

// Create context
const CartContext = createContext();

// Initial state
const initialState = [];

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = action.payload;
      const existing = state.find(i => i.id === item.id);
      if (existing) {
        return state.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...state, { ...item, quantity: 1 }];
      }
    }

    case 'REMOVE_FROM_CART': {
      return state.filter(item => item.id !== action.payload);
    }

    case 'INCREASE_QUANTITY': {
      return state.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    case 'DECREASE_QUANTITY': {
      return state.map(item =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      );
    }

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = item => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  const removeFromCart = id => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const increaseQuantity = id => {
    dispatch({ type: 'INCREASE_QUANTITY', payload: id });
  };

  const decreaseQuantity = id => {
    dispatch({ type: 'DECREASE_QUANTITY', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);

