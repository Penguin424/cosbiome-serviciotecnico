import { AutoComplete, Button, Form } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import { useEffect, useState } from "react";
import { connection as conn } from "../../lib/DataBase";
import { remote } from "electron";

interface IAutoCompleteOp {
  label: string;
  value: number;
}

interface IFormCompleteMaqExtern {
  cliente: number;
  modelo: number;
  descripcion: string;
}

const MaquinaExterna = () => {
  const [modelos, setModelos] = useState<IAutoCompleteOp[]>([]);
  const [clientes, setClientes] = useState<IAutoCompleteOp[]>([]);
  const [modelosS, setModelosS] = useState<IAutoCompleteOp[]>([]);
  const [clientesS, setClientesS] = useState<IAutoCompleteOp[]>([]);

  const [form] = Form.useForm();

  useEffect(() => {
    handleGetClas();
  }, []);

  const handleGetClas = async () => {
    const modelosDB: IAutoCompleteOp[] = await (
      await conn
    ).query(`

      select MaqId as value, MaqNombre as label from maquinasnombres;

    `);

    const clientesDB: IAutoCompleteOp[] = await (
      await conn
    ).query(`

      select ClienteId as value, ClienteNombre as label from clientes where ClienteId != 1;

    `);

    setModelos(modelosDB);
    setClientes(clientesDB);
    setModelosS(modelosDB);
    setClientesS(clientesDB);
  };

  const handleSearchCliente = (searchText: string) => {
    setClientesS(
      !searchText
        ? clientes
        : clientes.filter((cl) =>
            cl.label.trim().toLowerCase().includes(searchText)
          )
    );
  };

  const handleSearchModelo = (searchText: string) => {
    setModelosS(
      !searchText
        ? modelos
        : modelos.filter((mo) =>
            mo.label.trim().toLowerCase().includes(searchText)
          )
    );
  };

  const handleSubmitExternMaq = async (values: IFormCompleteMaqExtern) => {
    try {
      const total: { total: number }[] = await (
        await conn
      ).query(`

        select COUNT(*) as 'total' from maquinas where MaquinaLote = 1;        

      `);

      const result = await (
        await conn
      ).query(`

        INSERT INTO maquinas (
          MaquinaNombre,
          MaquinaDescripcion,
          MaquinaLote,
          MaquinaCliente,
          MaquinaIdLote
        ) VALUES (
          ${values.modelo},
          '${values.descripcion}',
          1,
          ${values.cliente},
          ${total[0].total}
        );

      `);

      new remote.Notification({
        title: "MAQUINA REGISTRADA EXITOSAMENTE",
        body: `CODIGO DE MAQUINA: ${result.insertId}`,
      }).show();

      form.resetFields();
    } catch (error) {
      new remote.Notification({
        title: "ERROR AL RESGISTRAR LA MAQUINA COMUNICA A SISTEMAS",
        body: `ERROR DE MAQUINA`,
      }).show();
    }
  };

  return (
    <div className="container">
      <Title className="text-center">AGREGAR MAQUINA EXTERNA DE COSBIOME</Title>

      <div className="row mt-5">
        <div className="col-md-12">
          <Form
            name="maquinaexterna"
            form={form}
            layout="vertical"
            onFinish={handleSubmitExternMaq}
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
                onSearch={handleSearchCliente}
                options={clientesS}
              />
            </Form.Item>
            <Form.Item
              label="MODELO DE MAQUINA"
              name="modelo"
              rules={[
                {
                  required: true,
                  message: "Es necesario agregar el modelo de la maquina",
                },
              ]}
            >
              <AutoComplete onSearch={handleSearchModelo} options={modelosS} />
            </Form.Item>
            <Form.Item
              label="Descripcion"
              name="descripcion"
              rules={[
                {
                  required: true,
                  message: "Es necesario agregar el modelo de la maquina",
                },
              ]}
            >
              <TextArea />
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

export default MaquinaExterna;
