import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TooltipItem,
  ScriptableContext,
} from "chart.js";
import type { ChartArea } from "chart.js";
import { Line } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { reportChartData } from '../data/dashboardData';
import { useThemeMode } from '../theme/ThemeContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function ReportChart() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  // 다크 모드에 따른 색상 설정
  const colors = React.useMemo(() => ({
    line: {
      start: isDark ? "#9B7FF7" : "#36A2EB",
      middle: isDark ? "#7B5BF5" : "#7B68EE",
      end: isDark ? "#5932EA" : "#9966FF"
    },
    background: {
      start: isDark ? "rgba(155, 127, 247, 0)" : "rgba(54, 162, 235, 0)",
      middle: isDark ? "rgba(123, 91, 245, 0.22)" : "rgba(123, 104, 238, 0.15)",
      end: isDark ? "rgba(89, 50, 234, 0.38)" : "rgba(153, 102, 255, 0.26)"
    },
    grid: isDark ? "#3A3F47" : "#F3F4F6",
    text: isDark ? "#B0B0B0" : "#9CA3AF",
    title: isDark ? "#FFFFFF" : "#1F2937",
    tooltip: isDark ? "rgba(39, 43, 48, 0.95)" : "rgba(16, 24, 40, 0.95)"
  }), [isDark]);

  // useCallback으로 그라데이션 생성 함수 메모이제이션
  const createLineGradient = React.useCallback((ctx: CanvasRenderingContext2D, area: ChartArea): CanvasGradient => {
    const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
    gradient.addColorStop(0, colors.line.start);
    gradient.addColorStop(0.5, colors.line.middle);
    gradient.addColorStop(1, colors.line.end);
    return gradient;
  }, [colors]);

  const createBackgroundGradient = React.useCallback((
    ctx: CanvasRenderingContext2D,
    area: ChartArea
  ): CanvasGradient => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, colors.background.start);
    gradient.addColorStop(0.3, colors.background.middle);
    gradient.addColorStop(1, colors.background.end);
    return gradient;
  }, [colors]);

  const data = React.useMemo(() => ({
    labels: reportChartData.map(item => item.label),
    datasets: [
      {
        label: "Sales",
        data: reportChartData.map(item => item.value),
        borderColor: function (context: ScriptableContext<'line'>): string | CanvasGradient {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.line.start;
          return createLineGradient(ctx as CanvasRenderingContext2D, chartArea as ChartArea);
        },
        backgroundColor: function (context: ScriptableContext<'line'>): string | CanvasGradient {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.background.middle;
          return createBackgroundGradient(ctx as CanvasRenderingContext2D, chartArea as ChartArea);
        },
        tension: 0.35,
        fill: true,
        borderWidth: 2.5,
        borderDash: [],
        pointRadius: reportChartData.length > 30 ? 0 : 4,
        pointHoverRadius: reportChartData.length > 30 ? 0 : 6,
        pointBackgroundColor: function (context: ScriptableContext<'line'>): string | CanvasGradient {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.line.start;
          return createLineGradient(ctx as CanvasRenderingContext2D, chartArea as ChartArea);
        },
        pointBorderColor: isDark ? "#272B30" : "white",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: function (context: ScriptableContext<'line'>): string | CanvasGradient {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return colors.line.start;
          return createLineGradient(ctx as CanvasRenderingContext2D, chartArea as ChartArea);
        },
        pointHoverBorderColor: isDark ? "#272B30" : "white",
        pointHoverBorderWidth: 2,
      },
    ],
  }), [reportChartData, colors, createLineGradient, createBackgroundGradient, isDark]);
  
  const options = React.useMemo(() => ({
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: 'index' as const },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: colors.tooltip,
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: () => '',
          label: (context: TooltipItem<'line'>) => `${context.dataset.label}`,
          afterLabel: (context: TooltipItem<'line'>) => `${context.parsed.y.toLocaleString()}`,
        }
      }
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: colors.text, font: { size: 12 } }, border: { display: false } },
      y: {
        position: 'left' as const,
        grid: { color: colors.grid, drawBorder: false },
        ticks: { color: colors.text, font: { size: 12 }, stepSize: 20, callback: (value: string | number) => value },
        border: { display: false },
        beginAtZero: true,
        max: 100,
      }
    },
    elements: { point: { hoverRadius: 6 } },
    animation: { duration: 650, easing: 'easeOutQuart' as const }
  }), [colors, isDark]);
  return (
    <Box
      sx={{
        width: "720px",
        height: "408px",
        padding: 3,
        margin: 0, // 마진 제거 (Layout에서 관리)
        backgroundColor: isDark ? '#272B30' : 'white',
        borderRadius: 2,
        border: "none",
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: colors.title,
            fontWeight: 600,
            fontSize: "18px",
          }}
        >
          Reports
        </Typography>
        <Box sx={{ color: "#9CA3AF" }}>
          <span>•••</span>
        </Box>
      </Box>

      {/* Chart */}
      <Box sx={{ height: "calc(100% - 80px)" }}>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );

}
