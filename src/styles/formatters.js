// Currency (USD, no cents)
export const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

// Plain number with commas
export const numberFormatter = new Intl.NumberFormat("en-US");

// Percent formatter
export const formatPercent = (value) =>
  value == null ? "-" : `${Number(value).toFixed(1)}%`;
