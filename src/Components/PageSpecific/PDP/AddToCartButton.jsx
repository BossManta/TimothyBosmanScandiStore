import React, { Component } from 'react';
import { SharedStyledButton } from '../../GlobalStyling/SharedStyles';
import GlobalContext from '../../State Management/GlobalContext';


// Button to add pending item to cart if product is in stock and all attributes are selected
class AddToCartButton extends Component {

    static contextType = GlobalContext;

    render() { 

        const attributesSelected = this.context.checkIfAttributesSelected(this.context.pendingItem);

        return (
            <SharedStyledButton className={this.props.className}
                                disabled={!this.props.inStock || !attributesSelected}
                                onClick={()=>this.context.addPendingItemToCart()}>

                {this.props.inStock?(attributesSelected?"ADD TO CART":"ASSIGN ATTRIBUTES"):"OUT OF STOCK"}
            </SharedStyledButton>
        );
    }
}
 
export default AddToCartButton;