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
  // useCallback으로 그라데이션 생성 함수 메모이제이션
  const createLineGradient = React.useCallback((ctx: CanvasRenderingContext2D, area: ChartArea): CanvasGradient => {
    const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
    gradient.addColorStop(0, "#36A2EB");
    gradient.addColorStop(0.5, "#7B68EE");
    gradient.addColorStop(1, "#9966FF");
    return gradient;
  }, []);

  const createBackgroundGradient = React.useCallback((
    ctx: CanvasRenderingContext2D,
    area: ChartArea
  ): CanvasGradient => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, "rgba(54, 162, 235, 0)");
    gradient.addColorStop(0.3, "rgba(123, 104, 238, 0.1)");
    gradient.addColorStop(1, "rgba(153, 102, 255, 0.2)");
    return gradient;
  }, []);

  const data = {
    labels: reportChartData.map(item => item.label), // x축에 표시될 값들
    datasets: [
      {
        label: "Sales", //범례에 표시될 이름
        data: reportChartData.map(item => item.value), // y축 값들
        borderColor: function (context: ScriptableContext<'line'>): string | CanvasGradient { // 선 색상
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "#36A2EB";
          }
          return createLineGradient(ctx as CanvasRenderingContext2D, chartArea as ChartArea);
        },
        backgroundColor: function (context: ScriptableContext<'line'>): string | CanvasGradient {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "rgba(54, 162, 235, 0.1)";
          }
          return createBackgroundGradient(ctx as CanvasRenderingContext2D, chartArea as ChartArea);
        },
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        borderDash: [], // 실선으로 명시적 설정
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: function (context: ScriptableContext<'line'>): string | CanvasGradient {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "#36A2EB";
          }
          return createLineGradient(ctx as CanvasRenderingContext2D, chartArea as ChartArea);
        },
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointHoverBackgroundColor: function (context: ScriptableContext<'line'>): string | CanvasGradient {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            return "#36A2EB";
          }
          return createLineGradient(ctx as CanvasRenderingContext2D, chartArea as ChartArea);
        },
        pointHoverBorderColor: "white",
        pointHoverBorderWidth: 2,
      },
    ],
  };
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "rgba(16, 24, 40, 0.95)",
        titleColor: "white",
        bodyColor: "white",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        displayColors: false,
        callbacks: {
          title: function (): string {
            return "";
          },
          label: function (context: TooltipItem<'line'>): string {
            return `${context.dataset.label}`;
          },
          afterLabel: function (context: TooltipItem<'line'>): string {
            return `${context.parsed.y.toLocaleString()}`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
      y: {
        display: true,
        position: "left" as const,
        grid: {
          color: "#F3F4F6",
          drawBorder: false,
        },
        ticks: {
          color: "#9CA3AF",
          font: {
            size: 12,
          },
          stepSize: 20,
          callback: function (value: string | number): string | number {
            return value;
          },
        },
        border: {
          display: false,
        },
        beginAtZero: true,
        max: 100,
      },
    },
    elements: {
      point: {
        hoverRadius: 6,
      },
    },
  };

  return (
    <Box
      sx={{
        width: "720px",
        height: "408px",
        padding: 3,
        margin: 0, // 마진 제거 (Layout에서 관리)
        backgroundColor: "white",
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
            color: "#1F2937",
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
