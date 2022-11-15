import React, { Component } from 'react';
import PriceViewer from '../../Shared/PriceViewer';
import GlobalContext from '../../State Management/GlobalContext';


//Gets total cost of all items in cart
export const getTotalCost = (context) => {
    return context.cart.reduce((p,c)=>{

        const itemPrice = c.details.prices.find((s)=>s.currency.label===context.selectedCurrency.label)?.amount;
        return (p+(c.count*itemPrice));

    },0)
}

//Gets tax value based on total cost
export const getTaxCost = (context) => {
    return getTotalCost(context)*0.21
}

//Display total cost of cart
class CartTotalCost extends Component {

    static contextType = GlobalContext;

    render() { 
        return (
            <>
                <PriceViewer price={getTotalCost(this.context)}/>
            </>
        );
    }
}
 
export default CartTotalCost;