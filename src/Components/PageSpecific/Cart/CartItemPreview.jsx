import React, {Component} from 'react';
import styled from 'styled-components';
import { StyledBrandHeader, StyledNameHeader } from '../../../SharedStyles';

import GlobalContext from '../../State Management/GlobalContext';
import GroupAttributeViewer from '../../Shared/GroupAttributeViewer';
import PriceViewer from '../../Shared/PriceViewer';
import CartImageGallery from './CartImageGallery';

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
            <StyledCartItemPreview>

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

                <div style={{width:"40%", display:"flex", justifyContent:"right"}}>
                    <div style={{display:'flex', flexDirection: "column", justifyContent: "space-between", marginLeft: "1%", marginRight: "1%"}}>
                        <StyledCountButton onClick={this.incrementItemCount}>+</StyledCountButton>
                        <p style={{textAlign: "center"}}>{count}</p>
                        <StyledCountButton onClick={this.decrementItemCount}>-</StyledCountButton>
                    </div>
                    <CartImageGallery gallery={gallery}/>
                </div>

            </StyledCartItemPreview>
        );
    }
}



const StyledCartItemPreview = styled.div`
    margin-bottom: 1em;
    padding-bottom: 1em;
    border-bottom: lightgray solid 1px;
    display: flex;
    justify-content: space-between;
`

const StyledCountButton = styled.button`
    border: 1px solid gray;
    padding: 0.5em;
    aspect-ratio: 1/1;
    background-color: white;
    margin: auto;
`

export default CartItemPreview;