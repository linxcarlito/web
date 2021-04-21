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

const ClienteRow = ({ row, classes, onDelete, onEdit, type }) => {
  const [open, setOpen] = React.useState(false);
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
        <TableCell align="center">{row.RNC}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">
          <IconButton size="small" onClick={() => onDelete(row._id)}>
            <DeleteIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => history.push(`${type}/edit/${row._id}`)}
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
                Telefono: <b>{row.telefono}</b>
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">
                País: <b>{row.pais}</b>
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle1">
                Dirección: <b>{row.direccion}</b>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ClienteRow;
