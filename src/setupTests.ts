import "@testing-library/jest-dom";
import { vi } from "vitest";

if (!("CSS" in globalThis)) {
	// @ts-ignore
	globalThis.CSS = {};
}

// @ts-ignore
if (typeof globalThis.CSS.supports !== "function") {
	// @ts-ignore
	globalThis.CSS.supports = vi.fn(() => false);
}
