import { useLocalStorage } from 'usehooks-ts';
import { Card, Checkbox, Col, Row, Statistic } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Mes, monthNames, toARS } from '../utils';

const Responses = ({ facturas }: { facturas: number[] }) => {
  const [history, setHistory] = useLocalStorage<Mes[]>('facturador', []);

  const onChange = ({ target: { checked } }: CheckboxChangeEvent, importe: number) => {
    const now = new Date();
    const newHistory = history.map((m: Mes) =>
      m.title === `${monthNames[now.getMonth()]} ${now.getFullYear()}` ? { ...m, total: checked ? m.total + importe : m.total - importe } : m
    );

    setHistory(newHistory.length ? newHistory : [{ title: `${monthNames[now.getMonth()]} ${now.getFullYear()}`, total: importe }]);
  };
  return (
    <Row gutter={8}>
      {facturas.map((importe, i) => (
        <Col xs={24} sm={12} key={`${importe}-${i}`}>
          <Card
            style={{ marginBottom: 8 }}
            extra={<Checkbox onChange={(e) => onChange(e, importe)} />}
            headStyle={{ borderBottom: 'none' }}
            title={`Factura #${i + 1}`}
            bodyStyle={{ padding: '0px 24px 12px' }}
          >
            <Statistic value={toARS(importe)} valueStyle={{ color: '#3f8600' }} />
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Responses;
