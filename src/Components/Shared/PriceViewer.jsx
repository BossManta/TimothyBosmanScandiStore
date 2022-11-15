import React, {Component} from 'react';

import GlobalContext from '../State Management/GlobalContext';

export const MoneyFormatter = (value) => {
    return (Math.round(value*100)/100).toFixed(2);
}

export const ExtractPrice = (prices, context) => {
    console.log(prices, context);
    return prices.find(s => (s.currency.label === context.selectedCurrency.label)).amount;
}

//Displays price
class PriceViewer extends Component {

    static contextType = GlobalContext;

    render() {

        //Grabs relevate price based on selected currency in state
        if (this.props.mustSelectCurrency)
        {
            if (this.context.selectedCurrency.label){
                if (this.props.prices){           
                const price = ExtractPrice(this.props.prices, this.context)  
                    return (     
                        <>{`${this.context.selectedCurrency.symbol} ${MoneyFormatter(price)}`} </>
                    );
                }
            }

            return (<>Loading...</>);
        }

        return (
            <>{`${this.context.selectedCurrency.symbol} ${MoneyFormatter(this.props.price)}`}</>
        );
    }
}

 
export default PriceViewer;