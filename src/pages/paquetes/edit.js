import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DrawerSide from '../../components/DrawerSide';
import { useForm } from 'react-hook-form';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import NumberFormat from 'react-number-format';
import moment from 'moment';

import Select from '@material-ui/core/Select';

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

function EditarPaquete() {
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  const [tipo, setTipo] = React.useState('');
  const [paquete, setPaquete] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { id } = useParams();
  const [values, setValues] = React.useState({});

  const handleInputChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleChange = (event) => {
    setTipo(event.target.value);
  };
  const onSubmit = (data) => {
    axios
      .put(`http://localhost:3000/api/paquetes/${id}`, {
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
      .then(() => history.push('/paquetes'))
      .catch((err) => console.log(err));
  };

  const fetchPaquete = React.useCallback(async () => {
    await axios
      .get(`http://localhost:3000/api/paquetes/${id}`)
      .then((response) => {
        setPaquete(response.data);
        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    fetchPaquete();
    console.log(paquete);
  }, [fetchPaquete]);

  return (
    <div className={classes.root}>
      <DrawerSide title="Editar Paquete" showCreate={false} />
      <main className={classes.content}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {loading ? (
            <>
              <Box display="flex" className={classes.formContainer}>
                <Typography variant="h6">Nombre</Typography>
                <TextField
                  name="nombre"
                  required
                  {...register('nombre')}
                  defaultValue={paquete.nombre}
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
                  defaultValue={paquete.descripcion}
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
                  defaultValue={paquete.peso}
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
                  defaultValue={paquete.cantidad}
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
                  defaultValue={paquete.costoEnvio}
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
                  defaultValue={paquete.remitente}
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
                  defaultValue={paquete.destinatario}
                />
              </Box>

              <Box display="flex" className={classes.formContainer}>
                <Typography variant="h6">
                  Fecha de llegada al almacen
                </Typography>
                <TextField
                  name="fechaLlegada"
                  {...register('fechaLlegada')}
                  className={classes.formInput}
                  variant="outlined"
                  type="date"
                  required
                  defaultValue={paquete.fechaLlegada}
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
                  defaultValue={moment(paquete.fechaEntrega).format()}
                  required
                  InputLabelProps={{ shrink: false }}
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
                  defaultValue={paquete.tipo}
                >
                  <MenuItem value="Enviado">Enviado</MenuItem>
                  <MenuItem value="Almacen">Almacen</MenuItem>
                  <MenuItem value="Almacen de Origen">
                    Almacen de Origen
                  </MenuItem>
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
            </>
          ) : null}
        </form>
      </main>
    </div>
  );
}

export default EditarPaquete;
