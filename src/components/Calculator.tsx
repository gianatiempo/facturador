import { Button, Card, Form, InputNumber, Select } from 'antd';

type CalcProps = {
  setFacturas: Function;
};

const Calculator = ({ setFacturas }: CalcProps): JSX.Element => {
  const onFinish = (values: any) => {
    setFacturas(calcular(values.minimo, values.maximo, values.total, values.mult));
  };

  return (
    <Card>
      <Form name="basic" {...layout} initialValues={init} onFinish={onFinish}>
        <Form.Item label="Min" name="minimo" rules={[{ required: true, message: 'Ingrese el valor de la factura minima!' }]}>
          <InputNumber addonAfter="ARS" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Max" name="maximo" rules={[{ required: true, message: 'Ingrese el valor de la factura maxima!' }]}>
          <InputNumber addonAfter="ARS" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Total" name="total" rules={[{ required: true, message: 'Ingrese el valor total a facturar!' }]}>
          <InputNumber addonAfter="ARS" style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item label="Multiplo" name="mult" rules={[{ required: true, message: 'Ingrese el multiplo!' }]}>
          <Select>
            <Select.Option value="100">100</Select.Option>
            <Select.Option value="1000">1000</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button htmlType="submit">Calcular</Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

const init = { minimo: 20000, maximo: 61000, total: 500000, mult: 100 };

const layout = {
  labelCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 8 }, lg: { span: 8 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 }, md: { span: 12 }, lg: { span: 12 } },
};
const tailLayout = {
  wrapperCol: { xs: { span: 24 }, sm: { span: 12, offset: 12 }, md: { span: 12, offset: 8 }, lg: { span: 12, offset: 8 } },
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
