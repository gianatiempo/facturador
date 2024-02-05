import { lazy, useState } from 'react';
import { Col, Layout, Row, Space } from 'antd';

const { Content, Footer } = Layout;

const Calculator = lazy(() => import('./components/Calculator'));
const Responses = lazy(() => import('./components/Responses'));
const History = lazy(() => import('./components/History'));

const App = () => {
  const [facturas, setFacturas] = useState<number[]>([]);

  return (
    <Layout style={{ height: '100vh' }}>
      <Content>
        <div style={{ padding: 24, minHeight: 'calc(100vh - 133px)' }}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row gutter={8}>
              <Col xs={24} sm={6}>
                <Calculator setFacturas={setFacturas} />
              </Col>
              <Col xs={24} sm={12}>
                <Responses facturas={facturas} />
              </Col>
              <Col xs={24} sm={6}>
                <History />
              </Col>
            </Row>
          </Space>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Facturador v{import.meta.env.PACKAGE_VERSION}</Footer>
    </Layout>
  );
};

export default App;
