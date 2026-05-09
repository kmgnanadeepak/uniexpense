import { http } from "./http";

export const transactionService = {
  async list(params = {}) {
    const response = await http.get("/transactions/all", { params });
    return response.data;
  },
  async create(payload) {
    const response = await http.post("/transactions/add", payload);
    return response.data;
  },
  async update(id, payload) {
    const response = await http.put(`/transactions/update/${id}`, payload);
    return response.data;
  },
  async remove(id) {
    return http.delete(`/transactions/delete/${id}`);
  },
  async history() {
    const response = await http.get("/transactions/history");
    return response.data;
  },
  async filter(category, params = {}) {
    const response = await http.get("/transactions/filter", { params: { category, ...params } });
    return response.data;
  },
  async search(query, params = {}) {
    const response = await http.get("/transactions/search", { params: { query, ...params } });
    return response.data;
  }
};
