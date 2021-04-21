import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { useForm } from 'react-hook-form';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const RegisterForm = ({ classes, onRegister }) => {
  const { handleSubmit, register, watch } = useForm();
  const [showPassword, setShowPassword] = React.useState(false);
  const password = React.useRef({});
  password.current = watch('password', '');

  return (
    <form onSubmit={handleSubmit(onRegister)}>
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
      <Box
        display="flex"
        justifyContent="center"
        className={classes.inputContainer}
      >
        <Typography variant="h6" className={classes.title}>
          Contraseña
        </Typography>
        <Input
          className={classes.input}
          required
          {...register('password', {
            required: 'Debes introducir una contraseña',
            minLength: {
              value: 8,
              mensaje: 'Tu contraseña debe tener al menos 8 caracteres',
            },
          })}
          fullWidth
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
      <Box
        display="flex"
        justifyContent="center"
        className={classes.inputContainer}
      >
        <Typography variant="h6" className={classes.title}>
          Confirmar contraseña
        </Typography>
        <Input
          className={classes.input}
          required
          fullWidth
          {...register('passwordConfirmar', {
            validate: (value) =>
              value === password.current || 'The passwords do not match',
          })}
          color="secondary"
          aria-describedby="password-component"
          name="passwordConfirmar"
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
      <Button type="submit" className={classes.loginButton}>
        Registrarse
      </Button>
    </form>
  );
};

export default RegisterForm;
