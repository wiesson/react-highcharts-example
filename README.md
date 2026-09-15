# React Highcharts example

A minimal example of using [Highcharts](https://www.highcharts.com) in React — without a wrapper library.

**Live demo:** https://wiesson.github.io/react-highcharts-example/

## Why no wrapper?

Highcharts manages its own DOM. All React has to do is hand it a container element and take care of the chart's lifecycle. That fits into a single small component, so an extra dependency isn't needed.

## How it works

The whole integration lives in [`src/Chart.tsx`](src/Chart.tsx):

```tsx
export function Chart({ options }: { options: Highcharts.Options }) {
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
```

- **Mount:** the chart is created once, inside the `div` rendered by React. `useEffectEvent` gives the mount effect the current `options` without listing them as a dependency, so no lint rule has to be silenced.
- **Update:** new `options` are applied with `chart.update()`, which keeps animations and avoids a full re-render. Pass a stable `options` object (a module constant or `useMemo`) so the chart only updates when the data really changes.
- **Unmount:** the chart is destroyed, which removes its DOM and event listeners.

Usage, see [`src/App.tsx`](src/App.tsx):

```tsx
const options: Highcharts.Options = {
  title: { text: "Fruit Consumption" },
  series: [{ type: "line", name: "Jane", data: [1, 0, 4, 0, 3] }],
};

<Chart options={options} />;
```

Highcharts 13 follows the system color scheme, so the chart switches to dark mode automatically. The page does the same with Tailwind's `dark:` variants.

## Stack

- [React 19](https://react.dev) and [TypeScript](https://www.typescriptlang.org)
- [Highcharts 13](https://www.highcharts.com)
- [Vite+](https://viteplus.dev): dev server, build, lint, format and tests in one tool, with pnpm
- [Tailwind CSS 4](https://tailwindcss.com) for page layout

## Getting started

Requires Node.js 24 and the [`vp` CLI](https://viteplus.dev/guide/).

```bash
git clone git@github.com:wiesson/react-highcharts-example.git
cd react-highcharts-example
vp install
vp dev
```

## Commands

| Command      | Description                        |
| ------------ | ---------------------------------- |
| `vp dev`     | Start the dev server               |
| `vp check`   | Format check, lint and type check  |
| `vp fmt`     | Format all files                   |
| `vp test`    | Run tests (Vitest with jsdom)      |
| `vpr build`  | Type check and build to `dist/`    |
| `vp preview` | Serve the production build locally |

A pre-commit hook runs `vp check --fix` on staged files.

## Deployment

Every push to `main` runs [`.github/workflows/pages.yml`](.github/workflows/pages.yml): check, test, build and deploy to GitHub Pages. The build uses relative asset paths (`base: "./"`), so it works under the repository sub-path.

## License

Highcharts is free for personal and non-commercial use. Commercial use requires a [Highcharts license](https://shop.highcharts.com).
