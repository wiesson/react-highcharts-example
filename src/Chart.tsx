import Highcharts from "highcharts";
import { useEffect, useRef } from "react";

type ChartProps = {
  options: Highcharts.Options;
};

export function Chart({ options }: ChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<Highcharts.Chart | null>(null);

  // Create the chart once, destroy it on unmount.
  useEffect(() => {
    if (!containerRef.current) return;
    chartRef.current = Highcharts.chart(containerRef.current, options);
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options changes are handled below
  }, []);

  // Apply option changes to the existing chart instead of re-creating it.
  useEffect(() => {
    chartRef.current?.update(options, true, true);
  }, [options]);

  return <div ref={containerRef} />;
}
