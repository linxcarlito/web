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
import moment from 'moment';
import axios from 'axios';
import FacturaRow from '../../components/FacturaRow';

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

const Facturas = () => {
  const classes = useStyles();
  const [data, setData] = React.useState([]);

  const fetchData = React.useCallback(async () => {
    await axios
      .get('http://localhost:3000/api/factura')
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  }, []);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const cancelFactura = async (id) => {
    await axios
      .put(`http://localhost:3000/api/factura/${id}`)
      .then(() => fetchData());
  };

  return (
    <>
      <div>
        <DrawerSide title="Facturas" showCreate={false} />
      </div>
      <div className={classes.content}>
        <TableContainer component={Paper}>
          <Table className={classes.table}>
            <TableHead className={classes.head}>
              <TableRow>
                <TableCell />
                <TableCell align="center" className={classes.cell}>
                  Fecha
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Destinatario
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  Total
                </TableCell>
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <FacturaRow
                  row={row}
                  classes={classes}
                  onCancel={cancelFactura}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Facturas;
