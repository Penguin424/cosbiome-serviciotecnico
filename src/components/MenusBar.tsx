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
  LocalDrinkOutlined,
  ListAltOutlined,
  People,
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
        title="INVENTARIOS"
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
          icon={<LocalDrinkOutlined style={{ fontSize: 19 }} />}
          style={{ fontSize: 12 }}
          title="ENVASES"
        >
          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1envases1"
            icon={<PostAddOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/envases/creacion">CREAR</Link>
          </Menu.Item>

          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1envases2"
            icon={<ListAltOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/envases/inventario">INVENTARIO</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub1productos"
          icon={<RestOutlined style={{ fontSize: 19 }} />}
          style={{ fontSize: 12 }}
          title="PRODUCTOS"
        >
          <Menu.Item
            style={{ fontSize: 14 }}
            key="sub1productos1"
            icon={<PostAddOutlined style={{ fontSize: 20 }} />}
          >
            <Link to="/productos/creacion">CREAR</Link>
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
