import React, {Component} from 'react';
import styled from 'styled-components';
import { SharedCssFlexCentered, StyledBrandHeader, StyledNameHeader } from '../../../SharedStyles';

import GroupAttributeViewer from '../../Shared/GroupAttributeViewer';
import PriceViewer from '../../Shared/PriceViewer';
import CartImageGallery from './CartImageGallery';
import GlobalContext from '../../State Management/GlobalContext';

class CartItemPreview extends Component {
    state = {  } 

    static contextType = GlobalContext;

    incrementItemCount = () =>
    {
        const newCountValue = this.context.cart[this.props.index].count+1;
        this.context.setCartItemCount(this.props.index,newCountValue);
    }

    decrementItemCount = () =>
    {
        const newCountValue = Math.max(0,this.context.cart[this.props.index].count-1);
        this.context.setCartItemCount(this.props.index,newCountValue);
    }

    render() { 

        const {name, brand, prices, attributes, gallery} = this.props.item.details;
        const {attributeSelections, count} = this.props.item;

        return (
            <StyledCartItemPreview className={this.props.className}>

                <div style={{width:"60%"}}>
                    <StyledBrandHeader>{brand}</StyledBrandHeader>
                    <StyledNameHeader>{name}</StyledNameHeader>
                    <StyledNameHeader>
                        <PriceViewer prices={prices}/>
                    </StyledNameHeader>


                    <div style={{fontSize: "80%"}}>
                        <GroupAttributeViewer attributes={attributes} staticSelection={attributeSelections}/>
                    </div>
                </div>

                <StyledGalleryContainer>
                    
                    <StyledCountButtonContainer>
                        <StyledCountButton onClick={this.incrementItemCount}>+</StyledCountButton>
                        <p style={{textAlign: "center"}}>{count}</p>
                        <StyledCountButton onClick={this.decrementItemCount}>-</StyledCountButton>
                    </StyledCountButtonContainer>

                    <CartImageGallery showArrows={this.props.showArrows} gallery={gallery}/>
                </StyledGalleryContainer>

            </StyledCartItemPreview>
        );
    }
}



const StyledCartItemPreview = styled.div`
    display: flex;
    justify-content: space-between;
`

const StyledGalleryContainer = styled.div`
    width: min(60%, 12em);
    display: flex;
    justify-content: right;
`

const StyledCountButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 1%;
    margin-right: 1%;
`

const StyledCountButton = styled.button`
    ${SharedCssFlexCentered}

    border: 1px solid gray;
    width: 1em;
    height: 1em;
    background-color: white;
    color: gray;

    font-weight: lighter;
    font-size: 1.5em;
`

export default CartItemPreview;