// @flow
// Data
import React, { useState } from 'react';
import { useNASASearch } from "../../networking/NASAHook";
// Main Components
import Header from '../Header/Header';
import HeaderLinks from '../Header/HeaderLinks'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
// Custom Components
import {AstroParallaxSearchBar} from '../AstroParallaxSearchBar/AstroParallaxSearchBar'
import {AstroGridItem} from "../AstroGridItem/AstroGridItem";
import AstroItemDialog from "../AstroItemDialog/AstroItemDialog";
import {NASAImage} from "../../networking/Models";
// Styling
import './App.css';

function App() {

    // Use Data Hook
    const initialSearch = 'Curiosity Rover';
    const {isLoading, isError, nasaImages, doSearch } = useNASASearch(initialSearch);
    // Keep track of the selected image, and display dialog when image is selected.
    // When dialog is closing, image should stay selected so that dialog can display the content
    // ... all the way through its closing animation.
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
