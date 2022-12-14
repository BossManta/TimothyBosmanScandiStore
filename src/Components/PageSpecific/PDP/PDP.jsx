import React, {Component} from 'react';
import { Query, client, Field } from '@tilework/opus';
import styled from 'styled-components';

import ProductGalleryViewer from './ProductGalleryViewer';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import GlobalContext from '../../State Management/GlobalContext';
import ProductDetailsViewer from './ProductDetailsViewer';

//Product Details Page (Page to show all info on product)
class PDPClass extends Component {
    state = { 
        productData: {}
    }
    
    static contextType = GlobalContext;

    async componentDidMount()
    {
        this.context.resetPendingItem();

        //Uses data passed down from PLP if available.
        const productData = this.props.location.state ? this.props.location.state : await this.fetchProductData(this.props.params.id);
        
        //If page doesnt exist go to 404 page
        if (!productData)
        {
            this.props.navigate('*');
            return;
        }
    
        this.setState({productData})
        const {name, gallery, brand, prices, attributes} = productData;
        this.context.setPendingItemDetails({name, brand, gallery, prices, attributes})
    }

    fetchProductData = async (productId) =>
    {
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
        
        console.log("Fetch PDP");
        return (await client.post(productDataQuery)).product;
    }

    render() {        

        const {gallery} = this.state.productData;

        return (
            <StyledPDP>
                
                {/* Product image gallery */}
                <StyledGalleryContainer>
                    <ProductGalleryViewer images={gallery}/>
                </StyledGalleryContainer>
                
                {/* Product details */}
                <StyledDetailsContainer>
                    <ProductDetailsViewer productData={this.state.productData}/>
                </StyledDetailsContainer>

            </StyledPDP>
        );
    }
}
 

//Functional wrapper to allow for hooks (react-router has primarly switched to functional components).
const PDP = (props) => (
    <PDPClass 
        {...props}
        params={useParams()}
        location = {useLocation()}
        navigate = {useNavigate()}
    />
);


const StyledPDP = styled.div`
    display: flex;
    @media screen and (max-width: 700px) {
        flex-direction: column;
    }
`

const StyledGalleryContainer = styled.div`
    width: 60%;
    height: min(80vh,80vw);

    @media screen and (max-width: 700px) {
        width: 100%;
    }
`

const StyledDetailsContainer = styled.div`
    text-align: left;
    width: 30%;

    @media screen and (max-width: 700px) {
        width: 100%;
    }
`

export default PDP;