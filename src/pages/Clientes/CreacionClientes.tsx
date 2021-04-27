import { Button, Form, Input, Select } from "antd";
import Title from "antd/lib/typography/Title";
import { remote } from "electron";
import { ICreateCliente } from "../../@types";
import { connection as conn } from "../../lib/DataBase";
import estados from "../../json/estados.json";
const { Option } = Select;

const CreacionClientes = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: ICreateCliente) => {
    try {
      const result = await (await conn).query(`
        INSERT INTO clientes (
            ClienteNombre,
            ClienteDireccion,
            ClienteEstado,
            ClienteTelefono
        ) VALUE(
            '${values.ClienteNombre}',
            '${values.ClienteDireccion}',
            '${values.ClienteEstado}',
            '${values.ClienteTelefono}'
        );
      `);

      new remote.Notification({
        title: "CLIENTE CREADO EXITOSAMENTE",
        body: `NUMERO DE CLIENTE: ${result.insertId}`,
      }).show();

      form.resetFields();
    } catch (error) {
      new remote.Notification({
        title: "ERROR AL CREAR EL CLIENTE COMUNICA A SISTEMAS",
        body: `ERROR DE CREACION DE CLIENTE`,
      }).show();
      console.log(error);
    }
  };
  return (
    <div className="container">
      <Title className="text-center">CREACION DE CLIENTES</Title>

      <div className="row mt-5">
        <div className="col-md-12">
          <Form
            name="creacionlote"
            onFinish={onFinish}
            form={form}
            layout="vertical"
          >
            <Form.Item
              label="Nombre"
              name="ClienteNombre"
              rules={[
                {
                  required: true,
                  message: "Ingresa el nombre del cliente",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Direccion"
              name="ClienteDireccion"
              rules={[
                { required: true, message: "Ingresa la direccion del cliente" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Estado"
              name="ClienteEstado"
              rules={[
                { required: true, message: "Ingresa el estado del cliente" },
              ]}
            >
              <Select bordered>
                {estados.map((a) => {
                  return (
                    <Option value={a.name.toUpperCase()}>
                      {a.name.toUpperCase()}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item
              label="Telefono"
              name="ClienteTelefono"
              rules={[
                { required: true, message: "Ingresa el telefono del cliente" },
              ]}
            >
              <Input type="tel" pattern="[0-9]{10}" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                CREAR CLIENTE
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreacionClientes;
