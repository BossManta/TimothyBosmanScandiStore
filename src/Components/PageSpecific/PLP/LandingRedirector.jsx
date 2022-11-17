import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { SharedCssFlexCentered } from '../../GlobalStyling/SharedStyles';
import GlobalContext from '../../State Management/GlobalContext';

class LandingRedirector extends Component {

    static contextType = GlobalContext;

    render() { 

        if (this.context.selectedCategory)
        {
            return (<Navigate to={`/category/${this.context.selectedCategory}`}/>);
        }
        else
        {
            return (
                <StyledLoading>
                    <h1>Loading.. ⏳</h1>
                </StyledLoading>
            )
        }
    }
}

const StyledLoading = styled.div`
    ${SharedCssFlexCentered}
    flex-direction: column;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`
 
export default LandingRedirector;