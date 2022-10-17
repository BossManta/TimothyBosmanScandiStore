import React, {Component} from 'react';
import styled from 'styled-components';

import CartItemPreview from '../Cart/CartItemPreview';
import { SharedCssButton, SharedCssFlexCentered, SharedStyledH3 } from '../../GlobalStyling/SharedStyles';
import CartTotalCost, { getTaxCost } from '../../PageSpecific/Cart/CartTotalCost';
import CartTotalQuantity from '../../PageSpecific/Cart/CartTotalQuantity';
import GlobalContext from '../../State Management/GlobalContext'

//Page to display cart
class Cart extends Component {
    
    static contextType = GlobalContext;

    render() { 
        return (
            <StyledCart>

                <h1>CART</h1>

                {this.context.cart.map((p,i) => 
                    <StyledCartItemPreview key={i} item={p} index={i}/>
                )}

                <StyledTotalContainer>
                    <SharedStyledH3>
                        Tax 21%: {this.context.selectedCurrency.symbol+getTaxCost(this.context)}
                    </SharedStyledH3>

                    <SharedStyledH3>
                        Quantity: <CartTotalQuantity/>
                    </SharedStyledH3>
                    
                    <SharedStyledH3>
                        Total: <CartTotalCost/>
                    </SharedStyledH3>
                </StyledTotalContainer>

                <StyledOrderButton href="https://www.timothybosman.co.za">ORDER</StyledOrderButton>

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

const StyledOrderButton = styled.a`
    ${SharedCssButton}
    ${SharedCssFlexCentered}
    
    text-decoration: none;
    width: 20em;
    height: 3em;
    margin-top: 1em;
`
 
export default Cart;