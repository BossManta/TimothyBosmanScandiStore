import React, { Component } from 'react';
import styled from 'styled-components';
import { SharedCssFlexCentered, SharedStyledGalleryImage } from '../../GlobalStyling/SharedStyles';

//Displays image gallery for products in cart
class CartImageGallery extends Component {
    state = { 
        selectedImageIndex: 0
    }

    nextImage = () => {
        const nextIndex = (this.state.selectedImageIndex+1)%this.props.gallery.length;
        this.setState({selectedImageIndex: nextIndex});
    }

    previousImage = () => {
        const nextIndex = (this.state.selectedImageIndex-1)<0?this.props.gallery.length-1:this.state.selectedImageIndex-1;
        this.setState({selectedImageIndex: nextIndex});
    }
    
    render() { 
        return (
            <StyledGalleryImageContainer>

                <SharedStyledGalleryImage src={this.props.gallery[this.state.selectedImageIndex]} alt="Cart Item Preview"/>
                
                {/* Arrows to change image */}
                {this.props.showArrows && this.props.gallery.length>1 &&
                    <StyledImageArrowContainer>
                    <StyledImageArrowButton onClick={this.previousImage}>
                        <StyledGalleryArrowIcon src={require("../../../Images/GalleryArrow.png")} flipped/>
                    </StyledImageArrowButton>
                    <StyledImageArrowButton onClick={this.nextImage}>
                        <StyledGalleryArrowIcon src={require("../../../Images/GalleryArrow.png")}/>
                    </StyledImageArrowButton>
                </StyledImageArrowContainer>}

            </StyledGalleryImageContainer>
        );
    }
}

const StyledGalleryArrowIcon = styled.img`
    -webkit-transform: scaleX(${p=>(p.flipped?-1:1)});
    transform: scaleX(${p=>(p.flipped?-1:1)});
    height: 1em;
`

const StyledImageArrowButton = styled.button`
    ${SharedCssFlexCentered}

    border: none;
    background-color: black;
    color: white;
    width: 1.7em;
    height: 1.7em;
    opacity: 0.7;
    margin-right: 0.5em;
    font-weight: bold;

    :hover{
        opacity:0.4;
    }
`

const StyledImageArrowContainer = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
`

const StyledGalleryImageContainer = styled.div`
    width: min(90%,20em);
    display: inline-block;
    position: relative;
`
 
export default CartImageGallery;