import React, { Component } from 'react';
import GlobalContext from '../../State Management/GlobalContext';

// Get total quantity of all items in cart
export const getTotalQuantity = (context) => {
    return context.cart.reduce((p, c)=>(p+c.count),0);
}

// Displays quantity of all items in cart
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