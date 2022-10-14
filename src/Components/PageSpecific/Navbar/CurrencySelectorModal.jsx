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
                        <StyledModalButton key={c.symbol} onClick={() => this.context.setSelectedCurrency(c)}>
                            {`${c.symbol} ${c.label}`}
                        </StyledModalButton>
                    ))}
                </StyledModalContainer>
            </Modal>
        );
    }
}

const StyledModalContainer = styled.div`
    background-color: white;
    width: 100px;
    height: 200px;
    top: 8%;
    right: 5%;
    position: fixed;
`

const StyledModalButton = styled.button`
    width:100%;
    height:30%;
    border:none;
`

export default CurrencySelectorModal;