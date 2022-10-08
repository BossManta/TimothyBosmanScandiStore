import React, { Component } from 'react';
import styled from 'styled-components';

import Modal from './Modal';
import GroupAttributeViewer from './GroupAttributeViewer';
import { StyledBrandHeader } from '../../SharedStyles';
import { StyledButton } from '../../SharedStyles';
import GlobalContext from '../State Management/GlobalContext';

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
        this.context.addPendingItemToCart();
        this.props.setIsOpen(false);
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
                    <StyledButton onClick={this.handleSubmit}>Submit</StyledButton>
                </StyledAttributeModalContainer>
            </Modal>
        );
    }
}

const StyledAttributeModalContainer = styled.div`
    background-color: white;
    padding: 3em;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export default AttributeSelectionModal;