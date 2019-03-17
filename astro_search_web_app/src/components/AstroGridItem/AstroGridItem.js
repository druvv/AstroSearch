import React from "react";
// Styles
import './AstroGridItem.css'
// Main Components
import Grid from '@material-ui/core/Grid';
import Card from "../Card/Card.js";
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from '@material-ui/core/CardMedia';
import CardBody from '../Card/CardBody.js';
import Paper from '@material-ui/core/Paper';
import Typo from "@material-ui/core/Typography";


export function AstroGridItem(props) {
    const { nasaImage } = props;

    return (
        <Grid item style={{padding: '8px'}} xs={3} key={nasaImage.nasaID}>
            <Card style={{marginBottom: '0px', marginTop: '0px'}} >
                <CardActionArea>
                    <CardHeader
                        title={nasaImage.title}
                        // Disable flex on root so that the title truncates properly
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