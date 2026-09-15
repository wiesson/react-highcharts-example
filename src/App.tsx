import type Highcharts from "highcharts";
import { Chart } from "./Chart.tsx";

const options: Highcharts.Options = {
  title: { text: "Fruit Consumption" },
  xAxis: {
    categories: ["Apples", "Bananas", "Oranges", "Pineapples", "Blueberries"],
  },
  yAxis: {
    title: { text: "Fruit eaten" },
  },
  chart: { type: "line", backgroundColor: "transparent" },
  series: [
    { type: "line", name: "Jane", data: [1, 0, 4, 0, 3] },
    { type: "line", name: "John", data: [5, 7, 3, 2, 4] },
    { type: "line", name: "Doe", data: [0, 0, 0, 1, 0] },
  ],
};

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <header className="bg-zinc-900 px-6 py-10 text-center text-white dark:bg-black">
        <h1 className="text-2xl font-semibold">React Highcharts example</h1>
        <p className="mt-2 text-zinc-400">Highcharts with plain React — no wrapper library.</p>
      </header>
      <main className="mx-auto max-w-4xl p-6">
        <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <Chart options={options} />
        </div>
        <p className="mt-4 text-center text-sm text-zinc-500">
          Edit <code className="font-mono">src/App.tsx</code> and save to reload.
        </p>
      </main>
    </div>
  );
}
