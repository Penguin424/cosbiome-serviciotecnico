import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import { useEffect, useState } from "react";
import useFiltersTables from "../../hooks/useFiltersTables";
import { connection as conn } from "../../lib/DataBase";
import { useHistory } from "react-router-dom";

interface IReparacionDB {
  ClienteNombre: string;
  ReparacionMotivo: string;
  MaqNombre: string;
  ClienteTelefono: string;
  ReparacionFecha: Date;
  MaquinaLote: number;
  ReparacionId: number;
}

const Reparaciones = () => {
  const [reparaciones, setReparaciones] = useState<IReparacionDB[]>([]);

  const dropMenuFilter = useFiltersTables();
  const history = useHistory();

  useEffect(() => {
    handleGetReparaciones();
  }, []);

  const handleGetReparaciones = async () => {
    const reparacionesDB: IReparacionDB[] = await (await conn).query(`
      select
	      ReparacionId,
        ReparacionFecha,
        ClienteNombre,
        ReparacionMotivo,
        MaqNombre,
        MaquinaLote,
        ClienteTelefono
      from reparaciones
      inner join clientes on ClienteId = ReparacionCliente
      inner join maquinas on MaquinaId = ReparacionMaquina
      inner join maquinasnombres on MaquinaNombre = MaqId
      where ReparacionCompletada = false;
    `);

    setReparaciones(reparacionesDB);
  };

  const columns: ColumnsType<IReparacionDB> = [
    {
      title: "ID REPARACION",
      ...dropMenuFilter("ReparacionId"),
      dataIndex: "ReparacionId",
    },
    {
      title: "CLIENTE",
      ...dropMenuFilter("ClienteNombre"),
      dataIndex: "ClienteNombre",
    },
    {
      title: "TELEFONO CLIENTE",
      ...dropMenuFilter("ClienteTelefono"),
      dataIndex: "ClienteTelefono",
    },
    {
      title: "MAQUINA",
      ...dropMenuFilter("MaqNombre"),
      dataIndex: "MaqNombre",
    },
    {
      title: "FECHA DE INGRESO",
      dataIndex: "ReparacionFecha",
      render: (value: Date, record) => {
        return moment(value).format("L");
      },
    },
    {
      title: "LOTE MAQUINA",
      dataIndex: "MaquinaLote",
    },

    {
      title: "Detalle",
      key: "action",
      render: (text: any, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              history.push(`/reparaciones/detalle/${record.ReparacionId}`);
            }}
            type="primary"
          >
            DETALLE DE REPARACION
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container">
      <Title className="text-center">REPARACIONES PENDIENTES</Title>

      <div className="row mt-5">
        <div className="col-md-12">
          <Table columns={columns} dataSource={reparaciones} />
        </div>
      </div>
    </div>
  );
};

export default Reparaciones;
