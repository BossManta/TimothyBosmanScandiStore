import styled, {css} from "styled-components";

export const StyledBrandHeader = styled.h1`
    font-size: 100%;
    font-weight: bold;
`

export const StyledNameHeader = styled.h1`
    font-size: 100%;
    font-weight: normal;
`


//GalleryImage
export const SharedStyledGalleryImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: right;
    position: absolute;
    right: 0;
    top: 0;
`




//Button
export const SharedCssButton = css`
    background-color: grey;
    color: white;
    border: none;
    font-weight: bold;
    position: relative;

    ${({disabled}) => !disabled && css`
        background-color: var(--mainGreen);

        &:hover{
            background-color: var(--hoverGreen);
        }

        &:after{
            content: "";
            background-color: var(--mainGreen);
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: all 0.4s;
        }

        &:active:after{
            opacity: 0.5;
            transition: 0s;
        }
    `}
`

export const SharedStyledButton = styled.button`
    ${SharedCssButton}
`




export const SharedCssFlexCentered = css`
    align-items: center;
    justify-content: center;
    display: inline-flex;
`