import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useThemeMode } from '../theme/ThemeContext';
import MonthRangeFilter from '../components/Filters/MonthRangeFilter';
import Loading from '../components/Loading/Loading';

// Chart.js 요소 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Utils 유틸리티 구현
const Utils = {
  months: function({ count }: { count: number }) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'
    ];
    return monthNames.slice(0, count);
  }
};

// 재사용 가능한 Barchart 컴포넌트
type BarchartProps = {
  labels?: string[];
  dataValues?: number[];
  barColors?: string[];
  borderColors?: string[];
  label?: string;
};

const defaultLabels = Utils.months({ count: 7 });
const defaultDataValues = [65, 59, 80, 81, 56, 55, 40];
const defaultBarColors = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(255, 159, 64, 0.2)',
  'rgba(255, 205, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(201, 203, 207, 0.2)'
];
const defaultBorderColors = [
  'rgb(255, 99, 132)',
  'rgb(255, 159, 64)',
  'rgb(255, 205, 86)',
  'rgb(75, 192, 192)',
  'rgb(54, 162, 235)',
  'rgb(153, 102, 255)',
  'rgb(201, 203, 207)'
];

const Barchart: React.FC<BarchartProps> = ({
  labels = defaultLabels,
  dataValues = defaultDataValues,
  barColors = defaultBarColors,
  borderColors = defaultBorderColors,
  label = 'My First Dataset',
}) => {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const colors = React.useMemo(() => ({
    grid: isDark ? '#3A3F47' : '#E5E7EB',
    text: isDark ? '#B0B0B0' : '#6B7280',
    title: isDark ? '#FFFFFF' : '#1F2937',
    tooltipBg: isDark ? 'rgba(39,43,48,0.95)' : 'rgba(16,24,40,0.95)'
  }), [isDark]);

  const data = React.useMemo(() => ({
    labels: labels,
    datasets: [{
      label: label,
      data: dataValues,
      backgroundColor: barColors.map(c => isDark ? c.replace('0.2', '0.35') : c), // slightly stronger in dark
      borderColor: borderColors,
  borderWidth: 2,
  borderRadius: 6,
  maxBarThickness: 44,
      categoryPercentage: 0.7,
      barPercentage: 0.8,
    }]
  }), [labels, dataValues, barColors, borderColors, label, isDark]);

  const options = React.useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        backgroundColor: colors.tooltipBg,
        titleColor: '#FFFFFF',
        bodyColor: '#FFFFFF',
        borderColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (ctx: any) => `${ctx.parsed.y.toLocaleString()}`
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: colors.text, font: { size: 12 } },
        border: { display: false }
      },
      y: {
        grid: { color: colors.grid, drawBorder: false },
        ticks: { color: colors.text, font: { size: 12 }, beginAtZero: true },
        border: { display: false }
      }
    },
  animation: { duration: 600, easing: 'easeOutQuart' as const }
  }), [colors, isDark]);

  const [range, setRange] = React.useState<[number, number]>([0, labels.length - 1]);
  const filteredLabels = React.useMemo(() => labels.slice(range[0], range[1] + 1), [labels, range]);
  const filteredDataValues = React.useMemo(() => dataValues.slice(range[0], range[1] + 1), [dataValues, range]);
  const filteredData = React.useMemo(() => ({
    ...data,
    labels: filteredLabels,
    datasets: data.datasets.map(ds => ({ ...ds, data: filteredDataValues }))
  }), [data, filteredLabels, filteredDataValues]);

  const [loading, setLoading] = React.useState(false);

  // simulate async filter (placeholder for real data fetch)
  React.useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 150); // short UX feedback
    return () => clearTimeout(t);
  }, [range]);

  return (
    <div style={{ width: '100%', minHeight: 360, background: isDark ? '#272B30' : '#FFFFFF', borderRadius: 8, padding: 16, boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      <MonthRangeFilter months={labels} onChange={(s,e) => setRange([s,e])} />
      <div style={{ flex: 1, position: 'relative' }}>
        {loading ? <Loading message="필터 적용 중..." size={32} /> : <Bar data={filteredData} options={options} />}
      </div>
    </div>
  );
};

export default Barchart;