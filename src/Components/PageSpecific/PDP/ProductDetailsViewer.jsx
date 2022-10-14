import React, { Component } from 'react';
import styled from 'styled-components';
import { StyledBrandHeader } from '../../../SharedStyles';
import GroupAttributeViewer from '../../Shared/GroupAttributeViewer';
import PriceViewer from '../../Shared/PriceViewer';
import GlobalContext from '../../State Management/GlobalContext';

class ProductDetailsViewer extends Component {

    static contextType = GlobalContext;

    render() { 

        const {name, brand, inStock, description, attributes, prices} = this.props.productData;

        return (
            <div style={{paddingLeft: "2em", paddingRight: "2em"}}>
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
        );
    }
}

const StyledAddToCartButton = styled.button`
    background-color: ${({inStock})=>inStock?"limegreen":"grey"};
    margin: 0px;
    padding: 15px;
    width: 100%;
    border: none;
    color: white;
    font-weight: bold;
`
 
export default ProductDetailsViewer;