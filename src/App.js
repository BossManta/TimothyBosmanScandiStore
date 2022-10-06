import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import {  client } from '@tilework/opus';

import GlobalStyle from './Components/GlobalStyle'
import Navbar from './Components/Navbar';
import PLP from './Components/PLP';
import Cart from './Components/Cart';
import PDP from './Components/PDP';
import GlobalStateManager from './Components/GlobalStateManager';

class App extends Component {
  render() {
    client.setEndpoint(process.env.REACT_APP_GRAPHQL_ENDPOINT);
    return (
      <div className="App">
        <GlobalStyle/>
        <GlobalStateManager>
          <Navbar/>

          <Routes>
            <Route path="/" element={<PLP/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/product/:id" element={<PDP/>} />
          </Routes>
        </GlobalStateManager>
      </div>
    );
  }
}
 
export default App;
