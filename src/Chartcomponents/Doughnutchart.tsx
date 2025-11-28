import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
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
    <div style={{ width: 300, height: 300, background: isDark ? '#272B30' : '#FFFFFF', borderRadius: 8, padding: 16, boxSizing: 'border-box' }}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

// React.memo로 불필요한 리렌더링 방지
export default React.memo(Doughnutchart);