import React, {Component} from 'react';
import { Query, client, Field } from '@tilework/opus';
import styled from 'styled-components';

import PLPProductPreview from './PLPProductPreview';
import GlobalContext from '../../State Management/GlobalContext';
import { useNavigate, useParams } from 'react-router-dom';

//Product List Page. Lists all products in selected category.
class PLPClass extends Component {

  state = {
      products: []
  }

  static contextType = GlobalContext;

  async componentDidMount()
  {
    this.loadCategory();
  }

  loadCategory = async () => {
    const rawRequest = await this.fetchProducts(this.props.params.id);
    if (!rawRequest.category)
    {
      this.props.navigate('*');
      return;
    }

    this.setState({products: rawRequest.category.products})
    this.context.setSelectedCategory(this.props.params.id);
  }

  capatalizeFirst = (text) => {
      const first = text.charAt(0);
      const rest = text.slice(1);
      return first.toUpperCase()+rest;
  }

  fetchProducts = async (category) => {

    const categoryNameQuery = new Query("category", false)
                                  .addArgument("input", "CategoryInput", {title:category})
                                  .addField(new Field("products", true)
                                    .addFieldList(["id", "name", "inStock", "gallery", "brand", "description"])
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
      
    console.log("Fetch PLP");
    return (await client.post(categoryNameQuery));
  }

  render() {

    if (this.props.params.id !== this.context.selectedCategory) {
      this.loadCategory();
    }

      return (
          <StyledPLP>

              {/* Category Name heading */}
              <StyledPLPHeading>
                {this.capatalizeFirst(this.props.params.id)}
              </StyledPLPHeading>
              
              {/* List all products in category */}
              <StyledProductViewerContainer>   
                  {this.state.products.map(p=>(
                      <PLPProductPreview key={p.id}
                                      product={p}/>
                  ))}
              </StyledProductViewerContainer>

          </StyledPLP>
      );
  }
}

const PLP = (props) => (
  <PLPClass 
      {...props}
      params={useParams()}
      navigate = {useNavigate()}
  />
);

const StyledPLP = styled.div`
  padding: 20;
  margin-left: 5%;
  margin-right: 5%;
`

const StyledPLPHeading = styled.h1`
  text-align: left;
  margin: 1.5em;
`

const StyledProductViewerContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
`
  
 export default PLP;