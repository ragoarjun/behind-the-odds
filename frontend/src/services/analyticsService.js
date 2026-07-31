import api from "./api";

export const getActivity = async () => {

    const response =
        await api.get("/users/activity");

    return response.data.activity;

};

export const getRecoveryCurve = async () => {

    const response =
        await api.get("/users/recovery");

    return response.data.history;

};
