import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import GlobalContext from '../../State Management/GlobalContext';
import NavModalButtons from './NavModalButtons';

class Navbar extends Component {

    static contextType = GlobalContext;

    handleCategorySelection = (categoryName) => 
    {
        this.context.setSelectedCategory(categoryName)
    }

    render() 
    { 
        return (
            <StyledNavbar>
                <nav style={{paddingLeft:20, width:"30%", display:"flex"}}>
                    {this.context.categoryList.map(c=>(
                        <StyledNavLink    to={"/"}
                                            key={c.id}
                                            selected={this.context.selectedCategory===c.name}
                                            onClick={()=>this.handleCategorySelection(c.name)}>

                            {c.name.toUpperCase()}
                        </StyledNavLink>
                    ))}
                </nav>


                <StyledLogo>
                    <img src={require('../../../Images/GreenLogo.png')} alt="Green Logo"/>
                </StyledLogo>


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

const StyledNavLink = styled(Link)`
    text-decoration: none;
    font-size: 80%;
    color: black;
    padding: 1.2em;
    border-radius: 0;
    border: none;
    background-color: white; 

    ${props => props.selected &&
        css`
            border-bottom: solid var(--mainGreen) 2px;
            color: var(--mainGreen);  
        `
    }

    &:hover
    {
        background-color: #ddd;
    }
`

const StyledNavModalButtonsContainer = styled.div`
    width: 30%;
    display: flex;
    justify-content: right
`
 
export default Navbar;