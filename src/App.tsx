import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import "./assets/css/style.css";

import Login from "./pages/Login";
import MenuPrincipal from "./pages/MenuPrincipal";
import MenuRouterMain from "./pages/MenuRouterMain";
import CrearLotes from "./pages/Lotes/CrearLotes";
import Lotes from "./pages/Lotes";
import DetalleLote from "./pages/Lotes/DetalleLote";
import CreacionClientes from "./pages/Clientes/CreacionClientes";
import Clientes from "./pages/Clientes";
import DetalleCliente from "./pages/Clientes/DetalleCliente";
import Maquinas from "./pages/Maquinas";
import Reparacion from "./pages/Maquinas/Reparacion";
import ModelosAdd from "./pages/Maquinas/ModelosAdd";
import AsignarCliente from "./pages/Maquinas/AsignarCliente";
import Reparaciones from "./pages/ReparacionesMan/Reparaciones";
import DetalleReparacion from "./pages/ReparacionesMan/DetalleReparacion";
import DetalleMaquina from "./pages/Maquinas/DetalleMaquina";
import ScannerMaquina from "./pages/Maquinas/ScannerMaquina";
import MaquinaExterna from "./pages/Maquinas/MaquinaExterna";
import ListaReparaciones from "./pages/ReparacionesMan/ListaReparaciones";
import ReporteDiasReparacion from "./pages/reportes/ReporteDiasReparacion";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <MenuRouterMain>
          <Route exact path="/menu" component={MenuPrincipal} />
          <Route exact path="/lotes/crear" component={CrearLotes} />
          <Route exact path="/lotes" component={Lotes} />
          <Route exact path="/lotes/detalle/:id" component={DetalleLote} />
          <Route exact path="/clientes/creacion" component={CreacionClientes} />
          <Route exact path="/clientes" component={Clientes} />
          <Route
            exact
            path="/clientes/detalle/:id"
            component={DetalleCliente}
          />
          <Route exact path="/maquinas" component={Maquinas} />
          <Route exact path="/maquinas/reparacion" component={Reparacion} />
          <Route exact path="/maquinas/modelos" component={ModelosAdd} />
          <Route exact path="/maquinas/asignar" component={AsignarCliente} />
          <Route exact path="/maquinas/externa" component={MaquinaExterna} />
          <Route exact path="/maquinas/scanner" component={ScannerMaquina} />
          <Route
            exact
            path="/maquinas/detalle/:id"
            component={DetalleMaquina}
          />
          <Route
            exact
            path="/reparaciones/pendientes"
            component={Reparaciones}
          />
          <Route
            exact
            path="/reparaciones/lista"
            component={ListaReparaciones}
          />
          <Route
            exact
            path="/reparaciones/detalle/:id"
            component={DetalleReparacion}
          />
          <Route
            exact
            path="/reportes/reparacionesdias"
            component={ReporteDiasReparacion}
          />
        </MenuRouterMain>
      </Switch>
    </Router>
  );
};

export default App;
