import React, { useState } from "react";
import "./style.css";
import Search from '@mui/icons-material/Search';

function Searchbar() {
    return (
        <>
            <input type="text" className='searchBar' placeholder='search friends'></input>
            <button className='searchButton'><Search sx={{fontSize: 20}}/></button>
        </>
    );
}

export { Searchbar };