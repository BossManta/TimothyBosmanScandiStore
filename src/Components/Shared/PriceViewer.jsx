import React, {Component} from 'react';

import GlobalContext from '../State Management/GlobalContext';

class PriceViewer extends Component {
    state = {  } 

    static contextType = GlobalContext;

    render() {
        
        const selectedCurrencyPrice = this.props.prices.filter(s=>
            (s.currency.label===this.context.selectedCurrency.label))[0];

        return (
            <>
                {`${selectedCurrencyPrice.currency.symbol}${selectedCurrencyPrice.amount}`}
            </>
        );
    }
}
 
export default PriceViewer;