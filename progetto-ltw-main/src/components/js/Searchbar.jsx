import React from 'react';
import searchIcon from "../../assets/img/search_icon.png";
import '../css/Searchbar.css'

const Searchbar = () => {
    return (
        <div className="row g-0 mt-2 ms-5 ms-sm-0 search-bar-container">
            <div className="col-10">
                <img src={searchIcon} className="search-bar-icon"/>
                <input type="text" className="search-bar-input" placeholder="Search..."/>
            </div>
        </div>
    )
}
export default Searchbar