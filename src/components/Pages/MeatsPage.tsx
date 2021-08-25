import React from 'react';
import {
    Button, Container, Card, CardActions, CardContent, CardMedia, CssBaseline, Grid, makeStyles, Typography
} from '@material-ui/core';
import { useGetProducts } from '../../hooks/useGetProducts';
import HeaderAppBar from '../Header/HeaderAppBar';
import { Footer } from '../Footer/Footer';
import { ClientContext } from '../../contexts/ClientContext';
import { useContext } from 'react';

const MeatsPage = () => {
    const classes = useStyles();
    const { isLoading, products } = useGetProducts();

    const { addProductCart } = useContext(ClientContext);

    return isLoading ? <h1>Cargando...</h1> : (
        <React.Fragment>
            <CssBaseline />
            <HeaderAppBar />

            <main>
                <Container className={classes.cardGrid} >
                    <Typography variant="h2" align='left' className={classes.title}>
                        Carnes
                    </Typography>

                    <Grid container spacing={2}>
                        {products.map((product) => product.category === 'food' && (
                            <Grid item key={product.id} xs={6} sm={4} md={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={product.urlImage}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {product.productName}
                                        </Typography>
                                        {/* CHECK THIS CONTENT */}
                                        {/* <Typography>
                                            $RD 165.60
                                        </Typography> */}
                                    </CardContent>
                                    <CardActions className={classes.cardActions}>
                                        <Typography>
                                            $RD {product.price}
                                        </Typography>
                                        <Button
                                            size="small"
                                            color="primary"
                                            onClick={() => addProductCart({
                                                id: product.id,
                                                category: product.category,
                                                productName: product.productName,
                                                price: product.price,
                                                cantity: 1,
                                            })}
                                        >Añadir</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>

            <Footer />
        </React.Fragment>
    );
}

export default MeatsPage;

const useStyles = makeStyles((theme) => ({
    title: {
        marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        fontWeight: 400
    },
    button: {
        margin: theme.spacing(1),
    },
    icon: {
        marginRight: theme.spacing(2),
    },
    cardGrid: {
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    cardActions: {
        justifyContent: 'space-around'
    },
}));