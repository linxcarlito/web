import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DrawerSide from '../../components/DrawerSide';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
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
  formContainer: {},
  formInput: {
    marginLeft: '30px',
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

function EditRemitente() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [remitente, setRemitente] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const history = useHistory();
  const { id } = useParams();

  const fetchRemitente = React.useCallback(async () => {
    await axios
      .get(`https://carloscourierapi.herokuapp.com/api/remitente/${id}`)
      .then((response) => {
        setRemitente(response.data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    fetchRemitente();
  }, [fetchRemitente]);
  const onSubmit = (data) => {
    axios
      .put(`https://carloscourierapi.herokuapp.com/api/remitente/${id}`, {
        nombre: data.nombre,
        RNC: data.rnc,
        telefono: data.telefono,
        email: data.email,
        pais: data.pais,
        direccion: data.direccion,
      })
      .then(() => history.push('/remitente'))
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.root}>
      <DrawerSide
        title={`Editar Remitente - ${remitente.RNC}`}
        showCreate={false}
      />
      <main className={classes.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loading ? (
            <>
              <Box display="flex" className={classes.formContainer}>
                <Typography variant="h6">Nombre</Typography>
                <Input
                  name="nombre"
                  required
                  defaultValue={remitente.nombre}
                  {...register('nombre')}
                  className={classes.formInput}
                />
              </Box>
              <Box display="flex" className={classes.formContainer}>
                <Typography variant="h6">RNC</Typography>
                <Input
                  name="rnc"
                  required
                  defaultValue={remitente.RNC}
                  {...register('rnc')}
                  className={classes.formInput}
                />
              </Box>
              <Box display="flex" className={classes.formContainer}>
                <Typography variant="h6">Telefono</Typography>
                <Input
                  name="telefono"
                  required
                  defaultValue={remitente.telefono}
                  {...register('telefono')}
                  type="phone"
                  className={classes.formInput}
                />
              </Box>
              <Box display="flex" className={classes.formContainer}>
                <Typography variant="h6">Correo Electronico</Typography>
                <Input
                  name="email"
                  {...register('email')}
                  required
                  defaultValue={remitente.email}
                  type="email"
                  className={classes.formInput}
                />
              </Box>
              <Box display="flex" className={classes.formContainer}>
                <Typography variant="h6">País</Typography>
                <Input
                  name="pais"
                  {...register('pais')}
                  defaultValue={remitente.pais}
                  required
                  className={classes.formInput}
                />
              </Box>
              <Box display="flex" className={classes.formContainer}>
                <Typography variant="h6">Dirección</Typography>
                <Input
                  name="direccion"
                  {...register('direccion')}
                  defaultValue={remitente.direccion}
                  className={classes.formInput}
                  required
                />
              </Box>
              <Box display="flex" className={classes.btnContainer}>
                <Button type="submit" className={classes.guardarBtn}>
                  Guardar
                </Button>
                <Button
                  className={classes.guardarBtn}
                  onClick={() => history.push('/remitente')}
                >
                  Cancelar
                </Button>
              </Box>
            </>
          ) : null}
        </form>
      </main>
    </div>
  );
}

export default EditRemitente;
