import React from 'react';

const GlobalContext = React.createContext();

export const GCProvider = GlobalContext.Provider;
export const GCConsumer = GlobalContext.Consumer;

export default GlobalContext;