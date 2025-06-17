import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

describe("App Component", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn((url: RequestInfo) => {
        if (typeof url === "string" && url.includes("/api/v1/prefectures")) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                result: [
                  { prefCode: 1, prefName: "北海道" },
                  { prefCode: 2, prefName: "青森県" },
                ],
              }),
          });
        }
        if (typeof url === "string" && url.includes("/api/v1/population/composition/perYear")) {
          return Promise.resolve({
            ok: true,
            json: () =>
              Promise.resolve({
                result: {
                  data: [
                    {
                      label: "総人口",
                      data: [
                        { year: 2020, value: 5000000 },
                        { year: 2025, value: 4800000 },
                      ],
                    },
                    {
                      label: "年少人口",
                      data: [
                        { year: 2020, value: 600000 },
                        { year: 2025, value: 550000 },
                      ],
                    },
                    {
                      label: "生産年齢人口",
                      data: [
                        { year: 2020, value: 3200000 },
                        { year: 2025, value: 3000000 },
                      ],
                    },
                    {
                      label: "老年人口",
                      data: [
                        { year: 2020, value: 1200000 },
                        { year: 2025, value: 1250000 },
                      ],
                    },
                  ],
                },
              }),
          });
        }
        return Promise.reject(new Error("Unknown API"));
      })
    );
  });

  it("Test1 : A list of prefectures will be displayed", async () => {
    render(<App />);
    await waitFor(() => {
      expect(screen.getByText("北海道")).toBeInTheDocument();
      expect(screen.getByText("青森県")).toBeInTheDocument();
    });
  });

  it("Test2 : Population data for all types is handled correctly", async () => {
    render(<App />);
    const checkbox = await screen.findByRole("checkbox", { name: "北海道" });
    await userEvent.click(checkbox);

    await waitFor(() => expect(screen.getByText("人口推移グラフ")).toBeInTheDocument());

    expect(screen.getByText("総人口の推移")).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("年少人口"));
    await waitFor(() => expect(screen.getByText("年少人口の推移")).toBeInTheDocument());

    await userEvent.click(screen.getByLabelText("生産年齢人口"));
    await waitFor(() => expect(screen.getByText("生産年齢人口の推移")).toBeInTheDocument());

    await userEvent.click(screen.getByLabelText("老年人口"));
    await waitFor(() => expect(screen.getByText("老年人口の推移")).toBeInTheDocument());
  });
});
