import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  option: {
    transition: 'all 0.2s ease',
    padding: 20,
    cursor: 'pointer',
    borderRadius: 100,
    fontWeight: 700,
    color: '#e3e3e3',
  },
  active: {
    color: '#fff',
    backgroundColor: 'red',
  },
});

const LoginTab = ({ tab, setTab }) => {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={12}>
      <Box display="inline-flex" border="1px solid #e3e3e3" borderRadius={50}>
        <Typography
          variant="h5"
          className={clsx(classes.option, {
            [classes.active]: tab === 'login',
          })}
          onClick={() => setTab('login')}
        >
          Iniciar Sesión
        </Typography>
        <Typography
          variant="h5"
          className={clsx(classes.option, {
            [classes.active]: tab === 'register',
          })}
          onClick={() => setTab('register')}
        >
          Registrarse
        </Typography>
      </Box>
    </Grid>
  );
};

export default LoginTab;
