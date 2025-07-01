import "@testing-library/jest-dom";
import { vi } from "vitest";

if (!("CSS" in globalThis)) {
  globalThis.CSS = {} as unknown as typeof CSS;
}

if (typeof globalThis.CSS.supports !== "function") {
  globalThis.CSS.supports = vi.fn(() => false);
}
