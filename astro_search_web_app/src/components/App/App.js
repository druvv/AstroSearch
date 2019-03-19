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
import {AstroShareDialog} from "../AstroShareDialog/AstroShareDialog";
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
    // Image sharing
    const [shareImageOpen, setShareImageOpen] = useState(false);

    const closeSelectedImage = () => {
        setImageDetailOpen(false);
    };

    const selectImage = (image: NASAImage) => {
        setLastSelectedImage(image);
        setImageDetailOpen(true);
    };

    const shareCurrentImage = () => {
        setShareImageOpen(true);
    };

    const closeShare = () => {
      setShareImageOpen(false);
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
            <AstroParallaxSearchBar value={initialSearch} startYearInitial={null} endYearInitial={null} doSearch={doSearch} />
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
                onShare={shareCurrentImage}
                selectedImage={lastSelectedImage}
            />
            <AstroShareDialog
                open={shareImageOpen}
                onClose={closeShare}
                selectedImage={lastSelectedImage}
            />
        </div>
    )
}

export default App;
