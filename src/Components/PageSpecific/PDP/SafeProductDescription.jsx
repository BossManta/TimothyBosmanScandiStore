import React, { Component } from 'react';
import styled from 'styled-components';

class SafeProductDescription extends Component {

    render() { 
        return (
            <StyledDiscription>
                Disc
            </StyledDiscription>
        )
    }
}

const StyledDiscription = styled.div`
    margin-top: 2em;
`
 
export default SafeProductDescription;