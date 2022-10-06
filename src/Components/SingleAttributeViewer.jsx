import React, {Component} from 'react';
import styled from 'styled-components';
import GlobalContext from './GlobalContext';

class SingleAttributeViewer extends Component {
    static contextType = GlobalContext;

    handleSelectionUpdate = (attributeName, selectedID) => {
        this.context.setItemAttributeSelection(attributeName, selectedID);
    }

    render() 
    {
        const staticSelection = this.props.staticSelection;
        const a = this.props.attributeData;
        const isSwatch = a.type==="swatch";

        return (
            <>
                <h3 style={{marginBottom: "0.3em", marginTop:0}}>{`${a.name.toUpperCase()}:`}</h3>
                <div style={{display:"flex"}}>
                    {a.items.map((v,i)=>(
                        <React.Fragment key={i}>
                        {isSwatch && 
                        <StyledSwatchBlip   onClick={()=>!staticSelection&&this.handleSelectionUpdate(a.name, v.value)}
                                            selected={staticSelection?staticSelection[a.name]===v.value:this.context.pendingItem.attributeSelections[a.name]===v.value}
                                            count={a.items.length}
                                            v={v}>
                            {isSwatch?" ":v.value}
                        </StyledSwatchBlip>}

                        
                        {!isSwatch && <StyledAttributeBlip  onClick={()=>!staticSelection&&this.handleSelectionUpdate(a.name, v.value)}
                                                            selected={staticSelection?staticSelection[a.name]===v.value:this.context.pendingItem.attributeSelections[a.name]===v.value}
                                                            count={a.items.length}
                                                            v={v}>
                            {isSwatch?" ":v.value}
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

    border: 2px solid ${(p) => p.selected?"limeGreen":"transparent"};
    background: ${(p) => p.v.value};
    aspect-ratio: 1/1;
    padding: 0.9em;
    box-shadow: 0px 0px 5px 0px lightGray;
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
