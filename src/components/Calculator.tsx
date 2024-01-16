import { Button, Card, Col, Form, InputNumber, Row, Select } from 'antd';

type CalcProps = {
  setFacturas: Function;
};

const init = { minimo: 20000, maximo: '191000', total: 500000, mult: 1000 };

const Calculator = ({ setFacturas }: CalcProps): JSX.Element => {
  const onFinish = (values: any) => {
    setFacturas(calcular(values.minimo, values.maximo, values.total, values.mult));
  };

  return (
    <Card>
      <Form {...layout} initialValues={init} onFinish={onFinish}>
        <Row>
          <Col xs={24} sm={12}>
            <Form.Item label="Min" name="minimo" rules={[{ required: true, message: 'Ingrese el valor de la factura minima!' }]}>
              <InputNumber addonAfter="ARS" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Max" name="maximo" rules={[{ required: true, message: 'Ingrese el valor de la factura maxima!' }]}>
              <Select>
                <Select.Option value="191000">$191.000 (CC/TC/etc.)</Select.Option>
                <Select.Option value="95000">$95.000 (Contado)</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={12}>
            <Form.Item label="Total" name="total" rules={[{ required: true, message: 'Ingrese el valor total a facturar!' }]}>
              <InputNumber addonAfter="ARS" style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item label="Multiplo" name="mult" rules={[{ required: true, message: 'Ingrese el multiplo!' }]}>
              <Select>
                <Select.Option value="1000">1000</Select.Option>
                <Select.Option value="5000">5000</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit">Calcular</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const layout = {
  labelCol: { xs: { span: 24 }, sm: { span: 8 }, md: { span: 4 }, lg: { span: 4 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 8 }, md: { span: 8 }, lg: { span: 8 } },
};
const tailLayout = {
  wrapperCol: { xs: { span: 24 }, sm: { span: 4, offset: 16 }, md: { span: 4, offset: 16 }, lg: { span: 4, offset: 16 } },
};

const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);

const calcular = (minimo: number, maximo: number, facturar: number, mult: number): Array<number> => {
  const myValues: Array<number> = [];
  let myTotal = 0;

  while (facturar - myTotal > maximo) {
    const rnd = Math.ceil(random(minimo, maximo) / mult) * mult;

    myTotal += rnd;
    myValues.push(rnd);
  }

  let diferencia = facturar - myTotal;

  if (diferencia <= maximo && diferencia >= minimo) {
    myValues.push(diferencia);
    myTotal += diferencia;
  } else {
    let pos = 0;
    while (diferencia > 0) {
      const valor = Math.ceil(diferencia / (myValues.length - pos) / mult) * mult;
      if (myValues[pos] + valor <= maximo) {
        myValues[pos] += valor;
        diferencia -= valor;
      }
      pos < myValues.length - 1 ? pos++ : (pos = 0);
    }
  }

  return myValues;
};

export default Calculator;
