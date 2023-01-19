import { Card, Col, Row, Statistic } from 'antd';

type ResponsesProps = {
  facturas: number[];
};

const Responses = ({ facturas }: ResponsesProps): JSX.Element => {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
      {facturas.map((f, i) => (
        <Col className="gutter-row" span={6} key={`${f}-${i}`}>
          <Card style={{ marginBottom: 8 }}>
            <Statistic title={`Factura #${i + 1}`} value={toARS(f)} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

const toARS = (v: number): string => new Intl.NumberFormat('es', { style: 'currency', currency: 'ARS' }).format(v);

export default Responses;
