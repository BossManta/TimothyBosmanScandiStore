import React, {Component} from "react";
import styled from "styled-components";
import SquareImage from "./SquareImage";


class ProductImageViewer extends Component {
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
      <StyledProductImageViewer>

          {/* Renders smaller preview images */}
          <div style={{width:"15%"}}>
            {(images?images:[]).map((g,i)=>(
              <div key={i} onClick={() => this.handleSmallImageClick(i)}>
                <SquareImage  style={{marginBottom:"15px", marginRight:"15px"}}
                              img={g}
                              selected={i===this.state.selectedImageIndex} 
                              inStock={true}/>
              </div>
            ))}          
          </div>

          {/* Renders main image */}
          <StyledMainImageContainer style={{width: "85%"}}>
              <SquareImage img={images&&images[this.state.selectedImageIndex]} inStock={true}/>
          </StyledMainImageContainer>

      </StyledProductImageViewer>
    );
  }
}

const StyledProductImageViewer = styled.div`
  display: flex;
  width: 60%;
  margin: 30px;
  min-width:600px;
`
const StyledMainImageContainer = styled.div`
  margin-left: 150px;
  margin-right: 150px;
`
 
export default ProductImageViewer;