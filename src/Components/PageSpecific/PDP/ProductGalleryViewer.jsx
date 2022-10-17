import React, {Component} from "react";
import styled from "styled-components";
import { SharedStyledGalleryImage } from "../../../SharedStyles";
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
          <StyledGalleryImageContainer>
            <SharedStyledGalleryImage src={images&&images[this.state.selectedImageIndex]}/>
          </StyledGalleryImageContainer>
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

const StyledGalleryImageContainer = styled.div`
    display: inline-block;
    position: relative;
    height: 100%;
    width: 100%;
`
 
export default ProductGalleryViewer;