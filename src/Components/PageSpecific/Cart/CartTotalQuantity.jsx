import React, { Component } from 'react';
import GlobalContext from '../../State Management/GlobalContext';

export const getTotalQuantity = (context) => {
    return context.cart.reduce((p, c)=>(p+c.count),0);
}

class CartTotalQuantity extends Component {

    static contextType = GlobalContext;

    render() { 
        return (
            <>
                {getTotalQuantity(this.context)}
            </>
        );
    }
}



export default CartTotalQuantity;