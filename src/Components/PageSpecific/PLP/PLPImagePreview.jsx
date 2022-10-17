import React, { Component } from 'react';
import styled from 'styled-components';
import { SharedCssFlexCentered } from '../../../SharedStyles';
import SquareImage from '../../Shared/SquareImage';

class PLPImagePreview extends Component {
    render() { 
        return (
            <div style={{position:"relative"}}>
                <SquareImage img={this.props.img} alt={this.props.alt}/>

                {!this.props.inStock && <StyledOutOfStockOverlay>OUT OF STOCK</StyledOutOfStockOverlay>}
                
            </div>
        );
    }
}

const StyledOutOfStockOverlay = styled.h2`
    ${SharedCssFlexCentered}
    
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    margin:0;
    background-color: white;
    color: lightgray;
    opacity: 0.6;
`
 
export default PLPImagePreview;