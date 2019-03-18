import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

import './AstroItemDialog.css';

export function AstroItemDialog(props) {
    const { open, onClose, selectedImage } = props;
    return (
        <Dialog fullScreen={false} open={open} fullWidth={true} maxWidth='md' onClose={onClose}>
            { selectedImage &&
            <>
                <DialogTitle id="scroll-dialog-title">{selectedImage.title}</DialogTitle>
                <DialogContent>
                    <div className='split-content-box'>
                        <div className='split-content-left'>
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
                        <div className='split-content-right'>
                            <DialogContentText variant='body1' gutterBottom={true}>
                                {selectedImage.description}
                            </DialogContentText>
                            <DialogContentText variant='body1' gutterBottom={true}>
                                {'Keywords: ' + selectedImage.keywords.join(', ')}
                            </DialogContentText>
                            <DialogContentText variant='body1'>
                                {"NASA ID: " + selectedImage.nasaID}
                            </DialogContentText>
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={ () => onClose()} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </>
            }
        </Dialog>
    );
}