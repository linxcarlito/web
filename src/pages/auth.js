import React from 'react';
import Grid from '@material-ui/core/Grid';
import LoginTab from '../components/LoginTabs';
import { makeStyles } from '@material-ui/core';
import RegisterForm from '../components/RegisterForm';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import { useCookies } from 'react-cookie';
import LoginSvg from '../assets/icons/login.svg';

const useStyles = makeStyles({
  container: {
    paddingTop: '20vh',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: { marginRight: '20px' },
  inputContainer: {
    marginTop: '1rem',
  },
  input: {
    maxWidth: '250px',
  },
  loginButton: {
    padding: '15px',
    borderRadius: '10px',
    color: 'white',
    marginTop: '25px',
    backgroundColor: '#FA0000',
    '&:hover': {
      backgroundColor: '#A00000',
      color: 'white',
    },
  },
});

const Auth = () => {
  const classes = useStyles();
  const [tab, setTab] = React.useState('login');
  const history = useHistory();
  const [cookies, setCookie] = useCookies(['sesion']);

  const onLogin = (data) => {
    axios
      .post('http://localhost:3000/api/auth/login', data)
      .then(() => {
        setCookie('sesion', true);
        history.push('/home');
      })
      .catch((error) => console.log(error));
  };

  const onRegister = (data) => {
    axios
      .post('http://localhost:3000/api/auth/register', data)
      .then(() => {
        setCookie('sesion', true);
        history.push('/home');
      })
      .catch((error) => console.log(error));
  };

  if (cookies.sesion) {
    history.push('/home');
  }
  return (
    <Grid justify="center" className={classes.container}>
      <LoginTab tab={tab} setTab={setTab} />
      <Grid item xs={12} sm={12}>
        {tab === 'login' ? (
          <LoginForm classes={classes} onLogin={onLogin} />
        ) : (
          <RegisterForm classes={classes} onRegister={onRegister} />
        )}
      </Grid>
      <img src={LoginSvg} alt="Courier Image" width="450" height="450" />
    </Grid>
  );
};

export default Auth;
