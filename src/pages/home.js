import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CardDashboard from '../components/CardDashboard';
import Box from '@material-ui/core/Box';
import DrawerSide from '../components/DrawerSide';
import CourierSvg from '../assets/icons/courier.svg';
import axios from 'axios';
import { SvgIcon } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function Home() {
  const classes = useStyles();
  const [data, setData] = React.useState();
  const fetchData = React.useCallback(async () => {
    await axios
      .get('http://localhost:3000/api/paquetes/contador')
      .then((response) => setData(response.data));
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={classes.root}>
      <DrawerSide title="Dashboard" showCreate={false} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Box display="flex" flexBasis="33.3333%" flexWrap="wrap">
          {data ? (
            <>
              <CardDashboard
                cantidad={data.almacenOrigen.cantidad}
                title="Paquetes en almacen de origen"
              />
              <CardDashboard
                cantidad={data.almacenLineaAerea.cantidad}
                title="Paquetes en línea aérea"
              />
              <CardDashboard
                cantidad={data.almacenEnviados.cantidad}
                title="Paquetes entregados"
              />
              <CardDashboard
                cantidad={data.almacenAduanas.cantidad}
                title="Paquetes en Aduanas"
              />
              <CardDashboard
                cantidad={data.almacenPrincipal.cantidad}
                title="Paquetes en almacén principal"
              />
            </>
          ) : null}
        </Box>
        <SvgIcon />
        <img src={CourierSvg} alt="Courier Image" />
      </main>
    </div>
  );
}

export default Home;
