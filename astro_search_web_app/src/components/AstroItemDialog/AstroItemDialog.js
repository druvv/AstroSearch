//@flow
import React from 'react';
// Data
import { NASAImage } from "../../networking/Models";
// Main Components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
// Styles
import './AstroItemDialog.css';
import withMobileDialog from '@material-ui/core/withMobileDialog';

/**
 * A NASA Image detail dialog.
 */
function AstroItemDialog(props: ({
    open: boolean,
    onClose: (() => void),
    onShare: (() => void),
    selectedImage?: NASAImage })) {

    const { open, onClose, onShare, selectedImage, fullScreen } = props;

    return (
        <Dialog open={open} fullScreen={fullScreen} fullWidth={true} maxWidth='md' onClose={onClose}>
            { selectedImage &&
            <>
                <DialogTitle id='scroll-dialog-title'>{selectedImage.title}</DialogTitle>
                <DialogContent>
                    <div className='split-content-box'>
                        <div className='split-content-one'>
                            <img
                                className='image'
                                alt={selectedImage.title}
                                src={selectedImage.imageURL}
                            />
                            <div className='right-aligned-date'>
                                <DialogContentText variant='body1' gutterBottom={true} align='right'>
                                    {
                                        new Date(selectedImage.dateCreated)
                                            .toLocaleDateString(
                                                'en-US',
                                                {year: 'numeric', month: 'long', day: 'numeric'}
                                            )
                                    }
                                </DialogContentText>
                            </div>
                        </div>
                        <div className='split-content-two'>
                            <DialogContentText
                                variant='body1'
                                gutterBottom={true}
                                dangerouslySetInnerHTML={{__html: selectedImage.description}}
                            />
                            <DialogContentText variant='body1' gutterBottom={true}>
                                {'Keywords: ' + selectedImage.keywords.join(', ')}
                            </DialogContentText>
                            <DialogContentText variant='body1'>
                                {'NASA ID: ' + selectedImage.nasaID}
                            </DialogContentText>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ () => onShare()} color="secondary">
                        Share
                    </Button>
                    <Button onClick={ () => onClose()} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </>
            }
        </Dialog>
    );
}

export default withMobileDialog()(AstroItemDialog);