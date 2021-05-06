import Title from "antd/lib/typography/Title";
import { Button, Form, Input } from "antd";
import { connection as conn } from "../../lib/DataBase";
import { remote } from "electron";

interface IModeloAdd {
  modelo: string;
}

const ModelosAdd = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: IModeloAdd) => {
    try {
      const result = await (await conn).query(`
        INSERT INTO maquinasnombres (MaqNombre) VALUES(
          '${values.modelo}'
        );
      `);

      new remote.Notification({
        title: "MODELO CREADO EXITOSAMENTE",
        body: `NUMERO DEL MODELO: ${result.insertId}`,
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

  return (
    <div className="container">
      <Title className="text-center">AGREGAR MODELOS DE MAQUINAS</Title>

      <div className="row mt-5">
        <div className="col-md-12">
          <Form
            name="creacionlote"
            onFinish={onFinish}
            form={form}
            layout="vertical"
          >
            <Form.Item
              label="Nombre Del Modelo"
              name="modelo"
              rules={[
                {
                  required: true,
                  message: "Ingresa el nombre del modelo",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                CREAR MODELO
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ModelosAdd;
