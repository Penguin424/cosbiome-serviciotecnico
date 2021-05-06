import { AutoComplete, Button, Form, Input } from "antd";
import Title from "antd/lib/typography/Title";
import { connection as conn } from "../../lib/DataBase";
import { remote } from "electron";
import { useEffect, useState } from "react";

interface IOptionsAutoC {
  label: string;
  value: number;
}

interface ClienteBasicModel {
  ClienteId: number;
  ClienteNombre: string;
}

interface MaquinaBasicModel {
  MaquinaId: number;
  MaqNombre: string;
  MaquinaCliente: number;
}

interface IFormReparacion {
  cliente: number;
  maquina: number;
  costoIncial: number;
  motivo: string;
}

const Reparacion = () => {
  const [optionsC, setOptionsC] = useState<IOptionsAutoC[]>([]);
  const [clientes, setClientes] = useState<ClienteBasicModel[]>([]);
  const [maquinas, setMaquinas] = useState<MaquinaBasicModel[]>([]);
  const [maquinasFake, setMaquinasFake] = useState<MaquinaBasicModel[]>([]);
  const [optionsM, setOptionsM] = useState<IOptionsAutoC[]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    handleGetClientesMaquinas();
  }, []);

  const onFinish = async (values: IFormReparacion) => {
    try {
      values.costoIncial = parseInt(values.costoIncial.toString());
      console.log(values);

      const result = await (await conn).query(`
        insert into reparaciones (
          ReparacionCliente,
          ReparacionMAquina,
          ReparacionCostoInicial,
          ReparacionMotivo
        ) values(
          ${values.cliente},
          ${values.maquina},
          ${values.costoIncial},
          '${values.motivo}'
        );
      `);

      await (await conn).query(`
        UPDATE maquinas SET MaquinaReparacion = true
        WHERE MaquinaId = ${values.maquina};
      `);

      new remote.Notification({
        title: "REPARACION AGENDADA EXITOSAMENTE",
        body: `ID DE REPARACION: ${result.insertId}`,
      }).show();

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
    const clientesDB: ClienteBasicModel[] = await (await conn).query(`
      SELECT
          ClienteId,
          ClienteNombre
      FROM clientes
      WHERE ClienteId != 1
      ORDER BY ClienteNombre;
    `);

    const maquinasDB: MaquinaBasicModel[] = await (await conn).query(`
      select
          MaquinaId,
          MaqNombre,
          MaquinaCliente
      from maquinas
      inner join clientes on ClienteId = MaquinaCLiente
      inner join maquinasnombres on MaquinaNombre = MaqId
      where ClienteId != 1 AND MaquinaReparacion = false
      order by MaqNombre;
    `);

    setOptionsC(
      clientesDB.map((a) => {
        return {
          value: a.ClienteId,
          label: a.ClienteNombre,
        };
      })
    );

    setMaquinas(maquinasDB);
    setClientes(clientesDB);
  };

  const handleSearchCliente = (searchText: string) => {
    setOptionsC(
      !searchText
        ? []
        : clientes
            .filter((a) =>
              a.ClienteNombre.toLowerCase().trim().includes(searchText)
            )
            .map((a) => {
              return {
                value: a.ClienteId,
                label: a.ClienteNombre,
              };
            })
    );
  };

  const handleSearchMaquina = (searchText: string) => {
    setOptionsM(
      !searchText
        ? []
        : maquinasFake
            .filter((a) =>
              a.MaqNombre.toLowerCase().trim().includes(searchText)
            )
            .map((a) => {
              return {
                label: a.MaqNombre,
                value: a.MaquinaId,
              };
            })
    );
  };

  const handleSelectCliente = (data: number | string) => {
    setMaquinasFake(maquinas.filter((a) => a.MaquinaCliente === data));
    setOptionsM(
      maquinas
        .filter((a) => a.MaquinaCliente === data)
        .map((a) => {
          return {
            value: a.MaquinaId,
            label: a.MaqNombre,
          };
        })
    );
  };

  return (
    <div className="container">
      <Title className="text-center">ENTRADA A REPARACION</Title>

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
              <AutoComplete
                onSelect={handleSelectCliente}
                onSearch={handleSearchCliente}
                options={optionsC}
              />
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
              <AutoComplete onSearch={handleSearchMaquina} options={optionsM} />
            </Form.Item>

            <Form.Item
              label="COSTO INICIAL"
              name="costoIncial"
              rules={[
                {
                  required: true,
                  message: "Es necesario agregar el costo inicial",
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
                  message:
                    "Es necesario agregar el motivo por el cual se hace la reparacion",
                },
              ]}
            >
              <Input.TextArea />
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

export default Reparacion;
