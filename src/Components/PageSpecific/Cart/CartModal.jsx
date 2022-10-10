import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Modal from '../../Shared/Modal';
import CartItemPreview from './CartItemPreview';
import { StyledNameHeader, StyledBrandHeader } from '../../../SharedStyles';
import CartTotalCost from './CartTotalCost';
import CartTotalQuantity from './CartTotalQuantity';
import GlobalContext from '../../State Management/GlobalContext';

class CartModal extends Component {
    state = {  } 

    static contextType = GlobalContext;

    render() { 

        return (
            <Modal darkness={0.2} setIsOpen={this.props.setIsOpen}>
                <StyledModalContainer onClick={(e)=>e.stopPropagation()}>
                    
                    <div style={{height: "10%"}}>
                        <StyledBrandHeader>My Bag, <CartTotalQuantity/> Items </StyledBrandHeader>
                    </div>

                    <StyledItemPreviewContainer>
                        {this.context.cart.map((p,i) => 
                            <CartItemPreview key={i} item={p} index={i}/>
                        )}
                    </StyledItemPreviewContainer>
                    
                    <div style={{display: "flex", justifyContent: "space-between", alignItems:"center", height: "10%"}}>
                        <StyledNameHeader>Total:</StyledNameHeader>
                        <StyledBrandHeader><CartTotalCost/></StyledBrandHeader>
                    </div>

                    <StyledButtonContainer>
                        <StyledViewBagButton  onClick={()=>this.props.setIsOpen(false)} to={`/cart`}>View Bag</StyledViewBagButton>
                        <StyledViewBagButton  onClick={()=>this.props.setIsOpen(false)} to={`/cart`}>Check Out</StyledViewBagButton>
                    </StyledButtonContainer>
                    
                </StyledModalContainer>
            </Modal>
        );
    }
}

const StyledButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledViewBagButton = styled(Link)`
    background-color: limeGreen;
    color: white;
    font-weight: bold;
    text-decoration: none;
    width: 35%;
    text-align: center;
    padding: 1em;
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
    top: 8%;
    right: 5%;
    position: fixed;
    font-size: small;
`

export default CartModal;