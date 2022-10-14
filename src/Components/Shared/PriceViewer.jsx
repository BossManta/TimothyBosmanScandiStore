import React, {Component} from 'react';

import GlobalContext from '../State Management/GlobalContext';

class PriceViewer extends Component {
    state = {  } 

    static contextType = GlobalContext;

    render() {
        
        const selectedCurrencyPrice = this.props.prices.find(s=>
            (s.currency.label===this.context.selectedCurrency.label));

        return (
            <>
                {selectedCurrencyPrice?
                    `${selectedCurrencyPrice.currency.symbol}${selectedCurrencyPrice.amount}`:
                    'loading'}
            </>
        );
    }
}
 
export default PriceViewer;