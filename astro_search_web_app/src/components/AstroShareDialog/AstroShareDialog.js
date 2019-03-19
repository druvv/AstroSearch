//@flow
import React from 'react';
// Data
import {NASAImage} from "../../networking/Models";
// Main Components
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import {DialogContent} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import Button from "@material-ui/core/Button";
// Icons
import Reddit from 'mdi-material-ui/Reddit';
import Twitter from 'mdi-material-ui/Twitter';
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import ListItem from "@material-ui/core/es/ListItem/ListItem";


function buildShareURL(nasaImage: NASAImage): string {
    return encodeURI('https://images.nasa.gov/details-' + nasaImage.nasaID + '.html');
}

/**
 *
 * @param props Takes open: boolean, and onClose where passing: null just closes, 0 shares to reddit, 1
 * @constructor
 */
export function AstroShareDialog(props: {open: boolean, onClose: () => void, selectedImage: ?NASAImage}) {
    const { open, onClose, selectedImage } = props;

    function openReddit() {
        if (!selectedImage) { return }
        // Build reddit url from selectedImage
        const url = buildShareURL(selectedImage);
        const redditShareURL = 'https://www.reddit.com/submit?url=' + url;
        window.open(redditShareURL);
        onClose();
    }

    function openTwitter() {
        if (!selectedImage) { return }
        // Build twitter url from selectedImage
        const url = buildShareURL(selectedImage);
        const twitterShareURL = 'https://twitter.com/intent/tweet?text=' + url;
        window.open(twitterShareURL);
        onClose();
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Share to:</DialogTitle>
            <div>
                <List>
                    <ListItem button onClick={() => openReddit()}>
                        <ListItemIcon>
                            <Reddit/>
                            <ListItemText primary='Reddit'/>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem button onClick={() => openTwitter()}>
                        <ListItemIcon>
                            <Twitter/>
                            <ListItemText primary='Twitter'/>
                        </ListItemIcon>
                    </ListItem>
                </List>
            </div>
            <DialogActions>
                <Button onClick={ () => onClose()} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}