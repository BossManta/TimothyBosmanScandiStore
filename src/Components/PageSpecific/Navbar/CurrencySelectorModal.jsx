import React, { Component } from 'react';
import styled from 'styled-components';

import GlobalContext from '../../State Management/GlobalContext';
import Modal from '../../Shared/Modal';

class CurrencySelectorModal extends Component {
    state = {  } 

    static contextType = GlobalContext;

    render() { 

        const listOfCurrencies = this.context.currencyList;

        return (
            <Modal setIsOpen={this.props.setIsOpen}>
                <StyledModalContainer>
                    {listOfCurrencies.map(c=>(
                        <StyledModalButton  key={c.symbol}
                                            selected={c.label===this.context.selectedCurrency.label}
                                            onClick={() => this.context.setSelectedCurrency(c)}>
                            {`${c.symbol} ${c.label}`}
                        </StyledModalButton>
                    ))}
                </StyledModalContainer>
            </Modal>
        );
    }
}

const StyledModalContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 5em;
    height: 15em;
    top: 8%;
    right: 5%;
    position: fixed;
    box-shadow: 0 0 20px 8px whitesmoke;
`

const StyledModalButton = styled.button`
    background-color: ${({selected}) => selected?"lightgray":"white"};
    width:100%;
    height: 100%;
    border:none;

    &:hover{
        background-color: ${({selected}) => selected?"darkgray":"whitesmoke"};
    }
`

export default CurrencySelectorModal;