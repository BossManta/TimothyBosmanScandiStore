import React, { Component } from 'react';
import GlobalContext from '../../State Management/GlobalContext';


export const getTotalCost = (context) => {
    return Math.round(context.cart.reduce((p,c)=>{
        const itemPrice = c.details.prices.find((s)=>s.currency.label===context.selectedCurrency.label)?.amount;
        return (p+(c.count*itemPrice));
    },0)*100)/100
}

export const getTaxCost = (context) => {
    return Math.round(getTotalCost(context)*0.21*100)/100
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