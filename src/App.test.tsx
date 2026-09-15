import { render } from "@testing-library/react";
import { StrictMode } from "react";
import { expect, test } from "vite-plus/test";
import App from "./App.tsx";
import { Chart } from "./Chart.tsx";

test("renders the chart", () => {
  const { container } = render(<App />);
  expect(container.querySelector(".highcharts-container")).not.toBeNull();
});

test("updates the existing chart when options change", () => {
  const { container, rerender } = render(
    <StrictMode>
      <Chart options={{ title: { text: "Before" } }} />
    </StrictMode>,
  );
  const svg = container.querySelector("svg");

  rerender(
    <StrictMode>
      <Chart options={{ title: { text: "After" } }} />
    </StrictMode>,
  );

  expect(container.querySelectorAll(".highcharts-container")).toHaveLength(1);
  expect(container.querySelector("svg")).toBe(svg);
  expect(container.querySelector(".highcharts-title")?.textContent).toBe("After");
});

test("destroys the chart on unmount", () => {
  const { container, unmount } = render(<Chart options={{}} />);
  unmount();
  expect(container.querySelector(".highcharts-container")).toBeNull();
});
