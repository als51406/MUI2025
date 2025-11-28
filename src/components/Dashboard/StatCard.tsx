import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { DashboardStat } from '../../types';

interface StatCardProps {
  stat: DashboardStat;
}

const StatCard: React.FC<StatCardProps> = ({ stat }) => {
  return (
    <Card 
      sx={{ maxWidth: 345, minWidth: 276, height: 116, display: 'flex', alignItems: 'center', boxShadow: 'none' }}
      role="article"
      aria-label={`${stat.label} 통계`}
    >
      <CardHeader
        avatar={
          <img 
            src={`${process.env.PUBLIC_URL}/images/${stat.icon}`} 
            alt="" 
            role="presentation"
            aria-hidden="true"
          />
        }
        title={
          <span 
            style={{ fontSize: 24, fontWeight: 700 }}
            aria-label={`${stat.value} 이상`}
          >
            {stat.value}+
          </span>
        }
        subheader={
          <span style={{ fontSize: 16, fontWeight: 600 }}>
            {stat.label}
          </span>
        }
      />
    </Card>
  );
};

// React.memo로 불필요한 리렌더링 방지
export default React.memo(StatCard);
