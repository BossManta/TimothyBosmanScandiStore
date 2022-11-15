import React, { Component } from 'react';
import styled from 'styled-components';
import { SharedStyledH3 } from '../../GlobalStyling/SharedStyles';
import GroupAttributeViewer from '../../Shared/GroupAttributeViewer';
import PriceViewer from '../../Shared/PriceViewer';
import GlobalContext from '../../State Management/GlobalContext';
import AddToCartButton from './AddToCartButton';
import SafeProductDescription from './SafeProductDescription';

//Displays product details (e.g. Name, Brand, Description etc)
class ProductDetailsViewer extends Component {

    static contextType = GlobalContext;

    render() { 

        const {name, brand, inStock, description, attributes, prices} = this.props.productData;

        return (
            <StyledProductDetailsViewer>

                {/*Product Brand & Name */}
                <h1>{brand}</h1>
                <h1 style={{fontWeight:'normal'}}>{name}</h1>
                
                {/* Product attributes (Can be selected) */}
                <GroupAttributeViewer attributes={attributes}/>
                
                {/* Product Price */}
                <SharedStyledH3 isBold>
                    <PriceViewer prices={prices} mustSelectCurrency/>
                </SharedStyledH3>
                
                {/* Add to cart (if in stock and attributes selected) */}
                <StyledAddToCartButton inStock={inStock}/>

                {/* Product discription (DANGER: XSS is a possibility) */}

                {/* <StyledDescription dangerouslySetInnerHTML={{__html: description}}/> */}
                <SafeProductDescription html={description} />
            </StyledProductDetailsViewer>
        );
    }
}

const StyledProductDetailsViewer = styled.div`
    padding-left: 15%;
    padding-right: 15%;
`

const StyledAddToCartButton = styled(AddToCartButton)`
    padding: 1.5em;
    width: 100%;
`
 
export default ProductDetailsViewer;