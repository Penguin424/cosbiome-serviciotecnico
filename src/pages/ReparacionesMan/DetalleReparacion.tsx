import { Button, Form, Input, List, Space, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connection as conn } from "../../lib/DataBase";
import { remote } from "electron";
import TextArea from "antd/lib/input/TextArea";

interface IDetalleReparacion {
  [key: string]: any;
  MaqNombre: string;
  ClienteTelefono: string;
  ClienteNombre: string;
  ClienteDireccion: string;
  ReparacionCostoTotal: number;
  ReparacionMotivo: string;
  ReparacionCostoInicial: number;
  MaquinaId: number;
  ReparacionId: number;
  ReparacionFecha: Date;
  ReparacionEntrega: Date;
  ReparacionMetodoPago: string;
}

const DetalleReparacion = () => {
  const [reparacion, setReparacion] = useState<IDetalleReparacion>({
    MaqNombre: "",
    ClienteTelefono: "",
    ClienteNombre: "",
    ClienteDireccion: "",
    ReparacionMotivo: "",
    ReparacionCostoTotal: 0,
    ReparacionCostoInicial: 0,
    MaquinaId: 0,
    ReparacionId: 0,
    ReparacionFecha: new Date(),
    ReparacionEntrega: new Date(),
    ReparacionMetodoPago: "",
  });

  const params = useParams<{ id: string }>();
  const history = useHistory();
  const [form] = Form.useForm();

  useEffect(() => {
    handleGetReparacion();
    // eslint-disable-next-line
  }, []);

  const handleGetReparacion = async () => {
    const reparacionDB: IDetalleReparacion[] = await (
      await conn
    ).query(`
      select 
	      ReparacionId,
	      ReparacionFecha,
	      ReparacionCostoInicial,
	      ReparacionCostoTotal,
        ReparacionMotivo,
	      ClienteNombre,
	      ClienteDireccion,
	      ClienteTelefono,
	      MaquinaId,
	      MaqNombre,
        ReparacionEntrega,
        ReparacionMetodoPago
      from reparaciones
      inner join clientes on ClienteId = ReparacionCliente
      inner join maquinas on MaquinaId = ReparacionMaquina
      inner join maquinasnombres on MaquinaNombre = MaqId
      where ReparacionId = ${params.id};
    `);

    console.log(reparacionDB[0].ReparacionMotivo);

    setReparacion(reparacionDB[0]);
  };

  const onFinish = async (values: {
    total: string;
    fecha: string;
    motivo: string;
  }) => {
    try {
      await (
        await conn
      ).query(`
        UPDATE reparaciones
        SET 
          ReparacionCostoTotal = ${parseInt(values.total)},
          ReparacionEntrega = '${moment().format("YY-MM-DD")}',
          ReparacionMotivo = '${values.motivo}',
          ReparacionCompletada = true
        WHERE ReparacionId = ${params.id};
      `);

      await (
        await conn
      ).query(`
        UPDATE maquinas SET MaquinaReparacion = false
        WHERE MaquinaId = ${reparacion.MaquinaId};
      `);

      new remote.Notification({
        title: "REPARACION COMPLETADA",
        body: `REPARACION NO. ${params.id} COMPLETADA`,
      }).show();

      form.resetFields();
      history.goBack();
    } catch (error) {
      new remote.Notification({
        title: "ERROR AL COMPLETAR LA REPACION",
        body: "ERROR DE COMPLETADO EN REPARACION COMUNICA A SISTEMAS",
      }).show();
      console.log(error);
    }
  };

  const handleUpdateDateTotal = async () => {
    try {
      const data: { total: string; fecha: string; motivo: string } =
        form.getFieldsValue();

      await (
        await conn
      ).query(`
        UPDATE reparaciones
        SET
          ReparacionCostoTotal = ${parseInt(data.total)},
          ReparacionEntrega = '${moment(data.fecha).format("YY-MM-DD")}',
          ReparacionMotivo = '${data.motivo}'
        WHERE ReparacionId = ${params.id};
      `);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Title className="text-center">DETALLE DE LA REPACION</Title>

      <div className="row mt-5">
        <div className="col-md-12">
          <List
            header="DETALLE DE LA REPARACION"
            footer={`COSBIOME @${moment().get("year")}`}
            bordered
            dataSource={Object.keys(reparacion)}
            renderItem={(item: string) => {
              if (typeof reparacion[item] === "object") {
                return (
                  <List.Item>{`${item}: ${moment(reparacion[item]).format(
                    "L"
                  )}`}</List.Item>
                );
              } else {
                return (
                  <List.Item>{`${item}: ${reparacion[
                    item
                  ].toString()}`}</List.Item>
                );
              }
            }}
          />
        </div>
      </div>

      {reparacion.ReparacionMotivo !== "" ? (
        <div className="row mt-5 mb-5">
          <div className="col-md-12">
            <Form
              name="reparacionterminada"
              initialValues={{
                fecha: moment(reparacion.ReparacionEntrega).format(
                  "YYYY-MM-DD"
                ),
                total: reparacion.ReparacionCostoTotal,
                motivo: reparacion.ReparacionMotivo,
              }}
              layout="vertical"
              form={form}
              onFinish={onFinish}
            >
              <Form.Item
                label="TOTAL DE LA REPARACION"
                name="total"
                rules={[
                  {
                    required: true,
                    message:
                      "Es necesario agregar el total a cobrar de la reparacion",
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                label="MOTIVO DE LA REPARACION"
                name="motivo"
                rules={[
                  {
                    required: true,
                    message: "Es necesario agregar el motivo de la reparacion",
                  },
                ]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item
                label="FECHA DE ENTREGA DE LA MAQUINA"
                name="fecha"
                rules={[
                  {
                    required: true,
                    message:
                      "Es necesario agregar la fecha de entrega de la reparacion",
                  },
                ]}
              >
                <Input type="date" />
              </Form.Item>
              <Space>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    COMPLETAR REPARACION
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    onClick={() => handleUpdateDateTotal()}
                    type="default"
                    htmlType="button"
                  >
                    ACTUALIZAR
                  </Button>
                </Form.Item>
              </Space>
            </Form>
          </div>
        </div>
      ) : (
        <div className="row mt-5">
          <div className="col-md-4 offset-md-4">
            <Spin />
          </div>
        </div>
      )}
    </div>
  );
};

export default DetalleReparacion;
