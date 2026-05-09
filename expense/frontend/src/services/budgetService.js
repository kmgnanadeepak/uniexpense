import { http } from "./http";

export const budgetService = {
  async status() {
    const response = await http.get("/budget/status");
    return response.data;
  },
  async all() {
    const response = await http.get("/budget/all");
    return response.data;
  },
  async set(payload) {
    const response = await http.post("/budget/set", payload);
    return response.data;
  },
  async update(payload) {
    const response = await http.put("/budget/update", payload);
    return response.data;
  }
};
