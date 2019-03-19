//@flow
import React, {useState} from "react";
// Data
import {useDebounce} from "../../networking/NASAHook";
import DateFnsUtils from '@date-io/date-fns';
// Main Components
import Parallax from '../Parallax/Parallax';
import HeaderBackground from "../../assets/img/header-bg.jpg";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search'
import {InlineDatePicker} from "material-ui-pickers";
import {MuiPickersUtilsProvider} from 'material-ui-pickers';
//Styles
import './AstroParallaxSearchBar.css'

/**
 * A search bar with a parallax effect and image subheader
 */
export function AstroParallaxSearchBar(props: {
    value: string,
    startYearInitial: ?string,
    endYearInitial: ?string,
    doSearch: (searchText: string, startYear: ?string, endYear: ?string) => void
}) {

    const {value, startYearInitial, endYearInitial, doSearch} = props;
    const [searchText, setSearchText] = useState(value);
    const [startYearS, setStartYear] = useState(startYearInitial);
    const [endYearS, setEndYear] = useState(endYearInitial);

    // Call doSearch with the debounced value of the request params with a delay of 500ms.
    useDebounce([searchText, startYearS, endYearS], doSearch, 500);

    // Convert from optional string to optional dates
    let startYear: ?Date = null;
    if (startYearS) {
        let d = new Date();
        d.setFullYear(parseInt(startYearS));
        startYear = d;
    }
    let endYear: ?Date = null;
    if (endYearS) {
        let d = new Date();
        d.setFullYear(parseInt(endYearS));
        endYear = d;
    }

    function handleStartYearChange(value: Date) {
        if (value) {
            setStartYear(value.getFullYear().toString());
        } else {
            setStartYear(null);
        }
    }

    function handleEndYearChange(value: Date) {
        if (value) {
            setEndYear(value.getFullYear().toString());
        } else {
            setEndYear(null);
        }
    }

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
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <InlineDatePicker
                            className='inputDate-left'
                            keyboard
                            clearable
                            style={{paddingRight: '8px'}}
                            color='white'
                            views={["year"]}
                            label="Start Year"
                            value={startYear ? new Date(startYear) : null}
                            onChange={handleStartYearChange}
                            maxDate={endYear ? (new Date(endYear)) : new Date()}
                            format='yyyy'
                            mask={[/\d/, /\d/, /\d/, /\d/]}
                        />
                        <InlineDatePicker
                            className='inputDate'
                            keyboard
                            color='white'
                            clearable
                            style={{paddingRight: '8px'}}
                            views={["year"]}
                            label="End Year"
                            value={endYear}
                            onChange={handleEndYearChange}
                            minDate={startYear ? (new Date(startYear)) : undefined}
                            format='yyyy'
                            mask={[/\d/, /\d/, /\d/, /\d/]}
                        />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
        </Parallax>
    );
}