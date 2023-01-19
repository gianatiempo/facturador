import { lazy, useState } from 'react';
import { Col, Layout, Space, theme, Typography } from 'antd';

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

const Calculator = lazy(() => import('./components/Calculator'));
const Responses = lazy(() => import('./components/Responses'));

const App = () => {
  const [facturas, setFacturas] = useState<number[]>([]);
  const { token } = theme.useToken();

  return (
    <Layout style={{ height: '100vh' }}>
      <Header style={{ position: 'sticky', top: 0, zIndex: 1, width: '100%', background: token.colorBgContainer }}>
        <Title style={{ margin: '9px 0' }}>Facturador</Title>
      </Header>
      <Content className="site-layout">
        <div style={{ padding: 24, minHeight: 'calc(100vh - 133px)' }}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Col>
              <Calculator setFacturas={setFacturas} />
            </Col>
            <Responses facturas={facturas} />
          </Space>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Facturador v{import.meta.env.PACKAGE_VERSION}</Footer>
    </Layout>
  );
};

export default App;
