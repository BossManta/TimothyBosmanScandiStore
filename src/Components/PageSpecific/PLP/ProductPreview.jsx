import React, {Component} from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import PriceViewer from '../../Shared/PriceViewer';
import PLPImagePreview from './PLPImagePreview';
import AttributeSelectionModal from '../../Shared/AttributeSelectionModal';
import GlobalContext from '../../State Management/GlobalContext';

class ProductPreview extends Component {

    state = {
        isAttributeModelVisable: false
    }

    static contextType = GlobalContext;

    addToCartIfCan = (e, product) => {
        e.preventDefault();
        if (product.attributes.length===0 && product.inStock)
        {         
            // this.context.resetPendingItem();
            // console.log(this.context.pendingItem);
            // const {name, gallery, brand, prices, attributes} = this.props.product;
            // this.context.setPendingItemDetails({name, brand, gallery, prices, attributes});
            // this.context.addPendingItemToCart();

            const {name, gallery, brand, prices, attributes} = this.props.product;
            this.context.addItemToCart({
                details:{name, gallery, brand, prices, attributes},
                attributeSelections: {},
                count:1
            });
        }
        else
        {
            this.setState({isAttributeModelVisable: true})
        }
    }

    render() {

        const {id, name, gallery, brand, prices, inStock, attributes} = this.props.product;

        return (
            <StyledPoductPreview to={`/product/${id}`} state={this.props.product}>
                <StyledPreviewContainer>
                    <PLPImagePreview img={gallery[0]}  inStock={inStock}>
                        <h1>{inStock?'':'OUT OF STOCK'}</h1>
                    </PLPImagePreview>
                    <p>{`${brand}: ${name}`}</p>
                    <PriceViewer prices={prices}/>
                </StyledPreviewContainer>

                <StyledAddToCartButtonContainer>
                    <StyledAddToCartButton onClick={(e)=>this.addToCartIfCan(e, this.props.product)} disabled={!inStock}>
                        <img style={{height:"40%", filter:" brightness(500%)"}} src={require("../../../Images/Cart.png")} alt="test"/>
                    </StyledAddToCartButton>
                </StyledAddToCartButtonContainer>



                {/* Attribute Selection Modal */}
                {this.state.isAttributeModelVisable &&
                    <AttributeSelectionModal    product={this.props.product}
                                                attributes={attributes}
                                                setIsOpen={()=>this.setState({isAttributeModelVisable: false})}/>
                }
            </StyledPoductPreview>
        );
    }
}

const StyledAddToCartButtonContainer = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;

    &:hover{
        >button{
            opacity: 1;
            width: 15%;
        }
    }
`

const StyledAddToCartButton = styled.button`
    background-color: ${({disabled})=>disabled?"grey":"limegreen"};
    position: absolute;
    right: 9%;
    bottom: 6em;

    border: none;
    border-radius: 100em;

    opacity: 0;
    width: 0em;
    aspect-ratio: 1/1;
    transition: height 150ms, width 150ms, opacity 150ms;
`

const StyledPoductPreview = styled(Link)`
    position: relative;
    width: 33%;
    min-width: 350px;
    text-decoration: none;
    color: black;

    &:hover{
        border-radius: 2px 2px 2px 2px;
        box-shadow: 0px 0px 10px 1px rgb(230, 230, 230);
    }
`

const StyledPreviewContainer = styled.div`
    text-align: left;
    margin: 1em;
    padding: 1em;
`

export default ProductPreview;