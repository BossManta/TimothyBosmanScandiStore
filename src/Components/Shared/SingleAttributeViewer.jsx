import React, {Component} from 'react';
import styled from 'styled-components';
import { SharedStyledH3 } from '../GlobalStyling/SharedStyles';
import GlobalContext from '../State Management/GlobalContext';

//Displays a single attribute (e.g. size)
class SingleAttributeViewer extends Component {

    static contextType = GlobalContext;

    //Updates pending item with selected attribute
    handleSelectionUpdate = (attributeName, selectedID) => {
        if (!this.props.staticSelection)
        {
            this.context.setItemAttributeSelection(attributeName, selectedID);
        }
    }

    //Used to see if current blip is selected
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
                {/* Render attribute name */}
                <SharedStyledH3 isBold={!this.props.isModal}
                                style={{marginBottom: "0.5em"}}>
                                    
                    {`${a.name.toUpperCase()}:`}
                </SharedStyledH3>
                
                {/* Show attributes */}
                <div style={{display:"flex"}}>
                    {a.items.map((v,i)=>(
                        <React.Fragment key={i}>

                            {/* If swatch display as colored squares */}
                            {isSwatch && 
                            <StyledSwatchBlip   onClick={()=>this.handleSelectionUpdate(a.name, v.value)}
                                                selected={this.checkIfSelected(a,v)}
                                                color={v.value}
                            />}

                            {/* If not swatch display attribute values */}
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
        0 0 0 2px ${(p) => p.selected?"var(--mainGreen)":"transparent"},
        0px 0px 5px 0px lightGray;

    margin: 0.2em;

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
