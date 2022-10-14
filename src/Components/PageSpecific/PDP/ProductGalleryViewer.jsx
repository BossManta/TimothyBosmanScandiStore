import React, {Component} from "react";
import styled from "styled-components";
import SquareImage from "../../Shared/SquareImage";


class ProductGalleryViewer extends Component {
  state = { 
    selectedImageIndex: 0
  }
  
  handleSmallImageClick = (selectedImageIndex) => 
  {
    this.setState({selectedImageIndex});
  }
  
  render() { 

    const images = this.props.images?this.props.images:[];

    return (
      <StyledProductGalleryViewer>
          {/* Renders smaller preview images */}
          <StyledImageSelectorContainer>
            {images.map((g,i)=>(
              <div key={i} onClick={() => this.handleSmallImageClick(i)}>
                <SquareImage  img={g}
                              selected={i===this.state.selectedImageIndex} 
                              inStock={true}/>
              </div>
            ))}          
          </StyledImageSelectorContainer>

          {/* Renders main image */}
          <StyledTestImageContainer>
            <StyledTestImage src={images&&images[this.state.selectedImageIndex]}/>
          </StyledTestImageContainer>
      </StyledProductGalleryViewer>
    );
  }
}

const StyledProductGalleryViewer = styled.div`
   display: flex;
   padding-left: 2em;
   padding-right: 2em;
   width: calc(100% - 4em);
   height: 100%;
`

const StyledImageSelectorContainer = styled.div`
  width:min(15%,5em);
  overflow-y: auto;
  overflow-x: hidden;

   //Make the scroll bar a little thinner
  scrollbar-width: thin;  
  ::-webkit-scrollbar {
      width: 0.6em;
  }
  ::-webkit-scrollbar-track {
      background: whitesmoke;
  }
  ::-webkit-scrollbar-thumb {
      background-color: lightgray;
  }
`

const StyledTestImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: top;
    position: absolute;
    right: 0;
    top: 0;
`

const StyledTestImageContainer = styled.div`
    display: inline-block;
    position: relative;
    height: 100%;
    width: 100%;
`
 
export default ProductGalleryViewer;