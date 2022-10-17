import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import GroupAttributeViewer from './GroupAttributeViewer';
import { SharedCssFlexCentered, StyledBrandHeader } from '../../SharedStyles';
import GlobalContext from '../State Management/GlobalContext';
import AddToCartButton from '../PageSpecific/PDP/AddToCartButton';

class AttributeSelectionModal extends Component {
    state = {  } 

    static contextType = GlobalContext;

    componentDidMount()
    {
        this.context.resetPendingItem();

        const {name, gallery, brand, prices, attributes} = this.props.product;
        this.context.setPendingItemDetails({name, brand, gallery, prices, attributes})
    }
    
    preventEventPassThrough = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

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
                    <StyledBrandHeader style={{fontSize: "200%"}}>
                        Select Attributes
                    </StyledBrandHeader>
                    <div>
                        <GroupAttributeViewer attributes={attributes}/>
                    </div>
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