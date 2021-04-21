import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    padding: theme.spacing(1),
    width: '220px',
    height: '150px',
    backgroundColor: 'red',
    borderRadius: 20,
    textAlign: 'center',
    color: 'white',
    margin: theme.spacing(2),
  },
  boxes: {
    fill: '#fff',
  },
  cantidad: {
    color: 'white',
    fontWeight: 500,
  },
  icon: {
    position: 'absolute',
    right: 24,
    top: 24,
  },
  title: {
    fontWeight: 600,
    fontSize: '1.1rem',
  },
}));
const CardDashboard = ({ cantidad, title }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <SvgIcon className={classes.icon}>
        <svg width="24" height="24" className={classes.boxes}>
          <path d="M18 10.031v-6.423l-6.036-3.608-5.964 3.569v6.499l-6 3.224v7.216l6.136 3.492 5.864-3.393 5.864 3.393 6.136-3.492v-7.177l-6-3.3zm-1.143.036l-4.321 2.384v-4.956l4.321-2.539v5.111zm-4.895-8.71l4.272 2.596-4.268 2.509-4.176-2.554 4.172-2.551zm-.569 6.134v4.96l-4.25-2.421v-5.134l4.25 2.595zm-5.83 14.842l-4.421-2.539v-5.176l4.421 2.595v5.12zm-3.773-8.702l4.778-2.53 4.237 2.417-4.668 2.667-4.347-2.554zm4.917 3.587l4.722-2.697v5.056l-4.722 2.757v-5.116zm10.586 5.115l-4.722-2.757v-5.116l4.722 2.754v5.119zm-4.074-8.861l4.247-2.39 4.769 2.594-4.367 2.509-4.649-2.713zm9.638 6.323l-4.421 2.539v-5.116l4.421-2.538v5.115z" />
        </svg>
      </SvgIcon>
      <Typography variant="h4" className={classes.cantidad}>
        {cantidad}
      </Typography>
      <Typography className={classes.title}>{title}</Typography>
    </Box>
  );
};

export default CardDashboard;
