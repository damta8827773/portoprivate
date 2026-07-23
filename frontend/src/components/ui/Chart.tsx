import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  RadarController,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
  type ChartConfiguration,
} from 'chart.js';
import { useAppStore } from '../../store/useAppStore';

ChartJS.register(
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  DoughnutController,
  RadarController,
  RadialLinearScale,
  ArcElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip,
  Legend,
);

/** Brand palette reused across every chart so the dashboard reads as one system. */
export const CHART_COLORS = [
  '#D4AF37',
  '#60a5fa',
  '#a78bfa',
  '#34d399',
  '#f59e0b',
  '#f87171',
  '#38bdf8',
  '#c084fc',
];

/**
 * Narrow union rather than plain ChartConfiguration: per-type options such as
 * the doughnut's `cutout` only type-check against their own chart type.
 */
export type SupportedChartConfig =
  | ChartConfiguration<'bar'>
  | ChartConfiguration<'line'>
  | ChartConfiguration<'doughnut'>
  | ChartConfiguration<'radar'>;

interface ChartProps {
  /** Chart.js config minus the theming this component injects. */
  config: SupportedChartConfig;
  /** Width / height ratio - lower is taller. */
  aspectRatio?: number;
  ariaLabel: string;
}

/**
 * Thin Chart.js wrapper that rebuilds on theme change, since axis and legend
 * colours have to follow the light/dark switch.
 */
export function Chart({ config, aspectRatio = 2, ariaLabel }: ChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    if (!canvasRef.current) return;
    const dark = theme === 'dark';
    const tick = dark ? 'rgba(255,255,255,0.55)' : 'rgba(0,0,0,0.55)';
    const grid = dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.08)';
    const font = { size: 11, family: 'Poppins' };

    const isRadial = config.type === 'doughnut' || config.type === 'radar';

    const options = config.options as Record<string, unknown> | undefined;

    const themedOptions = {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio,
      ...options,
      plugins: {
        legend: {
          display: isRadial,
          position: 'bottom',
          labels: {
            color: tick,
            boxWidth: 10,
            boxHeight: 10,
            useBorderRadius: true,
            borderRadius: 3,
            font,
            padding: 12,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(15,23,42,0.92)',
          borderColor: 'rgba(212,175,55,0.35)',
          borderWidth: 1,
          titleColor: '#e2e8f0',
          bodyColor: '#94a3b8',
          padding: 10,
          cornerRadius: 8,
        },
        ...(options?.plugins as Record<string, unknown> | undefined),
      },
      // Cartesian charts get themed axes; doughnut/radar define their own.
      scales: isRadial
        ? options?.scales
        : {
            x: {
              grid: { display: false },
              ticks: { color: tick, font },
              border: { display: false },
            },
            y: {
              grid: { color: grid },
              ticks: { color: tick, font, padding: 8 },
              border: { display: false },
            },
            ...(options?.scales as Record<string, unknown> | undefined),
          },
    };

    chartRef.current?.destroy();
    // Built outside the constructor call: the per-type config union does not
    // merge cleanly under the constructor's contextual typing.
    chartRef.current = new ChartJS(
      canvasRef.current,
      { ...config, options: themedOptions } as unknown as ChartConfiguration,
    );

    return () => chartRef.current?.destroy();
  }, [config, theme, aspectRatio]);

  return (
    <div className="chart-box">
      <canvas ref={canvasRef} role="img" aria-label={ariaLabel} />
    </div>
  );
}
