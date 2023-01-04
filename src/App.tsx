import React, { useState } from 'react';
import { Button, Card, Col, Form, InputNumber, Layout, Row, Select, Space, Statistic, theme, Typography } from 'antd';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const init = { minimo: 20000, maximo: 40000, total: 500000, mult: 100 };

const App: React.FC = () => {
  const [facturas, setFacturas] = useState<number[]>([]);
  const { token } = theme.useToken();

  const onFinish = (values: any) => {
    setFacturas(calcular(values.minimo, values.maximo, values.total, values.mult));
  };

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', background: token.colorBgContainer }}>
        <Title style={{ margin: '9px 0' }}>Facturador</Title>
      </Header>
      <Content className="site-layout">
        <div style={{ padding: 24, minHeight: 'calc(100vh - 133px)' }}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Col>
              <Card>
                <Form name="basic" layout="inline" labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} initialValues={init} onFinish={onFinish}>
                  <Form.Item label="Min" name="minimo" rules={[{ required: true, message: 'Ingrese el valor de la factura minima!' }]}>
                    <InputNumber addonAfter="ARS" />
                  </Form.Item>
                  <Form.Item label="Max" name="maximo" rules={[{ required: true, message: 'Ingrese el valor de la factura maxima!' }]}>
                    <InputNumber addonAfter="ARS" />
                  </Form.Item>
                  <Form.Item label="Total" name="total" rules={[{ required: true, message: 'Ingrese el valor total a facturar!' }]}>
                    <InputNumber addonAfter="ARS" />
                  </Form.Item>
                  <Form.Item label="Multiplo" name="mult" rules={[{ required: true, message: 'Ingrese el multiplo!' }]}>
                    <Select>
                      <Select.Option value="100">100</Select.Option>
                      <Select.Option value="1000">1000</Select.Option>
                    </Select>
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button htmlType="submit">Calcular</Button>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {facturas.map((f, i) => (
                <Col className="gutter-row" span={6} key={`${f}-${i}`}>
                  <Card>
                    <Statistic title={`Factura #${i + 1}`} value={toARS(f)} valueStyle={{ color: '#3f8600' }} />
                  </Card>
                </Col>
              ))}
            </Row>
          </Space>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Facturador v{import.meta.env.PACKAGE_VERSION}</Footer>
    </Layout>
  );
};

const random = (min: number, max: number): number => Math.floor(Math.random() * (max - min + 1) + min);
const toARS = (v: number): string => new Intl.NumberFormat('es', { style: 'currency', currency: 'ARS' }).format(v);

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

export default App;
