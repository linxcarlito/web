import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import DrawerSide from '../../components/DrawerSide';
import {
  Table,
  TableContainer,
  Paper,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
} from '@material-ui/core';
import axios from 'axios';
import PaqueteRow from '../../components/PaqueteRow';

const useStyles = makeStyles((theme) => ({
  head: {
    backgroundColor: '#ff0000',
  },
  row: {
    marginBottom: '1rem',
  },
  table: {
    padding: '',
  },
  content: {
    flexGrow: 1,
    marginLeft: '300px',
    marginRight: '50px',
    marginTop: '120px',
  },
  cell: {
    color: '#fff',
    fontWeight: 600,
    fontSize: '1.1rem',
  },
}));

const Paquetes = () => {
  const classes = useStyles();

  const [data, setData] = React.useState([]);

  const fetchData = React.useCallback(async () => {
    await axios
      .get('http://localhost:3000/api/paquetes')
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onDelete = async (id) => {
    await axios
      .delete(`http://localhost:3000/api/paquetes/${id}`)
      .then(() => fetchData());
  };

  return (
    <>
      <div>
        <DrawerSide title="Paquetes" arial="paquetes" />
      </div>
      <div className={classes.content}>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell />
                <TableCell align="center" className={classes.cell}>
                  Nombre
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Descripción
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Remitente
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Destinatario
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Costo de envío
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <PaqueteRow
                  row={row}
                  classes={classes}
                  type="paquetes"
                  onDelete={onDelete}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Paquetes;
