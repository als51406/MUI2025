import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { doughnutChartData } from '../data/dashboardData';

ChartJS.register(ArcElement, Tooltip, Legend);

const Doughnutchart: React.FC = () => {
  // useMemo로 차트 데이터 메모이제이션
  const data = React.useMemo(() => ({
    labels: doughnutChartData.labels,
    datasets: [{
      label: 'My First Dataset',
      data: doughnutChartData.data,
      backgroundColor: doughnutChartData.backgroundColor,
      hoverOffset: 4
    }]
  }), []);

  return (
    <div style={{ width: 300, height: 300 }}>
      <Doughnut data={data} />
    </div>
  );
};

// React.memo로 불필요한 리렌더링 방지
export default React.memo(Doughnutchart);