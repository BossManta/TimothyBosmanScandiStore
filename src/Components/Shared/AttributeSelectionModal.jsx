import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import GroupAttributeViewer from './GroupAttributeViewer';
import { SharedCssFlexCentered } from '../GlobalStyling/SharedStyles';
import GlobalContext from '../State Management/GlobalContext';
import AddToCartButton from '../PageSpecific/PDP/AddToCartButton';

//A modal to allow for attributes to be selected when pressing the quick add to cart button
class AttributeSelectionModal extends Component {
    state = {  } 

    static contextType = GlobalContext;

    // Sets cart pending item
    componentDidMount()
    {
        this.context.resetPendingItem();

        const {name, gallery, brand, prices, attributes} = this.props.product;
        this.context.setPendingItemDetails({name, brand, gallery, prices, attributes})
    }
    
    //Stops modal from closing
    preventEventPassThrough = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    // Adds item to cart then closes modal
    handleSubmit = () => {
        if (this.context.addPendingItemToCart())
        {
            this.props.setIsOpen(false);
        }
    }


    render() { 

        const {setIsOpen, attributes} = this.props;


        return (
            <Modal darkness={0.2} setIsOpen={setIsOpen}>
                <StyledAttributeModalContainer onClick={(e)=>this.preventEventPassThrough(e)}>

                    <h1>Select Attributes</h1>

                    {/* Renders attributes for selection */}
                    <GroupAttributeViewer attributes={attributes}/>

                    {/* Add product to cart if attributes selected */}
                    <StyledAddToCartButton inStock={true}/>

                </StyledAttributeModalContainer>
            </Modal>
        );
    }
}

const StyledAttributeModalContainer = styled.div`
    ${SharedCssFlexCentered}

    background-color: white;
    padding: 3em;
    flex-direction: column;
`

const StyledAddToCartButton = styled(AddToCartButton)`
    width: 90%;
    height: 3em;
    margin-top: 3em;
`

export default AttributeSelectionModal;