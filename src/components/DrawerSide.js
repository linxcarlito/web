import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useCookies, Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { useHistory, useLocation } from 'react-router-dom';
import {
  WalletOutlined,
  InboxOutlined,
  TeamOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
const drawerWidth = 260;

const { SubMenu } = Menu;

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
  },
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: 'red',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    justifyContent: 'center',
    backgroundColor: '#eee',
  },
  separador: {
    width: '260px',
    height: '5px',
    backgroundColor: '#FA0000',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  link: {
    textDecoration: 'none',
    color: '#000',
    '&:visited': {
      color: '#000',
    },
  },
  title: {
    color: '#fff',
    fontWeight: 600,
  },
  option: {
    fontSize: '1.5rem',
  },
  icon: {
    fontSize: '1.1rem !important',
  },
  addIcon: {
    fontSize: '2rem',
    color: 'white',
  },
}));

const DrawerSide = ({ title, showCreate = true, ...props }) => {
  const { window } = props;
  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const cookie = new Cookies();
  const drawer = (
    <div>
      <Menu
        onClick={() => {}}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
      >
        <Menu.Item>
          <Link to="/home" className={classes.option}>
            <Menu.Item key="1" icon={<HomeOutlined className={classes.icon} />}>
              Dashboard
            </Menu.Item>
          </Link>
        </Menu.Item>
        <div className={classes.separador} />
        <SubMenu
          key="sub2"
          icon={<InboxOutlined className={classes.icon} />}
          title="Almacen"
          className={classes.option}
        >
          <Menu.Item key="2">
            <Link to="/paquetes">Total de paquetes</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/paquetes/enviados">Paquetes enviados</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/paquetes/almacen">Paquetes en almacen</Link>
          </Menu.Item>
        </SubMenu>
        <div className={classes.separador} />
        <SubMenu
          key="sub4"
          icon={<TeamOutlined className={classes.icon} />}
          title="Clientes"
          className={classes.option}
        >
          <Menu.Item key="9">
            <Link to="/remitente">Remitente</Link>
          </Menu.Item>

          <Menu.Item key="10">
            <Link to="/destinatario">Destinatario</Link>
          </Menu.Item>
        </SubMenu>
        <div className={classes.separador} />

        <Menu.Item className={classes.option}>
          <Link to="/facturas">
            <Menu.Item
              key="11"
              icon={<WalletOutlined className={classes.icon} />}
            >
              Facturas
            </Menu.Item>
          </Link>
        </Menu.Item>
        <Menu.Item
          className={classes.option}
          onClick={() => cookie.remove('sesion')}
        >
          <Link to="/">
            <Menu.Item
              key="12"
              icon={<ExitToAppIcon className={classes.icon} />}
            >
              {' '}
              Log out
            </Menu.Item>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.container}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            {title}
            {showCreate ? (
              <IconButton aria-label="add">
                <AddIcon
                  className={classes.addIcon}
                  onClick={() => history.push(`${location.pathname}/create`)}
                />
              </IconButton>
            ) : null}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

export default DrawerSide;
