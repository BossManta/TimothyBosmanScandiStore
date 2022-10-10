import React from 'react';

const MiscContext = React.createContext();

export const MCProvider = MiscContext.Provider;
export const MCConsumer = MiscContext.Consumer;

export default MiscContext;