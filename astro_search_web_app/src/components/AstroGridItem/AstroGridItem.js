//@flow
import React from "react";
// Data
import {NASAImage} from "../../networking/Models";
// Main Components
import Grid from '@material-ui/core/Grid';
import Card from "../Card/Card.js";
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from '@material-ui/core/CardMedia';
// Styles
import './AstroGridItem.css'

/**
 * The Material Grid Item for a NASAImage.
 */
export function AstroGridItem(props: {nasaImage: NASAImage, selectImage: (i: NASAImage) => void}) {
    const { nasaImage, selectImage } = props;

    return (
        <Grid item style={{padding: '8px'}} xs={12} sm={6} md={3} xl={2} key={nasaImage.nasaID}>
            <Card style={{marginBottom: '0px', marginTop: '0px'}} >
                <CardActionArea onClick={ () => selectImage(nasaImage) }>
                    <CardHeader
                        title={nasaImage.title}
                        // Disable flex on root so that the title truncates properly on the card.
                        style={{display: 'block'}}
                        titleTypographyProps={{noWrap: true, variant: 'subtitle1'}}
                        subheader={new Date(nasaImage.dateCreated).toLocaleDateString()}
                    />
                    <CardMedia
                        className='image-center-cropped'
                        image={nasaImage.imageURL}
                        title={nasaImage.title}
                    />
                </CardActionArea>
            </Card>
        </Grid>
    );
}