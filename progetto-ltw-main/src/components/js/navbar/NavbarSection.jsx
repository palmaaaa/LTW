import React, {useContext} from 'react';

import '../../css/navbar/NavbarSection.css'
import '../../../containers/css/Navbar.css'
import {useIsMobileVersion} from "../../../hooks/useIsMobileVersion";
import {ViewContext} from "../../../context/context";


const NavbarSection = (props) => {
    const {view, setView} = useContext(ViewContext)

    let isMobileVersion = useIsMobileVersion();

    function handleClick(optionName) {
        setView({view: optionName});
        if (isMobileVersion) {
            props.toggleNavbar();
        }
    }

    return (
        <div className="row sidenav-options my-md-4 my-3 g-0"> {/* main row */}
            <div className="col-12 browse-music">
                <p className="sidenav-options-title mb-md-3 mb-3">{props.title}</p>
            </div>

            <div className="container-fluid m-0 sidenav-options-option">
                {props.options.map((optionName, index) =>
                    <div className="row gx-0 mt-0 mt-md-1 sidenav-option-row" key={optionName} onClick={() => handleClick(optionName)}>
                        <div className="col-3">
                            <img src={props.optionIcons[index]} className="sidenav-option-logo img-fluid" alt={optionName}/>
                        </div>
                        <div className="col-9 d-flex align-items-center">
                            <p>{optionName}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
export default NavbarSection