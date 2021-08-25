import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from './components/Pages/Home';
import MeatsPage from './components/Pages/MeatsPage';
import CheckoutView from './components/Payment/CheckoutView';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { AuthContext } from './contexts/AuthContex';
import LoginForm from './components/Forms/LoginForm';
import RegisterForm from './components/Forms/RegisterForm';

function App() {

  const { authState } = useContext(AuthContext);

  return (
    <Switch>

      <Route exact path='/' component={Home} />
      <Route path='/products/meats' component={MeatsPage} />

      <Route path='/login'>
        {authState.isLogged ? <Redirect to="/" /> : <LoginForm />}
      </Route>

      <Route path='/register'>
        {authState.isLogged ? <Redirect to="/" /> : <RegisterForm />}
      </Route>      

      <PrivateRoute>
        <Route exact path='/checkout/cart' component={CheckoutView} />
      </PrivateRoute>

      <PrivateRoute>
        <Route exact path='/checkout/payment' component={CheckoutView} />
      </PrivateRoute>

    </Switch>
  );
}

export default App;
