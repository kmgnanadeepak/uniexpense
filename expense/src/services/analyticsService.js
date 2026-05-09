import { http } from "./http";

export const analyticsService = {
  async dashboardSummary() {
    const response = await http.get("/dashboard/summary");
    return response.data;
  },
  async monthly() {
    const response = await http.get("/analytics/monthly");
    return response.data;
  },
  async categoryBreakdown() {
    const response = await http.get("/analytics/category");
    return response.data;
  },
  async savingsTrend() {
    const response = await http.get("/analytics/savings");
    return response.data;
  }
};
