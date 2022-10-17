import React, { Component } from 'react';
import { SharedStyledButton } from '../../../SharedStyles';
import GlobalContext from '../../State Management/GlobalContext';

class AddToCartButton extends Component {

    static contextType = GlobalContext;

    render() { 

        const attributesSelected = this.context.checkIfAttributesSelected(this.context.pendingItem);

        return (
            <SharedStyledButton   className={this.props.className}
                            disabled={!this.props.inStock || !attributesSelected}
                            onClick={()=>this.context.addPendingItemToCart()}>

                {this.props.inStock?(attributesSelected?"ADD TO CART":"ASSIGN ATTRIBUTES"):"OUT OF STOCK"}
            </SharedStyledButton>
        );
    }
}
 
export default AddToCartButton;