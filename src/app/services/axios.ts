import axios from "axios";

export const api = axios.create({
  baseURL: "https://pet-insurance.matthayward.workers.dev/", // Adjust this to match your backend URL
});
