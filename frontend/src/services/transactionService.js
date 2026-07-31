import api from "./api";

export const getTransactions = async () => {

    const response = await api.get("/users/transactions");

    return response.data;

};