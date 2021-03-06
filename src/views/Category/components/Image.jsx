import React from 'react'
import styled from 'styled-components'

const StyledImage = styled.img`
    width:100%;
    height:auto;
    max-height: 300px;
    margin: 0;
    padding:0;

`;


const Image = ({ imgSrc, imgAlt }) => (
    <StyledImage src={imgSrc} alt={imgAlt} />
)

export default Image