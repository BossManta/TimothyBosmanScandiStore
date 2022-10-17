import React, {Component} from 'react';
import styled from 'styled-components';

//Displays an image as a square (fits to 100% width)
class SquareImage extends Component {
    state = {} 
    
    render() { 
        return (
            <StyledSquareImage selected={this.props.selected} src={this.props.img} alt={this.props.alt} />
        );
    }
}

const StyledSquareImage = styled.img`
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border: 1px ${({selected}) => selected && 'dotted'};
`
 
export default SquareImage;
