import React, {Component} from 'react';
import { client, Query } from '@tilework/opus';

import { MCProvider } from './MiscContext';

class MiscStateManager extends Component {
    
    constructor(props)
    {
        super(props)


        //Global functions
        this.setSelectedCurrency = (selectedCurrency) => {
            this.setState({selectedCurrency});
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
            <MCProvider value={this.state}>
                {this.props.children}
            </MCProvider>
        );
    }
}
 
export default MiscStateManager;