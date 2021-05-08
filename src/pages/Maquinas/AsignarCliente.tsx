import { Button, Form, Select } from "antd";
import Title from "antd/lib/typography/Title";
import { connection as conn } from "../../lib/DataBase";
import { remote } from "electron";
import { useEffect, useState } from "react";
import moment from "moment";

const { Option } = Select;
interface IAsignacionMaquina {
  maquina: number;
  cliente: number;
}

interface ClienteBasicModel {
  ClienteId: number;
  ClienteNombre: string;
}

interface MaquinaBasicModel {
  MaquinaId: number;
  MaqNombre: string;
}

const AsignarCliente = () => {
  const [clientes, setClientes] = useState<ClienteBasicModel[]>([]);
  const [maquinas, setMaquinas] = useState<MaquinaBasicModel[]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    handleGetClientesMaquinas();
  }, []);

  const onFinish = async (values: IAsignacionMaquina) => {
    try {
      await (await conn).query(`
        UPDATE maquinas SET 
          MaquinaCliente = ${values.cliente},
          MaquinaEntrega = '${moment().format("YY-MM-DD")}'
        WHERE MaquinaId = ${values.maquina};
      `);

      new remote.Notification({
        title: "ASGINACION DE MAQUINA EXITOSA",
        body: `MAQUINA NO. ${values.maquina} ASIGNADA AL CLIENTE ${
          clientes.filter((a) => a.ClienteId === values.cliente)[0]
            .ClienteNombre
        }`,
      }).show();

      handleGetClientesMaquinas();
      form.resetFields();
    } catch (error) {
      new remote.Notification({
        title: "ERROR AL CREAR EL MODELO COMUNICA A SISTEMAS",
        body: `ERROR DE CREACION DE MODELO`,
      }).show();
      console.log(error);
    }
  };

  const handleGetClientesMaquinas = async () => {
    const clientesDB = await (await conn).query(`
        SELECT
            ClienteId,
            ClienteNombre
        FROM clientes
        WHERE ClienteId != 1
        ORDER BY ClienteNombre;
    `);

    const maquinasDB = await (await conn).query(`
        select
            MaquinaId,
            MaqNombre
        from maquinas
        inner join clientes on ClienteId = MaquinaCLiente
        inner join maquinasnombres on MaquinaNombre = MaqId
        where ClienteId = 1
        order by MaqNombre;
    `);

    setMaquinas(maquinasDB);
    setClientes(clientesDB);
  };

  return (
    <div className="container">
      <Title className="text-center"> ASIGNAR MAQUINA A CLIENTE </Title>

      <div className="row mt-5">
        <div className="col-md-12">
          <Form
            name="creacionlote"
            onFinish={onFinish}
            form={form}
            layout="vertical"
          >
            <Form.Item
              label="CLIENTE"
              name="cliente"
              rules={[
                {
                  required: true,
                  message: "Es necesario agregar el cliente a asignar",
                },
              ]}
            >
              <Select>
                {clientes.map((a) => {
                  return (
                    <Option key={a.ClienteId + "C"} value={a.ClienteId}>
                      {a.ClienteNombre}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="MAQUINA"
              name="maquina"
              rules={[
                {
                  required: true,
                  message: "Es necesario agregar la maquina a asignar",
                },
              ]}
            >
              <Select>
                {maquinas.map((a) => {
                  return (
                    <Option key={a.MaquinaId + "M"} value={a.MaquinaId}>
                      {a.MaqNombre} - {a.MaquinaId + "M"}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                ASIGNAR MAQUINA
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AsignarCliente;
