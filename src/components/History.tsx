import { useLocalStorage } from 'usehooks-ts';
import { Card, List, Statistic } from 'antd';
import { Mes, toARS } from '../utils';

const History = () => {
  const [history] = useLocalStorage<Mes[]>('facturador', []);
  return (
    <Card title={`Historico`} style={{ marginBottom: 8 }} headStyle={{ borderBottom: 'none' }} bodyStyle={{ padding: '0px 24px 12px' }}>
      <List
        size="small"
        itemLayout="horizontal"
        dataSource={history}
        renderItem={(item: Mes) => (
          <List.Item>
            <List.Item.Meta
              title={item.title}
              description={<Statistic value={toARS(item.total)} valueStyle={{ color: '#3f8600', fontSize: 14 }} />}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default History;
