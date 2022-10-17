import React, { Component } from 'react';
import { CCProvider } from './CartContext';

class CartStateManager extends Component {
    state = {  } 

    setState(state) {
        super.setState(state);
    }

    updateLocalStorage(cart)
    {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }

    ////////////////////////////////
    //Globally available Functions//
    setItemAttributeSelection = (attributeName, attributeValue) => {
        const newItem = {...this.state.pendingItem};
        newItem.attributeSelections[attributeName]=attributeValue;
        this.setState({pendingItem: newItem});
    }

    checkIfAttributesSelected = (item) => {
        return Object.keys(item.details.attributes??{}).length===Object.keys(item.attributeSelections).length;
    }

    resetPendingItem = () => {
        this.setState({pendingItem: {details: {}, attributeSelections:{}, count: 1}});
    }

    setPendingItemDetails = (details) => {
        this.setState(prevState => (
            {
                pendingItem: { details,
                            attributeSelections: {...prevState.pendingItem.attributeSelections},
                            count: prevState.pendingItem.count}
            }
        ));
    }

    setCartItemCount = (cartIndex, count) => {
        this.setState(prevState => {
                const newState = JSON.parse(JSON.stringify(prevState));
                if (count>0)
                {
                    newState.cart[cartIndex].count=count;
                }
                else //Removes item from cart if count drops below 1
                {
                    newState.cart.splice(cartIndex,1);
                }

                this.updateLocalStorage(newState.cart)
                return ({...newState});              
            }
        );
    }

    addPendingItemToCart = () => {
        return this.addItemToCart(this.state.pendingItem);
    }

    addItemToCart = (item) => {
        const allAttributesSelected = this.checkIfAttributesSelected(item);
        if (allAttributesSelected)
        {
            let cartCopy = JSON.parse(JSON.stringify(this.state.cart));

            // Checks if item already in cart (If already in cart increase count)
            const duplicateItem = cartCopy.find(p => (JSON.stringify([p.details.name, p.attributeSelections])===JSON.stringify([item.details.name, item.attributeSelections])));
            if (duplicateItem)
            {
                duplicateItem.count++;
            }
            else
            {
                cartCopy=[...cartCopy, JSON.parse(JSON.stringify(item))];
            }

            this.updateLocalStorage(cartCopy);
            this.setState({cart: cartCopy});
        }
        return allAttributesSelected;
    }

    /////////////////////////////////////
    /////////////////////////////////////


    constructor(props)
    {
        super(props)

        const oldCart = JSON.parse(window.localStorage.getItem('cart'));
        this.state = {
            cart: oldCart || [],
            pendingItem: {details:{}, attributeSelections: {}, count: 0},
            setItemAttributeSelection: this.setItemAttributeSelection,
            checkIfAttributesSelected: this.checkIfAttributesSelected,
            resetPendingItem: this.resetPendingItem,     
            setPendingItemDetails: this.setPendingItemDetails,
            addPendingItemToCart: this.addPendingItemToCart,   
            addItemToCart: this.addItemToCart,   
            
            setCartItemCount: this.setCartItemCount,
        }
    }


    render() { 
        return (
            <CCProvider value={this.state}>
                {this.props.children}
            </CCProvider>
        );
    }
}
 
export default CartStateManager;