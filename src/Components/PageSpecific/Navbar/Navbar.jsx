import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import CartModal from '../../PageSpecific/Cart/CartModal';
import CurrencySelectorModal from './CurrencySelectorModal';
import GlobalContext from '../../State Management/GlobalContext';
import CartTotalQuantity, {getTotalQuantity} from '../Cart/CartTotalQuantity';

class Navbar extends Component {
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

    handleCategorySelection = (categoryName) => 
    {
        this.context.setSelectedCategory(categoryName)
    }

    render() 
    { 
        return (
            <StyledNavbar >
                <div style={{paddingLeft:20, width:"30%", display:"flex"}}>
                    {this.context.categoryList.map(c=>(
                        <StyledNavLink    to={"/"}
                                            key={c.id}
                                            selected={this.context.selectedCategory===c.name}
                                            onClick={()=>this.handleCategorySelection(c.name)}>

                            {c.name.toUpperCase()}
                        </StyledNavLink>
                    ))}
                </div>


                <StyledLogo>
                    <img src={require('../../../Images/GreenLogo.png')} alt="Green Logo"/>
                </StyledLogo>


                <div style={{width:"30%", display:"flex", justifyContent:"right"}}>

                    {/* Currency Selection */}
                    <StyledNavModalButton onClick={() => this.setCurrencyModalVisibility(true)}>
                        <span style={{display:"flex", alignItems:"center"}}>
                            $
                            <StyledCurrencySelectorArrow flipped={!this.state.isCurrencyModalOpen} src={require("../../../Images/CurrencySelectorArrow.png")}/>
                        </span>
                    </StyledNavModalButton>
                    

                    {/* Cart Button */}
                    <StyledNavModalButton onClick={() => this.setCartModalVisibility(true)}>
                        <div style={{position:"relative", paddingTop:"0.7em", paddingRight:"0.6em"}}>
                            <img src={require("../../../Images/Cart.png")} alt="Cart" height="15em"/>
                            <StyledCartCountBubble quantity={getTotalQuantity(this.context)}>
                                <CartTotalQuantity />
                            </StyledCartCountBubble>
                        </div>
                    </StyledNavModalButton>



                    {/* Modals*/}
                    {this.state.isCurrencyModalOpen && 
                    <CurrencySelectorModal setIsOpen={this.setCurrencyModalVisibility}></CurrencySelectorModal>}
                    
                    {this.state.isCartModalOpen && 
                    <CartModal setIsOpen={this.setCartModalVisibility}></CartModal>}
                </div>
            </StyledNavbar>
        );
    }
}

const StyledCurrencySelectorArrow = styled.img`
    -webkit-transform: scaleY(${p=>(p.flipped?-1:1)});
    transform: scaleY(${p=>(p.flipped?-1:1)});
    height: 0.3em;
    margin-left: 0.2em;
`

const StyledCartCountBubble = styled.div`
    display: ${p=>(p.quantity<=0?"none":"flex")};
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
    justify-content: center;
    align-items: center;
    
`

const StyledLogo = styled.div`
    width: 30%;
    display: flex;
    justify-content: center;
    height: 100%;

    //Hide logo to make space for category tabs
    @media screen and (max-width: 600px) {
        display: none;
    }
`

const StyledNavbar = styled.div`
    background: white;
    text-align: left;
    display: flex;
    padding: 0.6em;
    justify-content: space-between;

    position: fixed;
    top: 0;
    left: 0;
    right:0;
    z-index: 10000;

    padding-left: 5em;
    padding-right: 5em;
    @media screen and (max-width: 700px) {
        padding: 0.6em;
    }
`

const StyledNavLink = styled(Link)`
    text-decoration: none;
    font-size: 80%;
    color: black;
    padding: 15px;
    border-radius: 0;
    border: none;
    background-color: white; 

    ${props => props.selected &&
        css`
            border-bottom: solid #5ECE7B 2px;
            color: #5ECE7B;  
        `
    }

    &:hover
    {
        background-color: #ddd;
    }
`

const StyledNavModalButton = styled.button`
    border: none;
    background-color: white;
    font-weight: 500;
    margin-right: 1%;
    
    -webkit-user-select: none; /* Safari */
    -ms-user-select: none; /* IE 10 and IE 11 */
    user-select: none; /* Standard syntax */
`
 
export default Navbar;