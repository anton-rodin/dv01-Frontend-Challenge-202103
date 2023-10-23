import numeral from 'numeral';
import React, { FC } from 'react';
import {
  BarChart as BarChartRecharts,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

type Props = {
  data: { key: string; value: number }[];
};

const tickFormatter = (value: number) => {
  return numeral(value).format('$0,0');
};

const formatCurrency = (value: number) => {
  return numeral(value).format('$0,0.00');
};

const BarChart: FC<Props> = ({ data }) => {
  return (
    <div style={{ width: '100%', height: 300 }} data-testid="bar-chart">
      <ResponsiveContainer>
        <BarChartRecharts data={data} margin={{ top: 20, right: 30, bottom: 5, left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="key" />
          <YAxis tickFormatter={tickFormatter} />
          <Tooltip formatter={formatCurrency} />
          <Legend payload={[{ value: 'Grades', color: '#8884d8', type: 'rect' }]} />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChartRecharts>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
