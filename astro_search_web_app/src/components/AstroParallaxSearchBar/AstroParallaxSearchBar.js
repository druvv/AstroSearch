import React, { useState } from "react";
import { useDebounce } from "../../networking/NASAHook";


import './AstroParallaxSearchBar.css'
// Main Componenets
import Parallax from '../Parallax/Parallax';
import HeaderBackground from "../../assets/img/header-bg.jpg";
import InputBase from '@material-ui/core/InputBase';

import SearchIcon from '@material-ui/icons/Search'

/**
 * A search bar and a parallax effect
 *
 * @param props Takes value: string and doSearch: ((string): void) which calls .
 * @constructor
 */
export default function AstroParallaxSearchBar(props) {

    const { value, doSearch } = props;
    const [searchText, setSearchText] = useState(value);
    // Call doSearch with the debounced value of searchText with a delay of 500ms.
    useDebounce(searchText, doSearch, 500);

    return (
        <Parallax small image={HeaderBackground}>
            <div className='search-bar-container'>
                <div className='search'>
                    <div className='searchIcon'>
                        <SearchIcon classes={{root: 'whiteSearch'}}/>
                    </div>
                    <InputBase
                        onChange={e => setSearchText(e.target.value)}
                        onKeyPress={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                doSearch(e.target.value);
                            }
                        }}
                        value={searchText} style={{color: 'white'}}
                        classes={{root: 'inputRoot', input: 'inputInput'}}
                        placeholder="Search the stars…"
                    />
                </div>
            </div>
        </Parallax>
    );
}