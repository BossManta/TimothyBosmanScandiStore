import React, { Component } from 'react';
import { CCProvider } from './CartContext';

//A globally available context to manage cart state
class CartStateManager extends Component {
    
    //Update local storage with cart info
    //(Allows for cart info to be saved on browser close or refresh)
    updateLocalStorage(cart)
    {
        window.localStorage.setItem('cart', JSON.stringify(cart));
    }

    ////////////////////////////////
    //Globally available Functions//
    ////////////////////////////////

    //Assigns values to one of the pending items attributes
    setItemAttributeSelection = (attributeName, attributeValue) => {
        const newItem = {...this.state.pendingItem};
        newItem.attributeSelections[attributeName]=attributeValue;
        this.setState({pendingItem: newItem});
    }

    //Returns true if all attributes in pending item is selected
    checkIfAttributesSelected = (item) => {
        return Object.keys(item.details.attributes??{}).length===Object.keys(item.attributeSelections).length;
    }

    //Resets pending item
    resetPendingItem = () => {
        this.setState({pendingItem: {details: {}, attributeSelections:{}, count: 1}});
    }

    //Set the details of pending item (e.g. name, price, gallery etc)
    setPendingItemDetails = (details) => {
        this.setState(prevState => (
            {
                pendingItem: { details,
                            attributeSelections: {...prevState.pendingItem.attributeSelections},
                            count: prevState.pendingItem.count}
            }
        ));
    }

    //Set quantity of product in cart
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

    //Adds pending item to cart
    addPendingItemToCart = () => {
        return this.addItemToCart(this.state.pendingItem);
    }

    //Add given item to cart
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

        //Checks local storage to see if previous cart information is avaliable
        const oldCart = JSON.parse(window.localStorage.getItem('cart'));


        //State of cart
        this.state = {
            //Stores products in cart
            cart: oldCart || [],

            //Store product before it is added to cart (allows for attribute selection)
            pendingItem: {details:{}, attributeSelections: {}, count: 0},

            // Functions
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