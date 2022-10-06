import React, {Component} from 'react';
import { Query, client, Field } from '@tilework/opus';
import styled from 'styled-components';

import ProductPreview from './ProductPreview';
import GlobalContext from './GlobalContext';

class PLP extends Component {

  state = {
      selectedCategory: "",
      products: []
  }

  static contextType = GlobalContext;

  capatalizeFirst = (text) =>
  {
      const first = text.charAt(0);
      const rest = text.slice(1);
      return first.toUpperCase()+rest;
  }

  fetchProducts = (category) =>
  {
    const categoryNameQuery = new Query("category", false)
                                  .addArgument("input", "CategoryInput", {title:category})
                                  .addField(new Field("products", true)
                                    .addFieldList(["id", "name", "inStock", "gallery", "brand"])
                                    .addFieldList([

                                      (new Field("prices")
                                      .addField(new Field("currency")
                                        .addFieldList(["label","symbol"]))
                                      .addField("amount")),

                                      (new Field("attributes")
                                            .addField(new Field("items")
                                            .addFieldList(["displayValue","value","id"]))
                                        .addFieldList(["name","type"]))
                                        
                                    ]));
      
    client.post(categoryNameQuery).then((rawRequest)=>{
      this.setState({category ,products: rawRequest.category.products})
    });
  }

  render() {

      //Detect category change. Updates product list on change.
      if (this.context.selectedCategory!==this.state.category)
      {
          this.fetchProducts(this.context.selectedCategory);
      } 

      return (
          <StyledPLP>
              <StyledPLPHeading>
                {this.capatalizeFirst(this.context.selectedCategory)}
              </StyledPLPHeading>
              
              <StyledProductViewerContainer>
                
                  {this.state.products.map(p=>(
                      <ProductPreview key={p.id}
                                      product={p}/>
                  ))}

              </StyledProductViewerContainer>
          </StyledPLP>
      );
  }
}

const StyledPLP = styled.div`
  margin-top: 90px;
  padding: 20;
  margin-left: 5%;
  margin-right: 5%;
`

const StyledPLPHeading = styled.h1`
  text-align: left;
  margin: 50px;
`

const StyledProductViewerContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
  
 export default PLP;