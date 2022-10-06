import React, {Component} from 'react';
// import { useParams } from 'react-router-dom';
import { Query, client, Field } from '@tilework/opus';
import styled from 'styled-components';

import GroupAttributeViewer from './GroupAttributeViewer';
import ProductImageViewer from './ProductImageViewer';
import PriceViewer from './PriceViewer';
import GlobalContext from './GlobalContext';
import { StyledBrandHeader } from '../SharedStyles';
import { useLocation, useParams } from 'react-router-dom';

class PDPClass extends Component {
    state = { 
        productData: {}
    }
    
    static contextType = GlobalContext;

    async componentDidMount()
    {
        this.context.resetPendingItem();

        const productData = this.props.location.state ? this.props.location.state : await this.fetchProductData(this.props.params.id);
    
        this.setState({productData})
        const {name, gallery, brand, prices, attributes} = productData;
        this.context.setPendingItemDetails({name, brand, gallery, prices, attributes})
    }

    fetchProductData = async (productId) =>
    {
        console.log("Fetch!");
        const productDataQuery = new Query("product", false)
                                    .addArgument("id", "String!", productId)
                                    .addFieldList(["name", "inStock", "gallery", "brand", "description"])
                                    .addFieldList([

                                        (new Field("prices")
                                            .addField(new Field("currency")
                                            .addFieldList(["label","symbol"]))
                                        .addField("amount")),

                                        (new Field("attributes")
                                            .addField(new Field("items")
                                            .addFieldList(["displayValue","value","id"]))
                                        .addFieldList(["name","type"]))
                                    ]);
        
        return (await client.post(productDataQuery)).product;
    }

    render() { 
        const {name, gallery, brand, inStock, description, attributes, prices} = this.state.productData;
        return (
            <StyledPDP>
                <ProductImageViewer images={gallery}/>
                
                <div style={{textAlign:"left", width:"30%"}}>
                    <h1>{brand}</h1>
                    <h1 style={{fontWeight:'normal'}}>{name}</h1>
                    
                    <GroupAttributeViewer attributes={attributes}/>
                    {prices?
                        <StyledBrandHeader><PriceViewer prices={prices}/></StyledBrandHeader>
                    :<StyledBrandHeader>Loading...</StyledBrandHeader>}

                    <StyledAddToCartButton  inStock={inStock}
                                            disabled={!inStock}
                                            onClick={()=>this.context.addPendingItemToCart()}>
                        {inStock?"ADD TO CART":"OUT OF STOCK"}
                    </StyledAddToCartButton>

                    <div className="content" dangerouslySetInnerHTML={{__html: description}}></div>
                </div>
            </StyledPDP>
        );
    }
}
 

//Functional wrapper to allow for hooks.
//The useParams() hook is needed to get product id.
const PDP = (props) => (
    <PDPClass 
        {...props}
        params={useParams()}
        location = {useLocation()}
    />
);


const StyledPDP = styled.div`
    display: flex;
    margin-top: 100px;
    flex-wrap: wrap;
`

const StyledAddToCartButton = styled.button`
    background-color: ${({inStock})=>inStock?"limegreen":"grey"};
    margin: 0px;
    padding: 15px;
    width: 100%;
    border: none;
    color: white;
    font-weight: bold;
`

export default PDP;