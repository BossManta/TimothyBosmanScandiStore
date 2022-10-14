import React, {Component} from 'react';

import CartItemPreview from '../Cart/CartItemPreview';
import { StyledNameHeader } from '../../../SharedStyles';
import CartTotalCost, { getTaxCost, getTotalCost } from '../../PageSpecific/Cart/CartTotalCost';
import CartTotalQuantity from '../../PageSpecific/Cart/CartTotalQuantity';
import GlobalContext from '../../State Management/GlobalContext'
import styled from 'styled-components';

class Cart extends Component {
    
    static contextType = GlobalContext;

    render() { 
        return (
            <div style={{margin: "8%", marginTop: "100px"}}>
                <h1>CART</h1>
                {this.context.cart.map((p,i) => 
                    <StyledCartItemPreview showArrows key={i} item={p} index={i}/>
                )}

                <StyledTotalContainer>
                    <StyledNameHeader>
                        Tax 21%: {this.context.selectedCurrency.symbol+getTaxCost(this.context)}
                    </StyledNameHeader>

                    <StyledNameHeader>
                        Quantity: <CartTotalQuantity/>
                    </StyledNameHeader>
                    
                    <StyledNameHeader>
                        Total: <CartTotalCost/>
                    </StyledNameHeader>
                </StyledTotalContainer>
            </div>
        );
    }
}

const StyledCartItemPreview = styled(CartItemPreview)`
    border-top: 1px solid lightgray;
    padding-bottom: 1em;
    padding-top: 1em;
`
const StyledTotalContainer = styled.div`
    padding-top: 4em;
    border-top: 1px solid lightgray;
`
 
export default Cart;