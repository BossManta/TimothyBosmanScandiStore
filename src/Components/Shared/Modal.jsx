import React, {Component} from 'react';
import styled from 'styled-components';
import { SharedCssFlexCentered } from '../GlobalStyling/SharedStyles';

//Reusable modal
class Modal extends Component {
    state = {  }
    
    handleClick = (e) => {
        e.preventDefault();
        this.props.setIsOpen(false);
    }

    render() {
        return (
            <StyledModalBackground darkness={this.props.darkness} onClick={(e)=>this.handleClick(e)}>
                {this.props.children}
            </StyledModalBackground>
        );
    }
}


const StyledModalBackground = styled.div`
    ${SharedCssFlexCentered}

    background-color: rgba(0, 0, 0, ${p=>p.darkness});
    width: 100vw;
    height: 100vh;
    z-index: 20000000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: fixed;
`

export default Modal;