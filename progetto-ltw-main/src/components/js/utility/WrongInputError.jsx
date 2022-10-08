import React, {useEffect, useState} from 'react';
import '../../css/utility/WrongInputError.css';

const WrongInputError = (props) => {
    const errorMessage = props.errorMessage;

    return (
    <>

        { props.vis ? (
            <small className={"wie"} style={{visibility:"visible"}}> {errorMessage} </small>
        ) : (
            <small className={"wie"}  style={{visibility:"hidden", display:"none"}}> {errorMessage} </small>
        )}

    </>
)};

export default WrongInputError