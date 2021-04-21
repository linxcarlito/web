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
import CancelIcon from '@material-ui/icons/Cancel';
import moment from 'moment';

const FacturaRow = ({ row, classes, onCancel }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow
        className={classes.row}
        key={row.RNC}
        style={row.cancelada ? { backgroundColor: '#eee' } : null}
      >
        <TableCell width="12px">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center">
          {moment(row.fecha).format('MMMM Do YYYY, h:mm:ss a')}
        </TableCell>
        <TableCell align="center">{row.destinatarioNombre}</TableCell>
        <TableCell align="center">{row.total}</TableCell>
        <TableCell align="center">
          <IconButton
            size="small"
            onClick={() => onCancel(row._id)}
            disabled={Boolean(row.cancelada)}
          >
            <CancelIcon />
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
                Descripcion: <b>{row.descripcion}</b>
              </Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default FacturaRow;
