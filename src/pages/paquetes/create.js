import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DrawerSide from '../../components/DrawerSide';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import NumberFormat from 'react-number-format';
import Select from '@material-ui/core/Select';
import { TextField } from '@material-ui/core';

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

function CampoFormattedCosto(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
      prefix="$"
    />
  );
}

function PaqueteCreate() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [tipo, setTipo] = React.useState('');
  const [values, setValues] = React.useState({
    costoEnvio: '',
  });

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  const facturar = async (data) => {
    await axios.post('http://localhost:3000/api/factura', {
      destinatarioNombre: data.nombre,
      total: data.costoEnvio,
      descripcion: data.descripcion,
      fecha: data.fechaEntrega,
      cancelada: false,
    });
  };

  const onSubmit = (data) => {
    axios
      .post('http://localhost:3000/api/paquetes', {
        nombre: data.nombre,
        descripcion: data.descripcion,
        peso: data.peso,
        cantidad: data.cantidad,
        costoEnvio: data.costoEnvio,
        remitente: data.remitente,
        destinatario: data.destinatario,
        fechaLlegada: data.fechaLlegada,
        fechaEntrega: data.fechaEntrega,
        tipo: data.tipo,
      })
      .then(({ data }) => {
        history.push('/paquetes');
        facturar(data.savePaquete);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={classes.root}>
      <DrawerSide title="Crear paquete" showCreate={false} />
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
            <Typography variant="h6">Descripcion</Typography>
            <TextField
              name="descripcion"
              required
              {...register('descripcion')}
              className={classes.formInput}
              variant="outlined"
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Peso</Typography>
            <TextField
              name="peso"
              required
              {...register('peso')}
              placeholder="999.99"
              type="number"
              className={classes.formInput}
              variant="outlined"
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Cantidad</Typography>
            <TextField
              name="cantidad"
              {...register('cantidad')}
              placeholder="999"
              required
              type="number"
              className={classes.formInput}
              variant="outlined"
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Costo</Typography>
            <TextField
              variant="outlined"
              required
              {...register('costoEnvio')}
              className={classes.formInput}
              value={values.costoEnvio}
              onChange={handleInputChange}
              name="costoEnvio"
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: CampoFormattedCosto,
              }}
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Remitente</Typography>
            <TextField
              name="remitente"
              {...register('remitente')}
              className={classes.formInput}
              variant="outlined"
              required
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Destinatario</Typography>
            <TextField
              name="destinatario"
              {...register('destinatario')}
              className={classes.formInput}
              variant="outlined"
              required
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Direccion - Destinatario</Typography>
            <TextField
              name="direccionDestinatario"
              {...register('direccionDestinatario')}
              className={classes.formInput}
              variant="outlined"
              required
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Fecha de llegada al almacen</Typography>
            <TextField
              name="fechaLlegada"
              {...register('fechaLlegada')}
              className={classes.formInput}
              variant="outlined"
              type="date"
              color="secondary"
              required
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Fecha de entrega</Typography>
            <TextField
              name="fechaEntrega"
              {...register('fechaEntrega')}
              className={classes.formInput}
              variant="outlined"
              type="date"
              required
            />
          </Box>
          <Box display="flex" className={classes.formContainer}>
            <Typography variant="h6">Estatus</Typography>
            <Select
              id="tipo-select"
              name="tipo"
              {...register('tipo')}
              className={classes.formInput}
              variant="outlined"
              value={tipo}
              onChange={handleChange}
            >
              <MenuItem value="Enviado">Enviado</MenuItem>
              <MenuItem value="Almacen">Almacen</MenuItem>
              <MenuItem value="Almacen de Origen">Almacen de Origen</MenuItem>
              <MenuItem value="Linea Aerea">Linea aerea</MenuItem>
              <MenuItem value="Aduanas">Aduanas</MenuItem>
            </Select>
          </Box>
          <Box display="flex" className={classes.btnContainer}>
            <Button type="submit" className={classes.guardarBtn}>
              Guardar
            </Button>
            <Button
              className={classes.guardarBtn}
              onClick={() => history.push('/paquetes')}
            >
              Cancelar
            </Button>
          </Box>
        </form>
      </main>
    </div>
  );
}

export default PaqueteCreate;
