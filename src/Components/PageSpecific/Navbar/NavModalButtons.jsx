import React, { Component } from 'react';
import styled from 'styled-components';

import GlobalContext from '../../State Management/GlobalContext';
import CartModal from '../../PageSpecific/Cart/CartModal';
import CurrencySelectorModal from './CurrencySelectorModal';
import CartTotalQuantity, {getTotalQuantity} from '../Cart/CartTotalQuantity';

//Buttons to open modals (Currency selection modal, Cart modal)
class NavModalButtons extends Component {

    state = {
        isCurrencyModalOpen: false,
        isCartModalOpen: false
    }

    static contextType = GlobalContext;

    setCurrencyModalVisibility = (isOpen) =>
    {
        this.setState({isCurrencyModalOpen: isOpen});
    }

    setCartModalVisibility = (isOpen) =>
    {
        this.setState({isCartModalOpen: isOpen});
    }

    render() { 
        return (
            <>
                {/* Currency Selection */}
                <StyledNavModalButton onClick={() => this.setCurrencyModalVisibility(true)}>
                    <span style={{display:"flex", alignItems:"center"}}>
                        {this.context.selectedCurrency.symbol}
                        <StyledCurrencySelectorArrow flipped={!this.state.isCurrencyModalOpen} src={require("../../../Images/CurrencySelectorArrow.png")}/>
                    </span>
                </StyledNavModalButton>
                

                {/* Cart Button */}
                <StyledNavModalButton onClick={() => this.setCartModalVisibility(true)}>
                    <StyledCartIconContainer>
                        <img src={require("../../../Images/Cart.png")} alt="Cart" height="15em"/>
                        <StyledCartCountBubble quantity={getTotalQuantity(this.context)}>
                            <CartTotalQuantity />
                        </StyledCartCountBubble>
                    </StyledCartIconContainer>
                </StyledNavModalButton>



                {/* Modals*/}
                {this.state.isCurrencyModalOpen && 
                <CurrencySelectorModal setIsOpen={this.setCurrencyModalVisibility}/>}

                {this.state.isCartModalOpen && 
                <CartModal setIsOpen={this.setCartModalVisibility}/>}

            </>
        );
    }
}

const StyledNavModalButton = styled.button`
    border: none;
    background-color: white;
    font-weight: 500;
    margin-right: 1%;
    
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
`

const StyledCartIconContainer = styled.div`
    position: relative;
    padding-top: 0.7em;
    padding-right: 0.6em;
`

const StyledCurrencySelectorArrow = styled.img`
    transform: scaleY(${p=>(p.flipped?-1:1)});
    height: 0.3em;
    margin-left: 0.2em;
`

const StyledCartCountBubble = styled.div`
    display: ${p=>(p.quantity<=0?"none":"flex")};
    justify-content: center;
    align-items: center;


    position: absolute;
    right: 0;
    top: 0;
    background-color: black;
    color: white;
    width: 1.6em;
    height: 1.6em;
    font-size: x-small;
    border-radius: 2em;
    font-family: 'Roboto', sans-serif;
    
`
 
export default NavModalButtons;