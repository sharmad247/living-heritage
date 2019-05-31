import React from 'react';
import { css } from '@emotion/core';
import { BarLoader } from 'react-spinners';
import { usePromiseTracker } from "react-promise-tracker";

 
const override = css`
    display: block;
    margin: 50% auto;
`;
 
function Spinner(props) {
    const { promiseInProgress } = usePromiseTracker({area: props.area});
    return (
        promiseInProgress && (
            <div className='loader'>
                <BarLoader
                css={override}
                sizeUnit={"px"}
                size={15}
                color={'#1AA094'}
                loading={promiseInProgress}
                />
            </div> 
        )
    )
}
export default Spinner