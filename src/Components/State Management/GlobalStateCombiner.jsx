import React, { Component } from 'react';
import { CCConsumer } from './CartContext';
import { GCProvider } from './GlobalContext';
import { MCConsumer } from './MiscContext';

class GlobalStateCombiner extends Component {
    
    render() { 
        return (
            <MCConsumer>
                {miscContext =>(
                    <CCConsumer>
                        {cartContext => (
                            <GCProvider value={{...miscContext, ...cartContext}}>
                                {this.props.children}
                            </GCProvider>
                        )}
                    </CCConsumer>
                )}
            </MCConsumer>
        );
    }
}
 
export default GlobalStateCombiner;