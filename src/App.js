import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import {  client } from '@tilework/opus';

import GlobalStyle from './Components/GlobalStyle'
import Navbar from './Components/PageSpecific/Navbar/Navbar'
import PLP from './Components/PageSpecific/PLP/PLP'
import Cart from './Components/PageSpecific/Cart/Cart';
import PDP from './Components/PageSpecific/PDP/PDP';
import CartStateManager from './Components/State Management/CartStateManager';
import GlobalStateCombiner from './Components/State Management/GlobalStateCombiner';
import MiscStateManager from './Components/State Management/MiscStateManager';

class App extends Component {
  render() {
    client.setEndpoint(process.env.REACT_APP_GRAPHQL_ENDPOINT);
    return (
      <div className="App">
        <GlobalStyle/>
        <MiscStateManager>
          <CartStateManager>
            <GlobalStateCombiner>
              <Navbar/>

              <Routes>
                <Route path="/" element={<PLP/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/product/:id" element={<PDP/>} />
              </Routes>
            </GlobalStateCombiner>
          </CartStateManager>
        </MiscStateManager>
      </div>
    );
  }
}
 
export default App;
