import React, { Component } from 'react';
import styled from 'styled-components';
import parse from 'html-react-parser'
import { sanitize } from 'dompurify'; 

class SafeProductDescription extends Component {

    render() { 

        //Cleans HTML requsted from API (Prevents any XSS vulnerabilities)
        const cleanedHtmlDescription = sanitize(this.props.html || 'Loading..')

        return (
            <StyledDescription>

                {/* Embeds HTML description */}
                {parse(cleanedHtmlDescription)}    
                      
            </StyledDescription>
        )
    }
}

const StyledDescription = styled.div`
    margin-top: 2em;
`
 
export default SafeProductDescription;