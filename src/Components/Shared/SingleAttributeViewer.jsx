import React, {Component} from 'react';
import styled from 'styled-components';
import GlobalContext from '../State Management/GlobalContext';

class SingleAttributeViewer extends Component {

    static contextType = GlobalContext;

    handleSelectionUpdate = (attributeName, selectedID) => {
        if (!this.props.staticSelection)
        {
            this.context.setItemAttributeSelection(attributeName, selectedID);
        }
    }


    checkIfSelected = (a,v) => {
        const staticSelection = this.props.staticSelection;

        if (staticSelection)
        {
            return staticSelection[a.name]===v.value
        }
        
        return this.context.pendingItem.attributeSelections[a.name]===v.value
    }

    render() 
    {
        const a = this.props.attributeData;
        const isSwatch = a.type==="swatch";

        return (
            <>
                <h3 style={{marginBottom: "0.3em", marginTop:0}}>{`${a.name.toUpperCase()}:`}</h3>
                <div style={{display:"flex"}}>
                    {a.items.map((v,i)=>(
                        <React.Fragment key={i}>

                            {isSwatch && 
                            <StyledSwatchBlip   onClick={()=>this.handleSelectionUpdate(a.name, v.value)}
                                                selected={this.checkIfSelected(a,v)}
                                                color={v.value}
                            />}

                            
                            {!isSwatch && 
                            <StyledAttributeBlip    onClick={()=>this.handleSelectionUpdate(a.name, v.value)}
                                                    selected={this.checkIfSelected(a,v)}>
                                {v.value}
                            </StyledAttributeBlip>}

                        </React.Fragment>
                    ))}
                </div>
            </>
        );
    }
}

const StyledSwatchBlip = styled.button`
    margin-right: min(1em, 2%);
    font-size: 100%;

    border: none;
    box-shadow:
        0 0 0 1px white,
        0 0 0 2px ${(p) => p.selected?"limeGreen":"transparent"},
        0px 0px 5px 0px lightGray;

    margin: 2px;

    background: ${(p) => p.color};
    aspect-ratio: 1/1;
    padding: 0.9em;
`

const StyledAttributeBlip = styled.button`
    margin-right: min(1em, 2%);
    padding: 0.5em;
    font-size: 100%;
    
    border: 1px solid;
    background-color: ${(p) => p.selected?"black":"white"};
    color: ${(p) => p.selected?"white":"black"};
    padding-left: clamp(0.5em, 5%, 1.2em);
    padding-right: clamp(0.5em, 5%, 1.2em);
    padding-top: clamp(0.5em, 3%, 1em);
    padding-bottom: clamp(0.5em, 3%, 1em);
`
 
export default SingleAttributeViewer;
