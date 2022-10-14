
import React from 'react';
import '../../css/navbar/NavbarHeader.css';
import logo from "../../../assets/img/logo.png";


export function NavbarHeader(props) {
    return (
        <div id="sidenav-header" className="row gy-0 gx-2 mt-3">
            <div className="col-3 py-0">
                <img src={logo} className="logo img-fluid"/>
            </div>
            <div className="col-9 m-0 d-flex align-items-center">
                <p className="h4 brand-name m-0">WAVESHARE</p>
            </div>
        </div>
    );
};