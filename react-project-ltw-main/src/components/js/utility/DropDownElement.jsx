import React from 'react';
import '../../css/utility/DropDownElement.css';

const DropDownElement = (props) => {

    return (

        <div className="row w-100 m-0 p-0 ">
            <button className="dropdown-menu-element" onClick={ props.function }> {props.name} </button>
        </div>

    )
}
export default DropDownElement

