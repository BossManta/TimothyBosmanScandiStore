import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import GlobalContext from '../../State Management/GlobalContext';


//Display category selection buttons in navbar
class CategorySelectionButtons extends Component {
    
    static contextType = GlobalContext;

    render() { 
        return (
            <StyledCategorySelectionContainer>
                {this.context.categoryList.map(c=>(
                    <StyledNavLink    to={`/category/${c.name}`}
                                        key={c.id}
                                        selected={this.context.selectedCategory===c.name}>

                        {c.name.toUpperCase()}
                    </StyledNavLink>
                ))}
            </StyledCategorySelectionContainer>
        );
    }
}


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

const StyledCategorySelectionContainer = styled.div`
    width: 30%;
    display: flex;
`
 
export default CategorySelectionButtons;