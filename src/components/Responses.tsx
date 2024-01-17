import { Card, Checkbox, Col, Row, Statistic } from 'antd';

type ResponsesProps = {
  facturas: number[];
};

const Responses = ({ facturas }: ResponsesProps): JSX.Element => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {facturas.map((f, i) => (
        <Col xs={24} sm={12} md={8} lg={6} key={`${f}-${i}`}>
          <Card
            style={{ marginBottom: 8 }}
            extra={<Checkbox />}
            headStyle={{ borderBottom: 'none' }}
            title={`Factura #${i + 1}`}
            bodyStyle={{ padding: '0px 24px 12px' }}
          >
            <Statistic value={toARS(f)} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const toARS = (v: number): string => new Intl.NumberFormat('es', { style: 'currency', currency: 'ARS' }).format(v);

export default Responses;
