import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Carlist from "./components/Carlist";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe("Carlist test", () => {
  test("componenet renders", () => {
    render(<Carlist />, { wrapper });
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });

  test("Cars are fetched", async () => {
    render(<Carlist />, { wrapper });
    await waitFor(() => screen.findByText(/New Car/i));
    expect(screen.getByText(/Ford/i)).toBeInTheDocument();
  });
});

test("Open new car modal", async () => {
  render(<Carlist />, { wrapper });
  await waitFor(() => screen.getByText(/New Car/i));
  await userEvent.click(screen.getByText(/New Car/i));
  expect(screen.getByTestId(/Saving/i)).toBeInTheDocument();
});
