import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/home';
import Almacen from './pages/paquetes/almacen';
import Paquetes from './pages/paquetes/paquetes';
import PaquetesEnviados from './pages/paquetes/paquetesEnviados';
import Facturas from './pages/facturas/facturas';
import PaqueteCreate from './pages/paquetes/create';
import Destinatario from './pages/clientes/destinatario';
import CreateDestinatario from './pages/clientes/create';
import EditDestinatario from './pages/clientes/editDestinatario';
import EditRemitente from './pages/clientes/editRemitente';
import Remitente from './pages/clientes/remitente';
import CreateRemitente from './pages/clientes/createRemitente';
import EditarPaquete from './pages/paquetes/edit';
import Auth from './pages/auth';
import RutaPrivada from './components/RutaPrivada';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <RutaPrivada path="/home" component={Home} />
          <RutaPrivada path="/paquetes" component={Paquetes} exact />
          <RutaPrivada path="/paquetes/almacen" exact component={Almacen} />
          <RutaPrivada
            path="/paquetes/enviados"
            exact
            component={PaquetesEnviados}
          />
          <RutaPrivada
            path={[
              '/paquetes/create',
              '/paquetes/enviados/create',
              '/paquetes/almacen/create',
            ]}
            exact
            component={PaqueteCreate}
          />
          <RutaPrivada path="/facturas" exact component={Facturas} />
          <RutaPrivada path="/destinatario" exact component={Destinatario} />
          <RutaPrivada
            path="/destinatario/create"
            exact
            component={CreateDestinatario}
          />
          <RutaPrivada
            path="/destinatario/edit/:id"
            exact
            component={EditDestinatario}
          />
          <RutaPrivada
            path="/remitente/create"
            exact
            component={CreateRemitente}
          />
          <RutaPrivada path="/remitente" exact component={Remitente} />
          <RutaPrivada
            path="/remitente/edit/:id"
            exact
            component={EditRemitente}
          />
          <RutaPrivada
            path="/paquetes/edit/:id"
            exact
            component={EditarPaquete}
          />
          <Route path="/" exact>
            <Auth />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
