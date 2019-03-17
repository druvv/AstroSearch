// @flow
import React, { useState, useEffect, useReducer } from 'react';

import { useNASASearch, useDebounce } from "../../networking/NASAHook";

// nodejs library that concatenates classes
import classNames from "classnames";
import './App.css';
// Main Components
import Header from '../Header/Header';
import HeaderLinks from '../Header/HeaderLinks'
import AstroParallaxSearchBar from '../AstroParallaxSearchBar/AstroParallaxSearchBar'
import Grid from '@material-ui/core/Grid';
import Card from "../Card/Card.js";
import CircularProgress from '@material-ui/core/CircularProgress';
import '../AstroGridItem/AstroGridItem'

import {AstroGridItem} from "../AstroGridItem/AstroGridItem";
import {Typography} from "@material-ui/core";

function App() {

    // Use Data Hook
    const initialSearch = 'pluto';
    const {isLoading, isError, nasaImages, doSearch } = useNASASearch(initialSearch);

    return (
        <div>
            <Header
                color="transparent"
                brand="AstroSearch"
                rightLinks={<HeaderLinks />}
                fixed
                changeColorOnScroll={{
                    height: 200,
                    color: "white"
                }}
            />
            <AstroParallaxSearchBar value={initialSearch} doSearch={doSearch} />
            <div className='App-content' style={{width: 'calc(100% - 80px)'}}>
                {isError && <div>Something went wrong ...</div>}
                {isLoading &&
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <CircularProgress/>
                </div>
                }
                {!isError && !isLoading && nasaImages &&
                <>
                    <div>Search Results: {nasaImages.length}</div>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="stretch"
                    >
                        {nasaImages.map(i => <AstroGridItem key={i.nasaID} nasaImage={i} />)}
                    </Grid>
                </>
                }
            </div>
        </div>
    )
}

export default App;
