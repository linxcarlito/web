import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useForm } from 'react-hook-form';
import { Typography, Box } from '@material-ui/core';

const LoginForm = ({ classes, onLogin }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const { handleSubmit, register } = useForm();
  return (
    <form onSubmit={handleSubmit(onLogin)}>
      <Box
        display="flex"
        justifyContent="center"
        className={classes.inputContainer}
      >
        <Typography variant="h6" className={classes.title}>
          Usuario
        </Typography>
        <TextField
          name="username"
          color="secondary"
          {...register('username')}
          fullWidth
          required
          className={classes.input}
        />
      </Box>
      <Grid item xs={12} sm={12}>
        <Box
          display="flex"
          justifyContent="center"
          className={classes.inputContainer}
        >
          <Typography
            variant="h6"
            className={classes.title}
            htmlFor="standard-adornment-password"
          >
            Contraseña
          </Typography>
          <Input
            className={classes.input}
            required
            fullWidth
            {...register('password')}
            color="secondary"
            aria-describedby="password-component"
            name="password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Grid>
      <Button type="submit" className={classes.loginButton}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
