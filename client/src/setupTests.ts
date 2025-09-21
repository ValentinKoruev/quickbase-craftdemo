import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock CSS modules
vi.mock("*.module.scss", () => {
  return {
    default: new Proxy(
      {},
      {
        get: (_, prop) => prop,
      }
    ),
  };
});
