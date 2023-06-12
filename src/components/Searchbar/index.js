// eslint-disable-next-line
import React, { useState } from "react";
import "./style.css";
import Search from '@mui/icons-material/Search';

function Searchbar({onChange}) {
    const [searchValue, setSearchValue] = useState("")
    
    function onBtnClick (e) {
        e.preventDefault();
        onChange(searchValue);
        setSearchValue("");
    }

    return (
        <form onSubmit={onBtnClick} className='friendSearchBox2'>
            <input type="text" className='searchBar' placeholder='search friends' value={searchValue} onChange={e => setSearchValue(e.target.value)}></input>
            <button className='searchButton' type='submit'><Search sx={{fontSize: 20}}/></button>
        </form>
    );
}

export { Searchbar };