import api from "./api";

export const getDashboardStats = async () => {

    const response = await api.get("/users/stats");

    return response.data;

};