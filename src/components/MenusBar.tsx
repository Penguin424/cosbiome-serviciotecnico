import { Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  BarChartOutlined,
  DollarCircleOutlined,
  RestOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import {
  PostAddOutlined,
  ListAltOutlined,
  People,
  TabletAndroid,
  Build,
  AssignmentInd,
  Healing,
} from "@material-ui/icons/";
import SubMenu from "antd/lib/menu/SubMenu";
import { Link } from "react-router-dom";

const MenusBar = ({ setCollapsed, collapsed, online }: any) => {
  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Menu mode="inline" defaultSelectedKeys={["1"]}>
      <Menu.Item
        style={{ fontSize: 17 }}
        key="1"
        icon={<DesktopOutlined style={{ fontSize: 17 }} />}
      >
        <Link to="/home">INICIO</Link>
      </Menu.Item>
      <SubMenu
        key="sub0"
        icon={<ShoppingCartOutlined style={{ fontSize: 17 }} />}
        title="INVENTARIOS"
      >
        <Menu.Item
          style={{ fontSize: 14 }}
          key="sub00"
          icon={<PostAddOutlined style={{ fontSize: 20 }} />}
        >
          <Link to="/lotes/crear">NUEVO LOTE</Link>
        </Menu.Item>
        <Menu.Item
          style={{ fontSize: 14 }}
          key="sub01"
          icon={<ListAltOutlined style={{ fontSize: 20 }} />}
        >
          <Link to="/lotes">LOTES</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="sub1"
        icon={<DatabaseOutlined style={{ fontSize: 17 }} />}
        title="FUNCIONALIDADES"
      >
        <SubMenu
          key="sub1materia"
          icon={<People style={{ fontSize: 20 }} />}
          style={{ fontSize: 12 }}
          title="CLIENTES"
        >
          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1materia1"
            icon={<PostAddOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/clientes/creacion">CREAR</Link>
          </Menu.Item>

          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1materia2"
            icon={<ListAltOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/clientes">CRM</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub1envases"
          icon={<TabletAndroid style={{ fontSize: 19 }} />}
          style={{ fontSize: 12 }}
          title="MAQUINAS"
        >
          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1envases1"
            icon={<Build style={{ fontSize: 20 }} />}
          >
            <Link to="/maquinas/reparacion">REPARACION</Link>
          </Menu.Item>
          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1envases2"
            icon={<ListAltOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/maquinas">LISTADO GENERAL</Link>
          </Menu.Item>
          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1envases3"
            icon={<PostAddOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/maquinas/modelos">AGREGAR MODELOS</Link>
          </Menu.Item>
          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1envases4"
            icon={<AssignmentInd style={{ fontSize: 20 }} />}
          >
            <Link to="/maquinas/asignar">ASIGNAR MAQUINA A CLIENTE</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub1productos"
          icon={<Healing style={{ fontSize: 22 }} />}
          style={{ fontSize: 12 }}
          title="REPERACIONES/MANTENIMIENTOS"
        >
          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1productos1"
            icon={<Build style={{ fontSize: 20 }} />}
          >
            <Link to="/reparaciones/pendientes">REPARACIONES PENDIENTES</Link>
          </Menu.Item>

          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1productos2"
            icon={<ListAltOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/productos/inventario">INVENTARIO</Link>
          </Menu.Item>
        </SubMenu>

        <Menu.Item
          style={{ fontSize: 14 }}
          key="sb13"
          icon={<DollarCircleOutlined style={{ fontSize: 14 }} />}
        >
          <Link to="/ProductoTerminado">PRODUCTO TERMINADO</Link>
        </Menu.Item>
      </SubMenu>

      <Menu.Item
        style={{ fontSize: 17 }}
        key="3"
        icon={<BarChartOutlined style={{ fontSize: 17 }} />}
      >
        REPORTES
      </Menu.Item>
      <Menu.Item
        onClick={toggle}
        style={{ fontSize: 17 }}
        key="4"
        icon={
          collapsed ? (
            <MenuUnfoldOutlined style={{ fontSize: 17 }} />
          ) : (
            <MenuFoldOutlined style={{ fontSize: 17 }} />
          )
        }
      ></Menu.Item>
    </Menu>
  );
};

export default MenusBar;
