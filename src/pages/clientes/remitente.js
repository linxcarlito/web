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
import ClienteRow from '../../components/ClienteRow';
import axios from 'axios';

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

const Remitente = () => {
  const classes = useStyles();

  const [data, setData] = React.useState([]);
  const fetchData = React.useCallback(async () => {
    await axios
      .get('http://localhost:3000/api/remitente')
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteCliente = async (id) => {
    await axios
      .delete(`http://localhost:3000/api/remitente/${id}`)
      .then(() => fetchData());
  };

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div>
        <DrawerSide title="Remitente" arial="remitente" />
      </div>
      <div className={classes.content}>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center" className={classes.cell}>
                  Nombre
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  RNC
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Email
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <ClienteRow
                  row={row}
                  classes={classes}
                  onDelete={deleteCliente}
                  type="remitente"
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Remitente;
