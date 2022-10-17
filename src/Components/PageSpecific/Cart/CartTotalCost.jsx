import React, { Component } from 'react';
import GlobalContext from '../../State Management/GlobalContext';


//Gets total cost of all items in cart
export const getTotalCost = (context) => {
    return Math.round(context.cart.reduce((p,c)=>{
        const itemPrice = c.details.prices.find((s)=>s.currency.label===context.selectedCurrency.label)?.amount;
        return (p+(c.count*itemPrice));
    },0)*100)/100
}

//Gets tax value based on total cost
export const getTaxCost = (context) => {
    return Math.round(getTotalCost(context)*0.21*100)/100
}

//Display total cost of cart
class CartTotalCost extends Component {

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