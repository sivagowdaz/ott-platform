import React from 'react';
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners"




const Spinner = ({ color, text }) => {
    
    const override = css`
        display: block;
        margin: 0 auto;
        border-color: ${color};
        font-weight: 20px;
        border: 3px solid blue;
    `;
    
    return (
        <div>
            <div>
                <ClipLoader css={override} size={50} />
            </div>
        </div>
    )
}

export default Spinner