import React, { useContext } from 'react'
import { AppBar, Button, createStyles, Link, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import { Person, ShoppingCart, ExitToApp } from '@material-ui/icons';

import { AuthContext } from '../../contexts/AuthContex';
import { useHistory } from 'react-router-dom';

const HeaderAppBar = () => {

    const { authState, signOut } = useContext(AuthContext);
    const history = useHistory();
    const classes = useStyles();

    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    <Link
                        component="button"
                        style={{color: '#ffff'}}
                        onClick={() => history.push('/')}
                    >JumboFood</Link>
                </Typography>
                {authState.isLogged ? (
                    <div>
                        <Button
                            color="inherit"
                            className={classes.button}
                            startIcon={<ShoppingCart />}
                            onClick={() => history.push('/checkout/cart')}
                        >Carrito</Button>

                        <Button
                            color="inherit"
                            className={classes.button}
                            startIcon={<ExitToApp />}
                            onClick={signOut}
                        >Salir</Button>
                    </div>
                ) : (
                    <Button
                        color="inherit"
                        className={classes.button}
                        startIcon={<Person />}
                        onClick={() => history.push('/login')}
                    >Mi Cuenta</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default HeaderAppBar;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);