import React, {Component} from 'react';
import { client, Query } from '@tilework/opus';

import { MCProvider } from './MiscContext';
import { useNavigate } from 'react-router-dom';

//A globally available context to handle miscellaneous state
class MiscStateManagerClass extends Component {
    
    setState(state)
    {
        super.setState(state);
    }

    ////////////////////////////////
    //Globally available Functions//
    ////////////////////////////////

    setSelectedCurrency = (selectedCurrency) => {
        window.localStorage.setItem('selectedCurrency', JSON.stringify(selectedCurrency));
        this.setState({selectedCurrency});
    }

    setSelectedCategory = (selectedCategory) => {
        this.setState({selectedCategory})
    }

    /////////////////////////////////////
    /////////////////////////////////////

    constructor(props)
    {
        super(props)

        this.state = {
            currencyList: [],
            selectedCurrency: {},
            setSelectedCurrency: this.setSelectedCurrency,

            categoryList: [],
            selectedCategory: "",
            setSelectedCategory: this.setSelectedCategory,
        }
    }

    
    componentDidMount() {
        //Fetch navbar categories
        const categoryNameQuery = new Query("categories", true).addField("name");
        console.log("Fetch Categories");
        client.post(categoryNameQuery).then((rawCategoryRequest)=>{      
            const newCategories = rawCategoryRequest.categories.map((c,i)=>
            ({
                name: c.name,
                id: i+1
            }));
            
            const defaultSelected = newCategories[0]?newCategories[0].name:"";

            this.props.navigate(`category/${defaultSelected}`);
            this.setState({selectedCategory: defaultSelected, categoryList: newCategories});     
        });


        //Fetch list of currencies.
        const currencyQuery = new Query("currencies", true).addFieldList(["label","symbol"]);
        console.log("Fetch currencies");
        client.post(currencyQuery).then((rawCurrencies)=>{      
            const currencyList = rawCurrencies.currencies.map(c=>({label: c.label, symbol: c.symbol}));

            //Load from localStorage or Set default selected currency
            const oldSelectedCurrency = JSON.parse(window.localStorage.getItem('selectedCurrency'));
            const defaultCurrency = currencyList[0]?currencyList[0]:{};
            const selectedCurrency = oldSelectedCurrency || defaultCurrency;

            
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

//Functinal wrapper to allow for navigation
const MiscStateManager = (props) => (
    <MiscStateManagerClass 
        {...props}
        navigate = {useNavigate()}
    />
  );
 
export default MiscStateManager;