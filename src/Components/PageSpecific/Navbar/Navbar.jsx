import React, { Component } from 'react';
import styled from 'styled-components';

import CategorySelectionButtons from './CategorySelectionButtons';
import NavModalButtons from './NavModalButtons';

//Navbar for the whole website
class Navbar extends Component {

    render() 
    { 
        return (
            <StyledNavbar>

                {/* Category selection buttons */}
                <CategorySelectionButtons />


                {/* Green logo */}
                <StyledLogo>
                    <img src={require('../../../Images/GreenLogo.png')} alt="Green Logo"/>
                </StyledLogo>


                {/* Modal buttons (Cart Modal, Currency Selector Modal)  */}
                <StyledNavModalButtonsContainer>
                    <NavModalButtons />
                </StyledNavModalButtonsContainer>

            </StyledNavbar>
        );
    }
}

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

const StyledNavModalButtonsContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content: right
`
 
export default Navbar;