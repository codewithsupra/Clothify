import { createContext, useReducer } from 'react';

// Helper functions for cart operations
const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(({ id }) => id === productToAdd.id);

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(({ id }) => id === cartItemToRemove.id);

  if (existingCartItem.quantity === 1) {
    return cartItems.filter(({ id }) => id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(({ id }) => id !== cartItemToClear.id);
};

// Initial state for the cart
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
};

// Cart reducer function
const cartReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        cartItems: payload.cartItems,
        cartCount: payload.cartItems.reduce((total, { quantity }) => total + quantity, 0),
      };

    case 'SET_IS_CART_OPEN':
      return {
        ...state,
        isCartOpen: payload,
      };

    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

// Cart context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
});

// Cart provider component
export const CartProvider = ({ children }) => {
  const [{ isCartOpen, cartItems, cartCount }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (newCartItems) => {
    dispatch({ type: 'SET_CART_ITEMS', payload: { cartItems: newCartItems } });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (isCartOpen) => {
    dispatch({ type: 'SET_IS_CART_OPEN', payload: isCartOpen });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
