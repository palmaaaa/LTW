import React, {useEffect} from 'react';
import '../../css/utility/DropDown.css';
import '../../css/utility/DropDownElement.css';
import DropDownElement from "./DropDownElement";

const DropDown = (props) => {
    const data = props.data;

    useEffect(() => {
        document.getElementById(props.id).style.transform = "translate("+ props.offsetX+"px,"+props.offsetY+"px)";
    });



    let options = Object.entries(data).map( (el,index) =>
        <div key={index}>
            <DropDownElement   name={el[0]} function={el[1]}/>
            <hr className="m-0 p-0 drop-down-wave-hr"/>
        </div>);

    return (
        <div id={props.id} className={"dropdown-menu-wave"}>
            {options}
        </div>

    )
}
export default DropDown