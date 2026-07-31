import api from "./api";

export const getWalletData = async () => {

    const response = await api.get("/users/stats");

    return response.data;

};