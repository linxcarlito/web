import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DrawerSide from '../../components/DrawerSide';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginRight: '50px',
    marginTop: '100px',
  },
  formContainer: {
    margin: '10px 15px',
  },
  formInput: {
    marginLeft: '30px',
    borderRadius: '3px',
    width: '250px',
  },
  guardarBtn: {
    width: '220px',
    margin: '1rem',
    backgroundColor: '#FA0000',
    color: '#fff',
    fontWeight: 700,
    padding: '15px 30px',
    borderRadius: '2rem',
    '&:hover': {
      backgroundColor: '#A00000',
    },
  },
  btnContainer: {
    flexFlow: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
}));

function CreateDestinatario() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    axios
      .post('http://localhost:3000/api/destinatario', {
        nombre: data.nombre,
        RNC: data.rnc,
        telefono: data.telefono,
        email: data.email,
        pais: data.pais,
        direccion: data.direccion,
      })
      .then(() => history.push('/destinatario'))
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.root}>
      <DrawerSide title="Crear Destinatario" showCreate={false} />
      <main className={classes.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Nombre</Typography>
            <TextField
              name="nombre"
              required
              {...register('nombre')}
              className={classes.formInput}
              variant="outlined"
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">RNC</Typography>
            <TextField
              name="rnc"
              required
              {...register('rnc')}
              className={classes.formInput}
              variant="outlined"
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Telefono</Typography>
            <TextField
              name="telefono"
              required
              {...register('telefono')}
              type="phone"
              className={classes.formInput}
              variant="outlined"
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Correo Electronico</Typography>
            <TextField
              name="email"
              {...register('email')}
              required
              type="email"
              className={classes.formInput}
              variant="outlined"
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">País</Typography>
            <TextField
              name="pais"
              {...register('pais')}
              required
              className={classes.formInput}
              variant="outlined"
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Dirección</Typography>
            <TextField
              name="direccion"
              {...register('direccion')}
              className={classes.formInput}
              variant="outlined"
              required
            />
          </Box>
          <Box display="flex" className={classes.btnContainer}>
            <Button type="submit" className={classes.guardarBtn}>
              Guardar
            </Button>
            <Button
              className={classes.guardarBtn}
              onClick={() => history.push('/destinatario')}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </main>
    </div>
  );
}

export default CreateDestinatario;
