import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from '../../Shared/Modal';
import CartItemPreview from './CartItemPreview';
import { SharedCssFlexCentered, SharedCssButton, SharedStyledH2, SharedStyledH3 } from '../../GlobalStyling/SharedStyles';
import CartTotalCost from './CartTotalCost';
import CartTotalQuantity from './CartTotalQuantity';
import GlobalContext from '../../State Management/GlobalContext';
import { Link } from 'react-router-dom';

//Modal version of cart page
class CartModal extends Component {
    state = {  } 

    static contextType = GlobalContext;

    render() { 

        return (
            <Modal darkness={0.2} setIsOpen={this.props.setIsOpen}>
                <StyledModalContainer onClick={(e)=>e.stopPropagation()}>
                    
                    <div style={{height: "10%"}}>
                        <SharedStyledH2 isBold>My Bag, <CartTotalQuantity/> Items </SharedStyledH2>
                    </div>

                    {/* List products in cart */}
                    <StyledItemPreviewContainer>
                        {this.context.cart.map((p,i) => 
                            <StyledCartItemPreview isModal key={i} item={p} index={i}/>
                        )}
                    </StyledItemPreviewContainer>
                    
                    {/* Price Total */}
                    <PriceTotalContainer>
                        <SharedStyledH3 isRoboto isBold>Total:</SharedStyledH3>
                        <SharedStyledH3 isBold><CartTotalCost/></SharedStyledH3>
                    </PriceTotalContainer>

                    {/* Check Out & Go to Cart page buttons */}
                    <StyledButtonContainer>
                        <StyledViewBagButton  onClick={()=>this.props.setIsOpen(false)} to={`/cart`}>VIEW BAG</StyledViewBagButton>
                        <StyledCheckOutButton  onClick={()=>this.props.setIsOpen(false)} href="https://www.timothybosman.co.za">CHECK OUT</StyledCheckOutButton>
                    </StyledButtonContainer>
                    
                </StyledModalContainer>
            </Modal>
        );
    }
}

const PriceTotalContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10%;
`

const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 3em;
`

const StyledViewBagButton = styled(Link)`
    ${SharedCssFlexCentered}
    text-decoration: none;
    width: 45%;
    text-align: center;

    color: black;
    border: black 1px solid;
    font-weight: bold;

    &:hover{
        background-color: lightgray;
    }
`

const StyledCheckOutButton = styled.a`
    ${SharedCssButton}
    ${SharedCssFlexCentered}
    text-decoration: none;
    width: 45%;
    text-align: center;
`

const StyledItemPreviewContainer = styled.div`
    overflow-y: auto;
    height: 70%;

    //Make the scroll bar a little thinner
    scrollbar-width: thin;  
    ::-webkit-scrollbar {
        width: 0.6em;
    }
    ::-webkit-scrollbar-track {
        background: whitesmoke;
    }
    ::-webkit-scrollbar-thumb {
        background-color: lightgray;
    }
`

const StyledModalContainer = styled.div`
    background-color: white;
    padding: 2em;
    width: 20em;
    height: 40em;
    max-height: max(calc(100vh - 8% - 8em), 25em);
    top: 8%;
    right: 5%;
    position: fixed;
    font-size: small;
`

const StyledCartItemPreview = styled(CartItemPreview)`
    margin-bottom: 2em;
`

export default CartModal;