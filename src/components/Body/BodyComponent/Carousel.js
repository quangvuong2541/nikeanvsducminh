import React from 'react'
import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { makeStyles } from "@mui/styles"

import CardActionArea from '@mui/material/CardActionArea';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const useStyles = makeStyles((theme) => ({
    image: {
        maxHeight: "100%",
        maxWidth: "100%"
    }
}))


const Carousel = (props) => {
    const classes = useStyles()

    return (
        <div >
            <Container maxWidth="xl">
                <Grid item xs={12}>
                    <Slider >
                        {props.carouselImg.map((item, key) => {
                            return (
                                <React.Fragment key={key}>
                                    <Card className={classes.image}>
                                        <CardActionArea >
                                            <CardMedia
                                                component="img"
                                                image={item}
                                                title="nike- just do it"
                                            />
                                        </CardActionArea>
                                    </Card>
                                </React.Fragment>
                            )
                        })}
                    </Slider>
                </Grid>
            </Container>
        </div>

    )
}

export default Carousel