import React, { Component } from 'react';
import GlobalContext from './GlobalContext';


export const getTotalCost = (context) => {
    return Math.round(context.cart.reduce((p,c)=>{
        const itemPrice = c.details.prices.filter((s)=>s.currency.label===context.selectedCurrency.label)[0].amount;
        return (p+(c.count*itemPrice));
    },0)*100)/100
}

class CartTotalCost extends Component {
    state = {  } 

    static contextType = GlobalContext;

    render() { 
        return (
            <>
                {this.context.selectedCurrency.symbol+getTotalCost(this.context)}
            </>
        );
    }
}
 
export default CartTotalCost;