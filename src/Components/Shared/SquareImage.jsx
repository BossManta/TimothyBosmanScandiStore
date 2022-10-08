import React, {Component} from 'react';
import styled from 'styled-components';

class SquareImage extends Component {
    state = {} 
    
    render() { 
        return (
            <StyledSquareImage src={this.props.img} alt={this.props.alt} />
        );
    }
}

const StyledSquareImage = styled.img`
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
`
 
export default SquareImage;
