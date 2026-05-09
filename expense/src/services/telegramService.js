import { http } from "./http";

export const telegramService = {
  async status() {
    return http.get("/telegram/status");
  },
  async connect() {
    return http.post("/telegram/connect");
  },
  async sync() {
    return http.post("/telegram/sync");
  }
};
