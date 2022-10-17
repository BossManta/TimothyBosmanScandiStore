import React, {Component} from 'react';
import styled from 'styled-components';

import CartItemPreview from '../Cart/CartItemPreview';
import { SharedStyledButton, StyledNameHeader } from '../../../SharedStyles';
import CartTotalCost, { getTaxCost } from '../../PageSpecific/Cart/CartTotalCost';
import CartTotalQuantity from '../../PageSpecific/Cart/CartTotalQuantity';
import GlobalContext from '../../State Management/GlobalContext'

class Cart extends Component {
    
    static contextType = GlobalContext;

    render() { 
        return (
            <StyledCart>
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
                <StyledOrderButton>ORDER</StyledOrderButton>
            </StyledCart>
        );
    }
}

const StyledCart = styled.div`
    margin: 8%;
`

const StyledCartItemPreview = styled(CartItemPreview)`
    border-top: 1px solid lightgray;
    padding-bottom: 1em;
    padding-top: 1em;
`
const StyledTotalContainer = styled.div`
    padding-top: 4em;
    border-top: 1px solid lightgray;
`

const StyledOrderButton = styled(SharedStyledButton)`
    width: 20em;
    height: 3em;
    margin-top: 1em;
`
 
export default Cart;