import { render } from "@testing-library/react";
import { expect, test } from "vite-plus/test";
import App from "./App.tsx";

test("renders the chart", () => {
  const { container } = render(<App />);
  expect(container.querySelector(".highcharts-container")).not.toBeNull();
});
