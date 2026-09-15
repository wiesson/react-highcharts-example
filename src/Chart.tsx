import Highcharts from "highcharts";
import { useEffect, useEffectEvent, useRef } from "react";

type ChartProps = {
  options: Highcharts.Options;
};

export function Chart({ options }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);

  // Reads the latest options without making them a dependency of the mount effect.
  const createChart = useEffectEvent((container: HTMLDivElement) =>
    Highcharts.chart(container, options),
  );

  // The chart is an external system: create it on mount, destroy it on unmount.
  useEffect(() => {
    const chart = createChart(containerRef.current!);
    chartRef.current = chart;
    return () => {
      chart.destroy();
      chartRef.current = null;
    };
  }, []);

  // Apply later option changes to the existing chart instead of re-creating it.
  useEffect(() => {
    chartRef.current?.update(options, true, true);
  }, [options]);

  return <div ref={containerRef} />;
}
