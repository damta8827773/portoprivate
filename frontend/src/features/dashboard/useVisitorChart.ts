import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { useVisitorStats } from '../../hooks/useContent';
import { useAppStore } from '../../store/useAppStore';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export type ChartFilter = 'all' | 'desktop' | 'mobile';

const ACTIVE: Record<'desktop' | 'mobile', string> = {
  desktop: 'rgba(96,165,250,0.75)',
  mobile: 'rgba(167,139,250,0.75)',
};
const HOVER: Record<'desktop' | 'mobile', string> = {
  desktop: 'rgba(96,165,250,1)',
  mobile: 'rgba(167,139,250,1)',
};

/** Builds + manages the monthly visitor bar chart (ports initVisitorChart). */
export function useVisitorChart(canvasRef: RefObject<HTMLCanvasElement>) {
  const chartRef = useRef<Chart | null>(null);
  const { data } = useVisitorStats();
  const theme = useAppStore((s) => s.theme);
  const [filter, setFilter] = useState<ChartFilter>('all');

  useEffect(() => {
    if (!canvasRef.current || !data?.length) return;
    const dark = theme === 'dark';
    const tick = dark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)';
    const grid = dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.07)';

    chartRef.current?.destroy();
    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels: data.map((d) => d.month),
        datasets: [
          { label: 'Desktop', data: data.map((d) => d.desktop), backgroundColor: ACTIVE.desktop, hoverBackgroundColor: HOVER.desktop, borderRadius: 6, borderSkipped: false, barPercentage: 0.55 },
          { label: 'Mobile', data: data.map((d) => d.mobile), backgroundColor: ACTIVE.mobile, hoverBackgroundColor: HOVER.mobile, borderRadius: 6, borderSkipped: false, barPercentage: 0.55 },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2.8,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: true, position: 'top', align: 'end', labels: { color: tick, boxWidth: 10, boxHeight: 10, useBorderRadius: true, borderRadius: 3, font: { size: 11, family: 'Poppins' }, padding: 14 } },
          tooltip: { backgroundColor: 'rgba(15,23,42,0.92)', borderColor: 'rgba(96,165,250,0.3)', borderWidth: 1, titleColor: '#e2e8f0', bodyColor: '#94a3b8', padding: 10, cornerRadius: 8 },
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: tick, font: { size: 11, family: 'Poppins' } }, border: { display: false } },
          y: { grid: { color: grid }, ticks: { color: tick, font: { size: 11, family: 'Poppins' }, padding: 8, callback: (v) => (Number(v) >= 1000 ? `${(Number(v) / 1000).toFixed(1)}k` : v) }, border: { display: false } },
        },
      },
    });
    return () => chartRef.current?.destroy();
  }, [data, theme, canvasRef]);

  const applyFilter = (f: ChartFilter) => {
    setFilter(f);
    const chart = chartRef.current;
    if (!chart) return;
    chart.data.datasets.forEach((ds) => {
      const key = (ds.label || '').toLowerCase() as 'desktop' | 'mobile';
      if (f === 'all') {
        ds.backgroundColor = ACTIVE[key];
        ds.hoverBackgroundColor = HOVER[key];
      } else {
        const on = key === f;
        ds.backgroundColor = on ? ACTIVE[key] : 'rgba(255,255,255,0.06)';
        ds.hoverBackgroundColor = on ? HOVER[key] : 'rgba(255,255,255,0.1)';
      }
    });
    chart.update();
  };

  return { filter, applyFilter };
}
