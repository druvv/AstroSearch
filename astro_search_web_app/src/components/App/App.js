// @flow
// Data
import React, { useState } from 'react';
import { useNASASearch } from "../../networking/NASAHook";
import { NASAImage } from "../../networking/Models";
// Main Components
import Header from '../AstroHeader/AstroHeader';
import HeaderLinks from '../AstroHeader/HeaderLinks'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar'
// Custom Components
import {AstroParallaxSearchBar} from '../AstroParallaxSearchBar/AstroParallaxSearchBar'
import {AstroGridItem} from "../AstroGridItem/AstroGridItem";
import AstroItemDialog from "../AstroItemDialog/AstroItemDialog";
import {AstroShareDialog} from "../AstroShareDialog/AstroShareDialog";
// Styling
import './App.css';

/**
 * The root UI component for AstroSearch.
 */
function App() {

    // Use Data Hook
    const initialSearch = 'Supernova';
    const {isLoading, isError, nasaImages, doSearch } = useNASASearch(initialSearch);
    // Keep track of the selected image, and display dialog when image is selected.
    // When dialog is closing, image should stay selected so that dialog can display the content
    // ... all the way through its closing animation.
    const [lastSelectedImage, setLastSelectedImage] = useState(null);
    const [imageDetailOpen, setImageDetailOpen] = useState(false);

    // Image Detail
    function selectImage(image: NASAImage) {
        setLastSelectedImage(image);
        setImageDetailOpen(true);
    }
    function closeSelectedImage() {
        setImageDetailOpen(false);
    }

    // Image sharing
    const [shareImageOpen, setShareImageOpen] = useState(false);
    function shareCurrentImage() {
        setShareImageOpen(true);
    }
    function closeShare() {
        setShareImageOpen(false);
    }

    // Copy confirmation with Snackbar
    const [copyConfirmationOpen, setCopyConfirmationOpen] = useState(false);
    function showCopyConfirmation() {
        setCopyConfirmationOpen(true);
    }
    function closeCopyConfirmation() {
        setCopyConfirmationOpen(false);
    }

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
            <AstroParallaxSearchBar
                value={initialSearch}
                startYearInitial={null}
                endYearInitial={null}
                doSearch={doSearch}
            />
            <div className='App-content' >
                {isError && <div>Something went wrong ...</div>}
                {isLoading &&
                <div className='App-loading-container'>
                    <CircularProgress/>
                </div>
                }
                {!isError && !isLoading && nasaImages &&
                <Grid
                    container
                    direction="row"
                    justify="flex-start"
                    alignItems="stretch"
                >
                    {nasaImages.map(i => <AstroGridItem key={i.nasaID} nasaImage={i} selectImage={selectImage} />)}
                </Grid>
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
                showCopyConfirmation={showCopyConfirmation}
                selectedImage={lastSelectedImage}
            />
            <Snackbar
                open={copyConfirmationOpen}
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                message='Copied'
                autoHideDuration={1500}
                onClose={closeCopyConfirmation}
            />
        </div>
    )
}

export default App;
