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

import {AstroGridItem} from "../AstroGridItem/AstroGridItem";
import {AstroItemDialog} from "../AstroItemDialog/AstroItemDialog";
import {Typography} from "@material-ui/core";
import {NASAImage} from "../../networking/Models";

function App() {

    // Use Data Hook
    const initialSearch = 'Curiosity Rover';
    const {isLoading, isError, nasaImages, doSearch } = useNASASearch(initialSearch);
    const [lastSelectedImage, setLastSelectedImage] = useState(null);
    const [imageDetailOpen, setImageDetailOpen] = useState(false);

    const closeSelectedImage = () => {
        setImageDetailOpen(false);
    };

    const selectImage = (image: NASAImage) => {
        setLastSelectedImage(image);
        setImageDetailOpen(true);
    };

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
            <div className='App-content' >
                {isError && <div>Something went wrong ...</div>}
                {isLoading &&
                <div style={{display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <CircularProgress/>
                </div>
                }
                {!isError && !isLoading && nasaImages &&
                <>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="stretch"
                    >
                        {nasaImages.map(i => <AstroGridItem key={i.nasaID} nasaImage={i} selectImage={selectImage} />)}
                    </Grid>
                </>
                }
            </div>
            <AstroItemDialog
                open={imageDetailOpen}
                onClose={closeSelectedImage}
                selectedImage={lastSelectedImage}
            />
        </div>
    )
}

export default App;
