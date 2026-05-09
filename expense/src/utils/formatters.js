export const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

export const formatPercent = (value) => `${Number(value || 0).toFixed(1)}%`;

export const formatDate = (date) => new Date(date).toLocaleDateString("en-IN");
