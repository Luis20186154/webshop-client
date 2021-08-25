import React from 'react'
import {createStyles, makeStyles, Theme } from '@material-ui/core'
import { CarouselSlider } from '../Carousel';
import Varieties from '../Varietyies';
import HeaderAppBar from '../Header/HeaderAppBar';

const Home = () => {

    const classes = useStyles();
    
    

    return (
        <div className={classes.root}>
            
            <HeaderAppBar/>

            <div className={classes.carousel}>
                <CarouselSlider/>
            </div>

            <div className={classes.varities}>
                <Varieties/>
            </div>

        </div>
    )
}

export default Home;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },        
        carousel: {
            display: 'flex',
            justifyContent: 'center',
            marginTop: '3rem',
            marginLeft: 56,
            marginRight: 56,
        },        
        varities: {
            margin: '3rem'
        },
    }),
);