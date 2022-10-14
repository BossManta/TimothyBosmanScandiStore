import React, { Component } from 'react';
import styled from 'styled-components';

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
            <StyledTestImageContainer>
                <StyledTestImage src={this.props.gallery[this.state.selectedImageIndex]} alt="Cart Item Preview"/>
                {this.props.showArrows &&
                    <StyledImageArrowContainer>
                    <StyledImageArrowButton onClick={this.previousImage}>
                        <StyledGalleryArrowIcon src={require("../../../Images/GalleryArrow.png")} flipped/>
                    </StyledImageArrowButton>
                    <StyledImageArrowButton onClick={this.nextImage}>
                        <StyledGalleryArrowIcon src={require("../../../Images/GalleryArrow.png")}/>
                    </StyledImageArrowButton>
                </StyledImageArrowContainer>}
            </StyledTestImageContainer>
        );
    }
}

const StyledGalleryArrowIcon = styled.img`
    -webkit-transform: scaleX(${p=>(p.flipped?-1:1)});
    transform: scaleX(${p=>(p.flipped?-1:1)});
    height: 1em;
`

const StyledImageArrowButton = styled.button`
    display: inline-flex;
    justify-content: center;
    align-items: center;

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

const StyledTestImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: right;
    position: absolute;
    right: 0;
    top: 0;
`

const StyledTestImageContainer = styled.div`
    width: min(90%,20em);
    display: inline-block;
    position: relative;
    /* background-color: red; */
`
 
export default CartImageGallery;