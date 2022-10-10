import React, {Component} from 'react';

import CartItemPreview from '../Cart/CartItemPreview';
import { StyledNameHeader } from '../../../SharedStyles';
import CartTotalCost from '../../PageSpecific/Cart/CartTotalCost';
import CartTotalQuantity from '../../PageSpecific/Cart/CartTotalQuantity';
import GlobalContext from '../../State Management/GlobalContext'

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
                        Quantity: <CartTotalQuantity/>
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