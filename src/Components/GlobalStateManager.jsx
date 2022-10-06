import React, {Component} from 'react';
import { client, Query } from '@tilework/opus';

import { GCProvider } from './GlobalContext';

class GlobalStateManager extends Component {
    
    constructor(props)
    {
        super(props)


        //Global functions
        this.setSelectedCurrency = (selectedCurrency) => {
            this.setState({selectedCurrency});
        }

        this.setItemAttributeSelection = (attributeName, attributeValue) => {
            const newItem = {...this.state.pendingItem};
            newItem.attributeSelections[attributeName]=attributeValue;
            this.setState({pendingItem: newItem});
        }

        this.resetPendingItem = () => {
            this.setState({pendingItem: {details: {}, attributeSelections:{}, count: 1}});
        }

        this.setPendingItemDetails = (details) => {
            this.setState(prevState => (
                {
                    pendingItem: { details,
                                attributeSelections: {...prevState.pendingItem.attributeSelections},
                                count: prevState.pendingItem.count}
                }
            ));
        }

        this.setCartItemCount = (cartIndex, count) => {
            
            this.setState(prevState => {
                    const newState = JSON.parse(JSON.stringify(prevState));
                    newState.cart[cartIndex].count=count;

                    return ({...newState});              
                }
            );
        }

        this.addPendingItemToCart = () => {
            this.addItemToCart(this.state.pendingItem);
        }

        this.addItemToCart = (item) => {
            const newCart = [...this.state.cart, JSON.parse(JSON.stringify(item))];
            this.setState({cart: newCart});
        }

        this.setSelectedCategory = (selectedCategory) => {
            this.setState({selectedCategory})
        }



        //Global state
        this.state = {
            currencyList: [],
            selectedCurrency: {label: "USD", symbol:"$"},
            setSelectedCurrency: this.setSelectedCurrency,

            categoryList: [],
            selectedCategory: "",
            setSelectedCategory: this.setSelectedCategory,

            cart: [],
            pendingItem: {details:{}, attributeSelections: {}, count: 0},
            setItemAttributeSelection: this.setItemAttributeSelection,
            resetPendingItem: this.resetPendingItem,     
            setPendingItemDetails: this.setPendingItemDetails,
            addPendingItemToCart: this.addPendingItemToCart,   
            addItemToCart: this.addItemToCart,   
            
            setCartItemCount: this.setCartItemCount,
        }
    }

    componentDidMount() {

        //Fetch navbar categories
        const categoryNameQuery = new Query("categories", true).addField("name");
        client.post(categoryNameQuery).then((rawCategoryRequest)=>{      
            const newCategories = rawCategoryRequest.categories.map((c,i)=>
            ({
                name: c.name,
                id: i+1
            }));
            
            const defaultSelected = newCategories[0]?newCategories[0].name:"";

            this.setState({selectedCategory: defaultSelected, categoryList: newCategories});     
        });


        //Fetch list of currencies.
        const currencyQuery = new Query("currencies", true).addFieldList(["label","symbol"]);
        client.post(currencyQuery).then((rawCurrencies)=>{      
            const currencyList = rawCurrencies.currencies.map(c=>({label: c.label, symbol: c.symbol}));
            const selectedCurrency = currencyList[0]?currencyList[0]:{};
            this.setState({currencyList, selectedCurrency});
        });
    }


    render() { 
        return (
            <GCProvider value={this.state}>
                {this.props.children}
            </GCProvider>
        );
    }
}
 
export default GlobalStateManager;