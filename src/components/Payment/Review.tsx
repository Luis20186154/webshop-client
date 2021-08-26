import React, { useContext, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import { AuthContext } from '../../contexts/AuthContex';
import { ClientContext } from '../../contexts/ClientContext';
import { Button, IconButton } from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';

const products = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];
const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' },
];

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review() {
  const classes = useStyles();

  let total = useRef(0).current;
  const { authState } = useContext(AuthContext);
  const { increaseProductCantity, reduceProductCantity, deleteProductCart, cartState } = useContext(ClientContext);

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>

        {cartState.myProducts.map((product) => {
          total = total + (product.price * product.cantity)
          return (
            <ListItem className={classes.listItem} key={product.id}>
              <ListItemText primary={product.productName} secondary={'$RD ' + product.price} />
              <Typography variant="body2">{product.cantity}</Typography>

              {product.cantity > 1 && (
                <Button
                  size="small"
                  variant="outlined"
                  color="secondary"
                  style={{ marginLeft: 15 }}
                  onClick={() => reduceProductCantity(product.id)}
                >
                  <Typography variant="body1" style={{ fontSize: 20 }}>-</Typography>
                </Button>
              )}

              <Button
                size="small"
                variant="outlined"
                color="primary"
                style={{ marginLeft: 15 }}
                onClick={() => increaseProductCantity(product.id)}
              >
                <Typography variant="body1" style={{ fontSize: 20 }}>+</Typography>
              </Button>

              <IconButton aria-label="delete" style={{ marginLeft: 8 }} onClick={() => deleteProductCart(product.id)}>
                <DeleteOutline />
              </IconButton>

            </ListItem>
          )
        })}

        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            $RD {total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}