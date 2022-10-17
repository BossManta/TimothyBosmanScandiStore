import React, { Component } from 'react';
import styled from 'styled-components';
import { SharedCssFlexCentered } from '../../GlobalStyling/SharedStyles';

// 404 page (displayed if page or product can't be found)
class Page404 extends Component {
    state = {  } 
    render() { 
        return (
            <Styled404>
                <h1>404 😕</h1>
                <p>Oh no this page does not exist</p>
            </Styled404>
        );
    }
}

const Styled404 = styled.div`
    ${SharedCssFlexCentered}
    flex-direction: column;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`
 
export default Page404;