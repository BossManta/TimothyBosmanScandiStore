import React, {Component} from 'react';

import GlobalContext from './GlobalContext';
import CartItemPreview from './CartItemPreview';
import { StyledNameHeader } from '../SharedStyles';
import CartTotalCost from './CartTotalCost';
import CartTotalQuantity from './CartTotalQuantity';

class Cart extends Component {
    
    static contextType = GlobalContext;

    render() { 
        return (
            <div style={{margin: "8%", marginTop: "100px"}}>
                <h1>CART</h1>
                {this.context.cart.map((p,i) => 
                    <CartItemPreview key={i} item={p} index={i}/>
                )}
                <div>
                    <StyledNameHeader>
                        Quantity: <CartTotalQuantity></CartTotalQuantity>
                    </StyledNameHeader>
                    
                    <StyledNameHeader>
                        Total: <CartTotalCost/>
                    </StyledNameHeader>
                </div>
            </div>
        );
    }
}
 
export default Cart;