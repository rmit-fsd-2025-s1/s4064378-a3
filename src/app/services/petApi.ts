// import { User } from "../types/User";
import { PetFormData } from "../Form";
import { api } from "./axios";

type User = {};

export const petApi = {
  // getAllUsers: async () => {
  //   const response = await api.get("/users");
  //   return response.data;
  // },

  // getUserById: async (id: number) => {
  //   const response = await api.get(`/users/${id}`);
  //   return response.data;
  // },

  // login: async (email: string, password: string) => {
  //   const response = await api.post(`/users/login`, { email, password });
  //   return response.data;
  // },

  calculatePremium: async (formData: Partial<PetFormData>) => {
    const response = await api.post("/calculate", formData);
    return response.data;
  },

  // updateUser: async (id: number, user: Partial<User>) => {
  //   const response = await api.put(`/users/${id}`, user);
  //   return response.data;
  // },

  // deleteUser: async (id: number) => {
  //   const response = await api.delete(`/users/${id}`);
  //   return response.data;
  // },
};
