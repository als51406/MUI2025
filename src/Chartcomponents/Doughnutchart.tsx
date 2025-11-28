import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { doughnutChartData } from '../data/dashboardData';
import { useThemeMode } from '../theme/ThemeContext';

ChartJS.register(ArcElement, Tooltip, Legend);

const Doughnutchart: React.FC = () => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const colors = React.useMemo(() => ({
    tooltipBg: isDark ? 'rgba(39,43,48,0.95)' : 'rgba(16,24,40,0.95)',
    text: isDark ? '#B0B0B0' : '#6B7280',
    title: isDark ? '#FFFFFF' : '#1F2937'
  }), [isDark]);

  const data = React.useMemo(() => ({
    labels: doughnutChartData.labels,
    datasets: [{
      label: 'Distribution',
      data: doughnutChartData.data,
      backgroundColor: doughnutChartData.backgroundColor.map(c => isDark ? c.replace('0.2', '0.35') : c),
      borderColor: isDark ? '#272B30' : '#FFFFFF',
      borderWidth: 2,
      hoverOffset: 6,
      spacing: 2,
    }]
  }), [isDark]);

  const options = React.useMemo(() => ({
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: colors.text,
          boxWidth: 12,
          boxHeight: 12,
          usePointStyle: true,
          pointStyle: 'circle' as const,
          padding: 16,
          font: { size: 12 }
        }
      },
      tooltip: {
        backgroundColor: colors.tooltipBg,
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        cornerRadius: 8,
        padding: 10,
        borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        callbacks: {
          label: (ctx: any) => `${ctx.label}: ${ctx.parsed.toLocaleString()}`
        }
      }
    },
    cutout: '55%',
    animation: { animateRotate: true, animateScale: true, duration: 700, easing: 'easeOutQuart' as const }
  }), [colors, isDark]);

  return (
    <Card 
      sx={{ 
        width: '100%',
        height: '100%',
        borderRadius: 3, 
        boxShadow: isDark ? 
          '0 4px 20px rgba(0, 0, 0, 0.4)' : 
          '0 2px 12px rgba(0, 0, 0, 0.08)',
        backgroundColor: isDark ? '#272B30' : '#FFFFFF',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: isDark ? 
            '0 8px 25px rgba(0, 0, 0, 0.5)' : 
            '0 4px 20px rgba(0, 0, 0, 0.12)',
        }
      }}
    >
      <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography 
            variant="h6" 
            component="h2"
            sx={{ 
              fontWeight: 600,
              fontSize: '1.125rem',
              color: colors.title,
              letterSpacing: '-0.025em'
            }}
          >
            Analytics
          </Typography>
          <Box sx={{ color: isDark ? '#6B7280' : '#9CA3AF' }}>
            <span>•••</span>
          </Box>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 0 }}>
          <Box sx={{ width: '100%', maxWidth: 280, height: 280 }}>
            <Doughnut data={data} options={options} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

// React.memo로 불필요한 리렌더링 방지
export default React.memo(Doughnutchart);