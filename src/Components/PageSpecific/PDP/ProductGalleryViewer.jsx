import React, {Component} from "react";
import styled from "styled-components";
import { SharedStyledGalleryImage } from "../../GlobalStyling/SharedStyles";
import SquareImage from "../../Shared/SquareImage";


//Displays all product images
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
            <StyledGalleryImage src={images&&images[this.state.selectedImageIndex]}/>
          </StyledGalleryImageContainer>

      </StyledProductGalleryViewer>
    );
  }
}

const StyledGalleryImage = styled(SharedStyledGalleryImage)`
  object-position: top;
`

const StyledProductGalleryViewer = styled.div`
   display: flex;
   padding-left: 2em;
   padding-right: 2em;
   width: calc(100% - 4em);
   height: 100%;
`

const StyledImageSelectorContainer = styled.div`
  width:min(15%,5em);
  padding: 0.2em;
  overflow-y: auto;
  overflow-x: hidden;
  
   /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`

const StyledGalleryImageContainer = styled.div`
    display: inline-block;
    position: relative;
    height: 100%;
    width: 100%;
`
 
export default ProductGalleryViewer;