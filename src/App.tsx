import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";

import Login from "./pages/Login";
import MenuPrincipal from "./pages/MenuPrincipal";
import MenuRouterMain from "./pages/MenuRouterMain";
import CrearLotes from "./pages/Lotes/CrearLotes";
import Lotes from "./pages/Lotes";
import DetalleLote from "./pages/Lotes/DetalleLote";
import CreacionClientes from "./pages/Clientes/CreacionClientes";
import Clientes from "./pages/Clientes";

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
        </MenuRouterMain>
      </Switch>
    </Router>
  );
};

export default App;
