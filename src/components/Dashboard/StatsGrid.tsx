import React from 'react';
import { dashboardStats } from '../../data/dashboardData';
import StatCard from './StatCard';

const StatsGrid: React.FC = () => {
  // useMemo로 통계 카드 리스트 메모이제이션
  const statCards = React.useMemo(() => 
    dashboardStats.map((stat, index) => (
      <li key={index}>
        <StatCard stat={stat} />
      </li>
    )), []);

  return (
    <nav aria-label="대시보드 통계">
      <ul aria-label="통계 카드 목록">
        {statCards}
      </ul>
    </nav>
  );
};

// React.memo로 불필요한 리렌더링 방지
export default React.memo(StatsGrid);
