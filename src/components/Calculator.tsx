import { Button, Card, Form, InputNumber, Select } from 'antd';
import { calcular } from '../utils';

const Calculator = ({ setFacturas }: { setFacturas: Function }) => (
  <Card>
    <Form
      initialValues={{ minimo: 20000, maximo: '191000', total: 500000, mult: '1000' }}
      onFinish={(values: any) => setFacturas(calcular(values.minimo, values.maximo, values.total, values.mult))}
    >
      <Form.Item label="Min" name="minimo" rules={[{ required: true, message: 'Ingrese el valor de la factura minima!' }]}>
        <InputNumber
          addonAfter="ARS"
          style={{ width: '100%' }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          parser={(value) => value!.replace(/\$\s?|(.*)/g, '')}
        />
      </Form.Item>
      <Form.Item label="Max" name="maximo" rules={[{ required: true, message: 'Ingrese el valor de la factura maxima!' }]}>
        <Select>
          <Select.Option value="191000">$191.000 (CC/TC/etc.)</Select.Option>
          <Select.Option value="95000">$95.000 (Contado)</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Total" name="total" rules={[{ required: true, message: 'Ingrese el valor total a facturar!' }]}>
        <InputNumber
          addonAfter="ARS"
          style={{ width: '100%' }}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          parser={(value) => value!.replace(/\$\s?|(.*)/g, '')}
        />
      </Form.Item>
      <Form.Item label="Multiplo" name="mult" rules={[{ required: true, message: 'Ingrese el multiplo!' }]}>
        <Select>
          <Select.Option value="1000">$1.000</Select.Option>
          <Select.Option value="5000">$5.000</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Calcular</Button>
      </Form.Item>
    </Form>
  </Card>
);

export default Calculator;
