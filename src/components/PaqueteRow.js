import React from 'react';
import {
  TableRow,
  TableCell,
  IconButton,
  Box,
  Typography,
  Collapse,
} from '@material-ui/core/';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const PaqueteRow = ({ row, classes, onDelete, onEdit, type }) => {
  const [open, setOpen] = React.useState(false);
  console.log(row.costoEnvio);
  const history = useHistory();
  return (
    <React.Fragment>
      <TableRow className={classes.row} key={row.RNC}>
        <TableCell width="12px">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">{row.nombre}</TableCell>
        <TableCell align="center">{row.descripcion}</TableCell>
        <TableCell align="center">{row.remitente}</TableCell>
        <TableCell align="center">{row.destinatario}</TableCell>
        <TableCell align="center">{row.costoEnvio}</TableCell>
        <TableCell align="center">
          <IconButton size="small" onClick={() => onDelete(row._id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => history.push(`/paquetes/edit/${row._id}`)}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Información
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">
                Fecha de Entrega:{' '}
                <b>
                  {moment(row.fechaEntrega).format('MMMM Do YYYY, h:mm:ss a')}
                </b>
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">
                Tipo: <b>{row.tipo}</b>
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">
                Fecha de Llegada:{' '}
                <b>
                  {moment(row.fechaLlegada).format('MMMM Do YYYY, h:mm:ss a')}
                </b>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default PaqueteRow;
