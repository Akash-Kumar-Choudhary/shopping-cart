import React, { useReducer } from "react";

import CartContext from "./CartContext";

const defaultCart = {
  items: [],
  totalAmount: 0,
};
const CartReducer = (state, action) => {
  if (action.type === "Add") {
    const updatedAmount =
      state.totalAmount + action.item.price * action.item.amount;
    const existingCartItem = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCart = state.items[existingCartItem];

    let updatedItems;
    if (existingCart) {
      const updatedItem = {
        ...existingCart,
        amount: existingCart.amount + action.item.amount,
      };

      updatedItems = [...state.items];
      updatedItems[existingCartItem] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if (action.type === "remove") {
    const existingCartItem = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    const existingCart = state.items[existingCartItem];
    const updatedAmount = state.totalAmount - existingCart.price;
    let updatedItems;
    if (existingCart.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingCart, amount: existingCart.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItem] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedAmount,
    };
  }
  if(action.type==='clear'){
    return defaultCart;
  }
  return defaultCart;
};

const CartProvider = (props) => {
  const [CartState, dispatchCartAction] = useReducer(CartReducer, defaultCart);

  const addItemHandler = (item) => {
    dispatchCartAction({ type: "Add", item: item });
  };
  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "remove", id: id });
  };

  const clearcartHandler=() =>{
    dispatchCartAction({type:"clear"})
  }

  const CartContext1 = {
    items: CartState.items,
    totalAmount: CartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearcart:clearcartHandler,
  };
  return (
    <CartContext.Provider value={CartContext1}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
