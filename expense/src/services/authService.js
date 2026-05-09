import { http } from "./http";

export const authService = {
  async login(payload) {
    const response = await http.post("/auth/login", payload);
    return response.data;
  },
  async signup(payload) {
    const response = await http.post("/auth/signup", payload);
    return response.data;
  },
  async profile() {
    const response = await http.get("/auth/profile");
    return response.data;
  },
  async updateProfile(payload) {
    const response = await http.put("/auth/profile", payload);
    return response.data;
  },
  async changePassword(payload) {
    const response = await http.put("/auth/change-password", payload);
    return response.data;
  }
};
