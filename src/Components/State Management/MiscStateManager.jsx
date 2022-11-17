import React, {Component} from 'react';
import { client, Query } from '@tilework/opus';

import { MCProvider } from './MiscContext';
import { useNavigate } from 'react-router-dom';

const cacheVersion = process.env.REACT_APP_CACHE_VERSION;

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
        window.localStorage.setItem('ScandiCurrencyCache', JSON.stringify({selectedCurrency, 'ScandiCacheVersion': cacheVersion}));
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
            
            this.setState({selectedCategory: defaultSelected, categoryList: newCategories});     
        });


        //Fetch list of currencies.
        const currencyQuery = new Query("currencies", true).addFieldList(["label","symbol"]);
        console.log("Fetch currencies");
        client.post(currencyQuery).then((rawCurrencies)=>{      
            const currencyList = rawCurrencies.currencies.map(c=>({label: c.label, symbol: c.symbol}));

            //Load from localStorage or Set default selected currency
            let selectedCurrency = currencyList[0]?currencyList[0]:{};
            
            let prevCurrencyCache;
            try{
                prevCurrencyCache = JSON.parse(window.localStorage.getItem('ScandiCurrencyCache'));
            } catch {
                prevCurrencyCache = false;
            }

            if (prevCurrencyCache && prevCurrencyCache.ScandiCacheVersion===cacheVersion) {
                selectedCurrency = prevCurrencyCache.selectedCurrency;
                console.info("Currency cache has been loaded successfully.");
            } else {
                console.info("Invalid currency cache. Reverting to initial currency state.");
            }
            
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