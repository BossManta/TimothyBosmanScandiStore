import React from 'react';

const CartContext = React.createContext();

export const CCProvider = CartContext.Provider;
export const CCConsumer = CartContext.Consumer;


export default CartContext;