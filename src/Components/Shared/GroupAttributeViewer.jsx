import React, {Component} from 'react';

import SingleAttributeViewer from './SingleAttributeViewer';
import GlobalContext from '../State Management/GlobalContext';

//Displays all attributes of a product
class GroupAttributeViewer extends Component {

    static contextType = GlobalContext;

    handleAttributeSelection = (attributeName, selectedID) => {
        this.context.setItemAttribute(attributeName, selectedID);
    }

    render() { 
        const staticSelection = this.props.staticSelection;
        const attributes = this.props.attributes?this.props.attributes:[];
        return (
            <>
                {attributes.map(a=>(
                    <SingleAttributeViewer isModal={this.props.isModal} key={a.name} attributeData={a} staticSelection={staticSelection}/>
                ))}
            </>
        );
    }
}

export default GroupAttributeViewer;