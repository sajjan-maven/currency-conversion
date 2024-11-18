import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CurrencyConverter from '../components/CurrencyConverter';

// Mocking the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        currencies: { USD: "US Dollar", INR: "Indian Rupee" },
        rates: { INR: 82.5 },
      }),
  })
);

describe('CurrencyConverter Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders CurrencyConverter component', async () => {
    render(<CurrencyConverter />);

    // Check for title
    expect(screen.getByText(/Currency Converter/i)).toBeInTheDocument();

    // Ensure dropdown titles are rendered
    expect(screen.getByText(/from:/i)).toBeInTheDocument();
    expect(screen.getByText(/to:/i)).toBeInTheDocument();

    // Wait for currencies to load
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });

  test('converts currency when valid inputs are provided', async () => {
    render(<CurrencyConverter />);

    // Wait for dropdown options to load
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

    // Simulate input and button click
    const amountInput = screen.getByLabelText(/Amount/i);
    fireEvent.change(amountInput, { target: { value: '10' } });

    const convertButton = screen.getByRole('button', { name: /Convert/i });
    fireEvent.click(convertButton);

    // Wait for conversion result
    await waitFor(() => {
      expect(screen.getByText(/Converted Amount:/i)).toBeInTheDocument();
      expect(screen.getByText(/82.5 INR/i)).toBeInTheDocument();
    });
  });

  test('shows error alert on invalid input', async () => {
    render(<CurrencyConverter />);

    // Simulate invalid input and button click
    const amountInput = screen.getByLabelText(/Amount/i);
    fireEvent.change(amountInput, { target: { value: '0' } });

    const convertButton = screen.getByRole('button', { name: /Convert/i });
    fireEvent.click(convertButton);

    // Ensure error alert appears
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("Please enter a valid amount.");
    });
  });
});
