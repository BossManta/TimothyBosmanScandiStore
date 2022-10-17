import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledBrandHeader } from '../../../SharedStyles';
import GroupAttributeViewer from '../../Shared/GroupAttributeViewer';
import PriceViewer from '../../Shared/PriceViewer';
import GlobalContext from '../../State Management/GlobalContext';
import AddToCartButton from './AddToCartButton';

class ProductDetailsViewer extends Component {

    static contextType = GlobalContext;

    render() { 

        const {name, brand, inStock, description, attributes, prices} = this.props.productData;

        return (
            <StyledProductDetailsViewer>
                <h1>{brand}</h1>
                <h1 style={{fontWeight:'normal'}}>{name}</h1>
                
                <GroupAttributeViewer attributes={attributes}/>
                {prices?
                    <StyledBrandHeader><PriceViewer prices={prices}/></StyledBrandHeader>
                :<StyledBrandHeader>Loading...</StyledBrandHeader>}

                <StyledAddToCartButton inStock={inStock}/>

                <StyledDescription dangerouslySetInnerHTML={{__html: description}}/>
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

const StyledDescription = styled.div`
    margin-top: 2em;
`

 
export default ProductDetailsViewer;